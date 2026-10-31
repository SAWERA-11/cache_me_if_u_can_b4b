import assert from 'node:assert/strict';
import { restoreRun } from '../session';
import { newEvent, reduce } from '../runner';
import { buildResult, scoredEvents } from '../estimate';
import type { Lesson, StepEvent } from '../types';

const bi = { ur: '', en: 'Fixture' };
const lesson: Lesson = { id: 'fixture', title: bi, ready: [],
  persona: { name: 'Practice Person', father: 'Practice Parent', dobWords: 'One January',
    dob: '01-01-1960', idNumber: '12345-1234567-1', phone: '0300-1234567', city: 'City', domicile: 'Region' }, steps: [
  { id: 'name', kind: 'field', label: bi, asks: bi, expected: () => true },
  { id: 'review', kind: 'review', label: bi, asks: bi },
  { id: 'submit', kind: 'submit', label: bi, asks: bi },
] };
const event = (stepId: string, partial: Partial<StepEvent> = {}): StepEvent => ({
  ...newEvent('fixture', stepId), completed: true, ...partial,
});
const history = [event('name', { revealedAnswer: true }), event('review', { completed: false, exited: true })];
let state = restoreRun(lesson, history, 100);
assert.equal(state.stepIndex, 1);
assert.equal(state.input, '');
assert.deepEqual(state.previousInputs, {});
assert.deepEqual(state.events, history);
state = reduce(state, { type: 'submit', now: 200 }, 200);
state = reduce(state, { type: 'submit', now: 300 }, 300);
assert.equal(buildResult(scoredEvents(state.events, lesson)).score, 0.5);
const nextAttempt = [...history, event('submit'), event('review', { completed: false, exited: true })];
assert.deepEqual(restoreRun(lesson, nextAttempt, 400).events, nextAttempt.slice(-1));
assert.equal(restoreRun(lesson, [event('submit')], 400).events.length, 0);
assert.equal(restoreRun(lesson, [event('removed_step', { exited: true })], 400).stepIndex, 0);
assert.equal(restoreRun(lesson, [event('review', { lessonId: 'other', exited: true })], 400).stepIndex, 0);
console.log('session.test.ts passed (resume preserves evidence, starts fresh after completion, stores no answers)');
