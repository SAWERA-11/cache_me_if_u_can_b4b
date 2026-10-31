import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { LESSONS, STRINGS } from '../content';
import { useApp } from '../store/useApp';
import { buildResult, fallbackStrength, scoredEvents } from './estimate';
import { createInitialState, reduce, type Action } from './runner';
import { findLesson } from './catalog';
import { restoreRun } from './session';
import type { HiccupId, Lesson, LessonResultView, Step } from './types';

function initialize(lesson: Lesson) {
  return restoreRun(lesson, useApp.getState().events, Date.now());
}

function lookupStrength(key: string) {
  const value = STRINGS[key];
  const fallback = fallbackStrength(key).en;
  return { en: value?.en || fallback, ur: value?.ur || value?.en || fallback };
}

export function useRunner(lessonId: string, testLesson?: Lesson) {
  const lesson = testLesson ?? findLesson(LESSONS, lessonId);
  if (!lesson) throw new Error(`Unknown lesson: ${lessonId}`);
  const [state, dispatch] = useReducer(
    (currentState: ReturnType<typeof createInitialState>, message: { action: Action; now: number }) =>
      reduce(currentState, message.action, message.now),
    lesson,
    initialize,
  );
  const [previousEvents] = useState(() => {
    const { events, results } = useApp.getState();
    const last = results.at(-1);
    const before = results.at(-2)?.ts ?? -Infinity;
    if (!last) return [];
    const previous = events.filter((event) => event.lessonId === last.lessonId && event.ts > before && event.ts <= last.ts);
    const previousLesson = findLesson(LESSONS, last.lessonId);
    return previousLesson ? scoredEvents(previous, previousLesson) : previous;
  });
  const addEvent = useApp((value) => value.addEvent);
  const addResult = useApp((value) => value.addResult);
  const savedEvents = useRef(state.events.length);
  const savedResult = useRef(false);
  const result: LessonResultView | null = state.done
    ? buildResult(scoredEvents(state.events, state.lesson), previousEvents, state.hiccupsShown, state.hiccupsRecovered, lookupStrength)
    : null;

  useEffect(() => {
    const newEvents = state.events.slice(savedEvents.current);
    newEvents.forEach(addEvent);
    savedEvents.current = state.events.length;
  }, [addEvent, state.events]);

  useEffect(() => {
    if (!result || savedResult.current) return;
    savedResult.current = true;
    addResult({ lessonId, ts: Date.now(), score: result.score, rung: result.rung, strength: result.strength.en });
  }, [addResult, lessonId, result]);

  const send = useCallback((action: Action) => dispatch({ action, now: Date.now() }), []);
  const step: Step = state.lesson.steps[state.stepIndex];
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
