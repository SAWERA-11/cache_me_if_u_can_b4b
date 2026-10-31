import type { Bi, HiccupId, Lesson, Step, StepEvent } from './types';
import { defaultOops } from './oopsDefaults';

export type RunState = {
  lesson: Lesson;
  stepIndex: number;
  input: string;
  previousInputs: Record<string, string>;
  currentEvent: StepEvent;
  events: StepEvent[];
  openLayers: { asks: boolean; where: boolean; format: boolean; ifUnsure: boolean };
  highlightField: string | null;
  hiccup: HiccupId | null;
  hiccupUnaided: boolean;
  hiccupsShown: number;
  hiccupsRecovered: number;
  loggedOutShown: boolean;
  oops: { consequence: Bi; fix: Bi } | null;
  canUndo: boolean;
  done: boolean;
  receiptNo: string | null;
};

export type Action =
  | { type: 'setInput'; value: string }
  | { type: 'openLayer'; layer: keyof RunState['openLayers'] }
  | { type: 'submit'; now: number }
  | { type: 'stuck'; now: number }
  | { type: 'undo'; now: number }
  | { type: 'reveal'; now: number }
  | { type: 'resolveHiccup' }
  | { type: 'dismissOops' }
  | { type: 'backPressed' }
  | { type: 'exit'; now: number }
  | { type: 'replayAudio' };

export function newEvent(lessonId: string, stepId: string): StepEvent {
  return {
    lessonId, stepId, ts: 0, firstActionMs: 0, hintTaps: 0, stuckTaps: 0,
    wrongAttempts: 0, undoTaps: 0, audioReplays: 0, revealedAnswer: false,
    completed: false, exited: false,
  };
}

function step(state: RunState): Step {
  return state.lesson.steps[state.stepIndex];
}

function withAction(state: RunState, now: number): RunState {
  if (state.currentEvent.firstActionMs !== 0) return state;
  return { ...state, currentEvent: { ...state.currentEvent, firstActionMs: Math.max(0, now - state.currentEvent.ts) } };
}

function enter(state: RunState, index: number, now: number): RunState {
  const nextStep = state.lesson.steps[index];
  const isLoggedOut = nextStep.id === 'session' && nextStep.hiccup?.id === 'logged_out';
  const hiccup = nextStep.hiccup?.when === 'enter' && (!isLoggedOut || !state.loggedOutShown)
    ? nextStep.hiccup.id : null;
  return {
    ...state,
    stepIndex: index,
    input: state.previousInputs[nextStep.id] ?? '',
    currentEvent: { ...newEvent(state.lesson.id, nextStep.id), ts: now },
    openLayers: { asks: false, where: false, format: false, ifUnsure: false },
    highlightField: null,
    hiccup,
    hiccupUnaided: true,
    hiccupsShown: state.hiccupsShown + (hiccup ? 1 : 0),
    loggedOutShown: state.loggedOutShown || Boolean(hiccup && isLoggedOut),
    oops: null,
    canUndo: Boolean(state.previousInputs[nextStep.id]),
  };
}

export function createInitialState(lesson: Lesson, resumeIndex = 0, now = 0): RunState {
  const base: RunState = {
    lesson, stepIndex: 0, input: '', previousInputs: {}, currentEvent: newEvent(lesson.id, lesson.steps[0].id),
    events: [], openLayers: { asks: false, where: false, format: false, ifUnsure: false },
    highlightField: null, hiccup: null, hiccupUnaided: true, hiccupsShown: 0, hiccupsRecovered: 0,
    loggedOutShown: false,
    oops: null, canUndo: false, done: false, receiptNo: null,
  };
  return enter(base, resumeIndex, now);
}

function saveCurrent(state: RunState, event: StepEvent): RunState {
  return { ...state, events: [...state.events, event] };
}

export function reduce(state: RunState, action: Action, now = 0): RunState {
  if (state.done && action.type !== 'setInput') return state;
  switch (action.type) {
    case 'setInput':
      return { ...withAction(state, now), input: action.value };
    case 'openLayer': {
      const next = withAction(state, now);
      if (next.openLayers[action.layer]) return next;
      return { ...next, openLayers: { ...next.openLayers, [action.layer]: true },
        currentEvent: { ...next.currentEvent, hintTaps: next.currentEvent.hintTaps + 1 },
        hiccupUnaided: false };
    }
    case 'replayAudio': {
      const next = withAction(state, now);
      return { ...next, currentEvent: { ...next.currentEvent, audioReplays: next.currentEvent.audioReplays + 1 } };
    }
    case 'resolveHiccup':
      return state.hiccup ? { ...state, hiccup: null, hiccupsRecovered: state.hiccupsRecovered + (state.hiccupUnaided ? 1 : 0) } : state;
    case 'dismissOops':
      return { ...state, oops: null };
    case 'submit': {
      let next = withAction(state, action.now);
      const current = step(next);
      if (current.kind === 'submit' && current.hiccup?.id === 'vague_error' && !next.highlightField) {
        return { ...next, highlightField: 'phone', hiccup: 'vague_error', hiccupsShown: next.hiccupsShown + 1, hiccupUnaided: true };
      }
      const correctChoice = current.choices?.some((choice) => choice.id === next.input && choice.correct);
      const valid = current.kind === 'info'
        || current.id === 'submit' && next.highlightField !== null
        || correctChoice || current.expected?.(next.input, next.lesson.persona) === true;
      if (!valid) {
        const wrongAttempts = next.currentEvent.wrongAttempts + 1;
        const hiccup = current.hiccup?.when === 'wrong' && wrongAttempts === 1 ? current.hiccup.id : next.hiccup;
        return { ...next, hiccup, hiccupsShown: next.hiccupsShown + (hiccup && !next.hiccup ? 1 : 0),
          hiccupUnaided: false, oops: current.oops ?? defaultOops(current.fieldKind), currentEvent: { ...next.currentEvent, wrongAttempts } };
      }
      const event = { ...next.currentEvent, completed: true, ts: action.now };
      const saved = saveCurrent(next, event);
      if (next.stepIndex >= next.lesson.steps.length - 1) {
        const receiptNo = current.id === 'submit' ? `MASHQ-${Math.floor(100000 + (action.now % 900000))}` : null;
        return { ...saved, done: true, receiptNo };
      }
      return enter({ ...saved, previousInputs: { ...saved.previousInputs, [current.id]: next.input } }, next.stepIndex + 1, action.now);
    }
    case 'stuck': {
      const next = withAction(state, action.now);
      const event = { ...next.currentEvent, stuckTaps: next.currentEvent.stuckTaps + 1 };
      const saved = saveCurrent(next, event);
      return next.stepIndex > 0 ? enter({ ...saved, previousInputs: { ...saved.previousInputs, [step(next).id]: next.input } }, next.stepIndex - 1, action.now) : saved;
    }
    case 'undo': {
      const next = withAction(state, action.now);
      const value = next.previousInputs[step(next).id] ?? '';
      return { ...next, input: value, canUndo: false, currentEvent: { ...next.currentEvent, undoTaps: next.currentEvent.undoTaps + 1 } };
    }
    case 'reveal': {
      const next = withAction(state, action.now);
      const current = step(next);
      const answer = current.example ?? '';
      return { ...next, input: answer, currentEvent: { ...next.currentEvent, revealedAnswer: true }, hiccupUnaided: false };
    }
    case 'backPressed':
      return state.stepIndex > 0
        ? { ...state, hiccup: 'back_fear', hiccupsShown: state.hiccupsShown + 1, hiccupUnaided: true }
        : state;
    case 'exit': {
      const next = withAction(state, action.now);
      return saveCurrent(next, { ...next.currentEvent, exited: true, ts: action.now });
    }
  }
}
