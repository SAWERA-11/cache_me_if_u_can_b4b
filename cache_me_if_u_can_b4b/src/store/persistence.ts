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
