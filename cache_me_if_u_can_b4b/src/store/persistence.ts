import type { AppState } from './useApp';
import type { StepEvent } from '../engine/types';

export function privateEvent(event: StepEvent): StepEvent {
  return {
    lessonId: event.lessonId, stepId: event.stepId, ts: event.ts,
    firstActionMs: event.firstActionMs, hintTaps: event.hintTaps,
    stuckTaps: event.stuckTaps, wrongAttempts: event.wrongAttempts,
    undoTaps: event.undoTaps, audioReplays: event.audioReplays,
    revealedAnswer: event.revealedAnswer, completed: event.completed, exited: event.exited,
  };
}

// Explicit projection prevents accidental persistence of runner inputs or future UI state.
export function persistedState(state: AppState) {
  return {
    language: state.language, textLevel: state.textLevel, audioSpeed: state.audioSpeed,
    consented: state.consented, guideOn: false, shareProgress: state.shareProgress,
    baselineMs: state.baselineMs,
    events: state.events.slice(-300).map(privateEvent),
    results: state.results.slice(-10).map(({ lessonId, ts, score, rung, strength }) => ({ lessonId, ts, score, rung, strength })),
    struggles: { ...state.struggles },
    comfort: state.comfort.map(({ lessonId, before, after }) => ({ lessonId, before, after })),
  };
}

function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
const identifier = (value: unknown): value is string => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value);
const nonnegative = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0;

export function restoredState(value: unknown, defaults: AppState): ReturnType<typeof persistedState> {
  const safe = persistedState(defaults);
  if (!record(value)) return safe;
  if (value.language === 'ur' || value.language === 'en') safe.language = value.language;
  if (value.textLevel === 0 || value.textLevel === 1 || value.textLevel === 2) safe.textLevel = value.textLevel;
  if (value.audioSpeed === 0.8 || value.audioSpeed === 1) safe.audioSpeed = value.audioSpeed;
  for (const key of ['consented', 'shareProgress'] as const) {
    if (typeof value[key] === 'boolean') safe[key] = value[key];
  }
  if (value.baselineMs === null || nonnegative(value.baselineMs)) safe.baselineMs = value.baselineMs;
  if (Array.isArray(value.events)) safe.events = value.events.filter((event): event is StepEvent => {
    return record(event) && identifier(event.lessonId) && identifier(event.stepId)
      && ['ts', 'firstActionMs', 'hintTaps', 'stuckTaps', 'wrongAttempts', 'undoTaps', 'audioReplays'].every((key) => nonnegative(event[key]))
      && ['revealedAnswer', 'completed', 'exited'].every((key) => typeof event[key] === 'boolean');
  }).slice(-300).map(privateEvent);
  if (Array.isArray(value.results)) safe.results = value.results.filter((result) => record(result)
    && identifier(result.lessonId) && nonnegative(result.ts) && nonnegative(result.score) && result.score <= 1
    && [0, 1, 2].includes(result.rung as number) && typeof result.strength === 'string')
    .slice(-10).map(({ lessonId, ts, score, rung, strength }) => ({ lessonId, ts, score, rung, strength }));
  if (record(value.struggles)) {
    safe.struggles = {};
    for (const [key, count] of Object.entries(value.struggles)) {
      if (identifier(key) && nonnegative(count)) Object.defineProperty(safe.struggles, key,
        { value: count, enumerable: true, writable: true, configurable: true });
    }
  }
  if (Array.isArray(value.comfort)) safe.comfort = value.comfort.filter((answer) => record(answer) && identifier(answer.lessonId)
    && (answer.before === undefined || nonnegative(answer.before)) && (answer.after === undefined || nonnegative(answer.after)))
    .map(({ lessonId, before, after }) => ({ lessonId, before, after }));
  return safe;
}
