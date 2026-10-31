import type { Bi, HiccupId, Lesson, Step, StepEvent } from './types';
import { defaultOops } from './oopsDefaults';

export type RunState = {
  lesson: Lesson;
  runVersion: number;
  returnIndex: number | null;
  stepIndex: number;
  input: string;
  previousInputs: Record<string, string>;
  currentEvent: StepEvent;
  firstActionRecorded: boolean;
  undoInput: string | null;
  exited: boolean;
  events: StepEvent[];
  openLayers: { asks: boolean; where: boolean; format: boolean; ifUnsure: boolean };
  highlightField: string | null;
  hiccup: HiccupId | null;
  hiccupUnaided: boolean;
  hiccupsShown: number;
  hiccupsRecovered: number;
  hiccupsSeen: Partial<Record<HiccupId, true>>;
  loggedOutShown: boolean;
  oops: { consequence: Bi; fix: Bi } | null;
  canUndo: boolean;
  done: boolean;
  receiptNo: string | null;
};

export type Action =
  | { type: 'restart'; now: number }
  | { type: 'goTo'; index: number; now: number }
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
  if (state.firstActionRecorded) return state;
  return { ...state, firstActionRecorded: true, currentEvent: { ...state.currentEvent, firstActionMs: Math.max(0, now - state.currentEvent.ts) } };
}

function showHiccup(state: RunState, id: HiccupId): RunState {
  if (state.hiccupsSeen[id]) return state;
  return { ...state, hiccup: id, hiccupUnaided: true,
    hiccupsShown: state.hiccupsShown + 1, hiccupsSeen: { ...state.hiccupsSeen, [id]: true } };
}

function enter(state: RunState, index: number, now: number): RunState {
  const nextStep = state.lesson.steps[index];
  const isLoggedOut = nextStep.id === 'session' && nextStep.hiccup?.id === 'logged_out';
  const hiccup = nextStep.hiccup?.when === 'enter' && !state.hiccupsSeen[nextStep.hiccup.id]
    ? nextStep.hiccup.id : null;
  return {
    ...state,
    stepIndex: index,
    input: state.previousInputs[nextStep.id] ?? '',
    currentEvent: { ...newEvent(state.lesson.id, nextStep.id), ts: now },
    firstActionRecorded: false,
    undoInput: null,
    openLayers: { asks: false, where: false, format: false, ifUnsure: false },
    highlightField: null,
    hiccup,
    hiccupUnaided: true,
    hiccupsShown: state.hiccupsShown + (hiccup ? 1 : 0),
    hiccupsSeen: hiccup ? { ...state.hiccupsSeen, [hiccup]: true } : state.hiccupsSeen,
    loggedOutShown: state.loggedOutShown || Boolean(hiccup && isLoggedOut),
    oops: null,
    canUndo: false,
  };
}

export function createInitialState(lesson: Lesson, resumeIndex = 0, now = 0): RunState {
  if (!lesson.steps.length) throw new Error('A lesson must contain at least one step');
  const base: RunState = {
    lesson, runVersion: 0, returnIndex: null, stepIndex: 0, input: '', previousInputs: {}, currentEvent: newEvent(lesson.id, lesson.steps[0].id),
    events: [], firstActionRecorded: false, undoInput: null, exited: false,
    openLayers: { asks: false, where: false, format: false, ifUnsure: false },
    highlightField: null, hiccup: null, hiccupUnaided: true, hiccupsShown: 0, hiccupsRecovered: 0, hiccupsSeen: {},
    loggedOutShown: false,
    oops: null, canUndo: false, done: false, receiptNo: null,
  };
  const index = Number.isInteger(resumeIndex) ? Math.max(0, Math.min(resumeIndex, lesson.steps.length - 1)) : 0;
  return enter(base, index, now);
}

function saveCurrent(state: RunState, event: StepEvent): RunState {
  return { ...state, events: [...state.events, event] };
}

export function reduce(state: RunState, action: Action, now = 0): RunState {
  if (action.type === 'restart') return { ...createInitialState(state.lesson, 0, action.now), runVersion: state.runVersion + 1 };
  if (state.done || state.exited) return state;
  switch (action.type) {
    case 'goTo': {
      const target = state.lesson.steps[action.index];
      if (!target || target.kind !== 'field' || !(target.id in state.previousInputs)) return state;
      const returnIndex = step(state).kind === 'review' || step(state).kind === 'submit' ? state.stepIndex : state.returnIndex;
      return enter({ ...state, returnIndex }, action.index, action.now);
    }
    case 'setInput':
      return action.value === state.input ? state : { ...withAction(state, now), input: action.value, undoInput: state.input, canUndo: true };
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
      return state.hiccup ? { ...withAction(state, now), hiccup: null, hiccupsRecovered: state.hiccupsRecovered + (state.hiccupUnaided ? 1 : 0) } : state;
    case 'dismissOops':
      return { ...state, oops: null };
    case 'submit': {
      const next = withAction(state, action.now);
      const current = step(next);
      if (current.kind === 'submit' && current.hiccup?.when === 'submit_first' && !next.hiccupsSeen[current.hiccup.id]) {
        return { ...showHiccup(next, current.hiccup.id), highlightField: current.hiccup.id === 'vague_error' ? 'phone' : null };
      }
      const correctChoice = current.choices?.some((choice) => choice.id === next.input && choice.correct);
      const valid = current.kind === 'info' || current.kind === 'review' || current.kind === 'submit'
        || correctChoice || current.expected?.(next.input, next.lesson.persona) === true;
      if (!valid) {
        const wrongAttempts = next.currentEvent.wrongAttempts + 1;
        const shown = current.hiccup?.when === 'wrong' && wrongAttempts === 1 ? showHiccup(next, current.hiccup.id) : next;
        return { ...shown,
          oops: current.oops ?? defaultOops(current.fieldKind), currentEvent: { ...next.currentEvent, wrongAttempts } };
      }
      const event = { ...next.currentEvent, completed: true, ts: action.now };
      const saved = saveCurrent(next, event);
      if (next.stepIndex >= next.lesson.steps.length - 1) {
        const receiptNo = current.id === 'submit' ? `MASHQ-${Math.floor(100000 + (action.now % 900000))}` : null;
        return { ...saved, done: true, receiptNo };
      }
      const destination = current.kind === 'field' && next.returnIndex !== null ? next.returnIndex : next.stepIndex + 1;
      return enter({ ...saved, returnIndex: null, previousInputs: { ...saved.previousInputs, [current.id]: next.input } }, destination, action.now);
    }
    case 'stuck': {
      const next = withAction(state, action.now);
      const event = { ...next.currentEvent, stuckTaps: next.currentEvent.stuckTaps + 1 };
      const saved = saveCurrent(next, event);
      return next.stepIndex > 0 ? enter({ ...saved, previousInputs: { ...saved.previousInputs, [step(next).id]: next.input } }, next.stepIndex - 1, action.now)
        : { ...next, hiccupUnaided: false, currentEvent: event };
    }
    case 'undo': {
      const next = withAction(state, action.now);
      if (!next.canUndo) return next;
      return { ...next, input: next.undoInput ?? '', undoInput: null, canUndo: false, currentEvent: { ...next.currentEvent, undoTaps: next.currentEvent.undoTaps + 1 } };
    }
    case 'reveal': {
      const next = withAction(state, action.now);
      const current = step(next);
      const persona = next.lesson.persona;
      const answers: Record<string, string> = { name: persona.name, father: persona.father,
        dob: persona.dob, id: persona.idNumber, phone: persona.phone, city: persona.city, domicile: persona.domicile };
      const answer = current.choices?.find((choice) => choice.correct)?.id
        ?? answers[current.id] ?? current.example ?? '';
      return { ...next, input: answer, undoInput: next.input, canUndo: answer !== next.input,
        currentEvent: { ...next.currentEvent, revealedAnswer: true } };
    }
    case 'backPressed':
      return state.stepIndex > 0 && !state.hiccup
        ? showHiccup(withAction(state, now), 'back_fear')
        : state;
    case 'exit': {
      const next = withAction(state, action.now);
      return { ...saveCurrent(next, { ...next.currentEvent, exited: true, ts: action.now }), exited: true };
    }
  }
}
