import type { Bi, Lesson, LessonResultView, StepEvent } from './types';

export function scoredEvents(events: StepEvent[], lesson: Lesson): StepEvent[] {
  const ids = new Set(lesson.steps.filter((step) => step.kind !== 'info').map((step) => step.id));
  return events.filter((event) => ids.has(event.stepId));
}

export function resumeIndex(lesson: Lesson, events: StepEvent[]): number {
  const latest = events.filter((event) => event.lessonId === lesson.id).at(-1);
  return latest?.exited ? Math.max(0, lesson.steps.findIndex((step) => step.id === latest.stepId)) : 0;
}

const strengths: Record<string, Bi> = {
  strength_unaided_recovery: { ur: '', en: 'You found a way forward after a hiccup.' },
  strength_fewer_hints: { ur: '', en: 'You needed fewer hints this time.' },
  strength_careful_check: { ur: '', en: 'You checked the details carefully.' },
  strength_default: { ur: '', en: 'You practised taking the next step.' },
}; // TODO(UR-review): reviewed translations come from STRINGS.
export const fallbackStrength = (key: string): Bi => strengths[key] ?? strengths.strength_default;

export function stepScore(event: StepEvent): number {
  if (event.revealedAnswer || event.exited || !event.completed) return 0;
  if (event.hintTaps === 0 && event.wrongAttempts === 0 && event.stuckTaps === 0) return 1;
  if (event.hintTaps === 0 && event.wrongAttempts === 1 && event.stuckTaps === 0) return 0.75;
  if (event.stuckTaps === 0 && (event.hintTaps === 1 || event.wrongAttempts === 2)) return 0.5;
  return 0.25;
}

export function lessonScore(events: StepEvent[]): number {
  const counted = events.filter((event) => !['ready', 'session', 'info'].includes(event.stepId) && (event.completed || event.exited || event.revealedAnswer));
  if (counted.length === 0) return 0;
  return counted.reduce((sum, event) => sum + stepScore(event), 0) / counted.length;
}

export function rungFor(score: number): 0 | 1 | 2 {
  return score >= 0.8 ? 2 : score >= 0.45 ? 1 : 0;
}

export function median(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
}

export function isHesitant(firstActionMs: number, baselineMs: number | null): boolean {
  return firstActionMs > 2.5 * (baselineMs ?? 20000);
}

export function pickStrength(
  events: StepEvent[],
  previousEvents: StepEvent[] = [],
  hiccupRecoveries = 0,
  lookup: (key: string) => Bi = fallbackStrength,
): Bi {
  if (hiccupRecoveries > 0) return lookup('strength_unaided_recovery');
  const currentHints = events.reduce((sum, event) => sum + event.hintTaps, 0);
  const previousHints = previousEvents.reduce((sum, event) => sum + event.hintTaps, 0);
  if (previousEvents.length > 0 && currentHints < previousHints) return lookup('strength_fewer_hints');
  const carefulCheck = events.some((event) => (event.stepId === 'review' || event.stepId === 'submit')
    && event.wrongAttempts === 0 && event.completed);
  if (carefulCheck) return lookup('strength_careful_check');
  return lookup('strength_default');
}

export function buildResult(
  events: StepEvent[],
  previousEvents: StepEvent[] = [],
  hiccupsShown = 0,
  hiccupsRecovered = 0,
  lookup: (key: string) => Bi = fallbackStrength,
): LessonResultView {
  const score = lessonScore(events);
  return {
    score,
    rung: rungFor(score),
    strength: pickStrength(events, previousEvents, hiccupsRecovered, lookup),
    hiccupsShown,
    hiccupsRecovered,
  };
}
