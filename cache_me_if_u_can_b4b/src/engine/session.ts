import { createInitialState, type RunState } from './runner';
import { resumeIndex } from './estimate';
import type { Lesson, StepEvent } from './types';

export function restoreRun(lesson: Lesson, events: StepEvent[], now: number): RunState {
  const history = events.filter((event) => event.lessonId === lesson.id);
  const latest = history.at(-1);
  if (!latest?.exited || !lesson.steps.some((step) => step.id === latest.stepId)) {
    return createInitialState(lesson, 0, now);
  }
  const finalStepId = lesson.steps.at(-1)?.id;
  let boundary = history.length - 1;
  while (boundary >= 0 && !(history[boundary].stepId === finalStepId && history[boundary].completed)) boundary--;
  // Resume evidence, not answers: earlier hints/reveals/exits must still affect this run's score.
  return { ...createInitialState(lesson, resumeIndex(lesson, history), now), events: history.slice(boundary + 1) };
}
