import { useCallback, useEffect, useReducer, useRef } from 'react';
import { LESSONS } from '../content';
import { useApp } from '../store/useApp';
import { buildResult } from './estimate';
import { createInitialState, reduce, type Action } from './runner';
import type { HiccupId, Lesson, LessonResultView, Step } from './types';

export function useRunner(lessonId: string, testLesson?: Lesson) {
  const lesson = testLesson ?? LESSONS.find((item: Lesson) => item.id === lessonId);
  if (!lesson) throw new Error(`Unknown lesson: ${lessonId}`);
  const [state, dispatch] = useReducer(
    (currentState: ReturnType<typeof createInitialState>, action: Action) =>
      reduce(currentState, action, Date.now()),
    createInitialState(lesson, 0, Date.now()),
  );
  const addEvent = useApp((value) => value.addEvent);
  const addResult = useApp((value) => value.addResult);
  const savedEvents = useRef(0);

  useEffect(() => {
    const newEvents = state.events.slice(savedEvents.current);
    newEvents.forEach(addEvent);
    savedEvents.current = state.events.length;
  }, [addEvent, state.events]);

  useEffect(() => {
    if (!state.done || !state.events.length) return;
    const result = buildResult(state.events, [], state.hiccupsShown, state.hiccupsRecovered);
    addResult({ lessonId, ts: Date.now(), score: result.score, rung: result.rung, strength: result.strength.en });
  }, [addResult, lessonId, state.done, state.events, state.hiccupsShown, state.hiccupsRecovered]);

  const send = useCallback((action: Action) => dispatch(action), []);
  const step: Step = state.lesson.steps[state.stepIndex];
  const result: LessonResultView | null = state.done
    ? buildResult(state.events, [], state.hiccupsShown, state.hiccupsRecovered)
    : null;
  return {
    lesson: state.lesson,
    step,
    stepIndex: state.stepIndex,
    total: state.lesson.steps.length,
    input: state.input,
    openLayers: state.openLayers,
    highlightField: state.highlightField,
    hiccup: state.hiccup as HiccupId | null,
    oops: state.oops,
    canUndo: state.canUndo,
    done: state.done,
    receiptNo: state.receiptNo,
    result,
    actions: {
      setInput: (value: string) => send({ type: 'setInput', value }),
      submit: () => send({ type: 'submit', now: Date.now() }),
      openLayer: (layer: keyof typeof state.openLayers) => send({ type: 'openLayer', layer }),
      stuck: () => send({ type: 'stuck', now: Date.now() }),
      undo: () => send({ type: 'undo', now: Date.now() }),
      reveal: () => send({ type: 'reveal', now: Date.now() }),
      resolveHiccup: () => send({ type: 'resolveHiccup' }),
      dismissOops: () => send({ type: 'dismissOops' }),
      backPressed: () => send({ type: 'backPressed' }),
      exit: () => send({ type: 'exit', now: Date.now() }),
      replayAudio: () => send({ type: 'replayAudio' }),
    },
  };
}
