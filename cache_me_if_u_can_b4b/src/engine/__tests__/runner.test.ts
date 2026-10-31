import assert from 'node:assert/strict';
import { createInitialState, reduce } from '../runner';
import type { Lesson } from '../types';

const bi = { ur: '', en: '' };
const lesson: Lesson = {
  id: 'fixture', title: bi, persona: {
    name: 'Ali', father: 'A', dobWords: 'one', dob: '01-01-2000',
    idNumber: '12345-1234567-1', phone: '0300-1234567', city: 'Karachi', domicile: 'Karachi',
  }, ready: [], steps: [
    { id: 'info', kind: 'info', label: bi, asks: bi },
    { id: 'name', kind: 'field', fieldKind: 'name', label: bi, asks: bi, expected: (value) => value === 'Ali' },
    { id: 'submit', kind: 'submit', label: bi, asks: bi, hiccup: { id: 'vague_error', when: 'submit_first' } },
  ],
};

let state = createInitialState(lesson, 0, 100);
state = reduce(state, { type: 'submit', now: 110 }, 110);
state = reduce(state, { type: 'setInput', value: 'Ali' }, 120);
state = reduce(state, { type: 'openLayer', layer: 'asks' }, 130);
state = reduce(state, { type: 'openLayer', layer: 'asks' }, 140);
state = reduce(state, { type: 'submit', now: 150 }, 150);
assert.equal(state.stepIndex, 2);
state = reduce(state, { type: 'submit', now: 160 }, 160);
assert.equal(state.hiccup, 'vague_error');
state = reduce(state, { type: 'resolveHiccup' }, 170);
state = reduce(state, { type: 'submit', now: 180 }, 180);
assert.equal(state.done, true);
assert.match(state.receiptNo ?? '', /^MASHQ-\d{6}$/);
assert.equal(state.events[1].hintTaps, 1);
assert.equal(state.events[1].completed, true);
console.log('runner.test.ts passed');

// Editing, zero-millisecond first action, and undo must survive later actions.
state = createInitialState(lesson, 1, 100);
state = reduce(state, { type: 'setInput', value: 'A' }, 100);
state = reduce(state, { type: 'setInput', value: 'Al' }, 200);
assert.equal(state.currentEvent.firstActionMs, 0);
assert.equal(state.canUndo, true);
state = reduce(state, { type: 'undo', now: 210 }, 210);
assert.equal(state.input, 'A');
assert.equal(state.currentEvent.undoTaps, 1);
state = reduce(state, { type: 'submit', now: 220 }, 220);
assert.equal(state.currentEvent.wrongAttempts, 1);
state = reduce(state, { type: 'reveal', now: 230 }, 230);
assert.equal(state.input, lesson.persona.name);
state = reduce(state, { type: 'submit', now: 240 }, 240);
state = reduce(state, { type: 'stuck', now: 250 }, 250);
assert.equal(state.stepIndex, 1);
assert.equal(state.input, 'Ali');
state = reduce(state, { type: 'exit', now: 260 }, 260);
assert.equal(state.events.at(-1)?.exited, true);
assert.equal(reduce(state, { type: 'exit', now: 270 }, 270), state);
assert.ok(!JSON.stringify(state.events).includes('Ali'));

const extended: Lesson = { ...lesson, steps: [
  { id: 'photo', kind: 'field', fieldKind: 'file', label: bi, asks: bi,
    choices: [{ id: 'clear', label: bi, correct: true }], hiccup: { id: 'upload_rejected', when: 'wrong' } },
  { id: 'session', kind: 'info', label: bi, asks: bi, hiccup: { id: 'logged_out', when: 'enter' } },
  { id: 'review', kind: 'review', label: bi, asks: bi },
  { id: 'submit', kind: 'submit', label: bi, asks: bi },
] };
state = createInitialState(extended, 0, 0);
state = reduce(state, { type: 'submit', now: 1 }, 1);
assert.equal(state.hiccup, 'upload_rejected');
state = reduce(state, { type: 'resolveHiccup' }, 2);
assert.equal(state.hiccupsRecovered, 1); // wrong attempts do not count as hints
state = reduce(state, { type: 'reveal', now: 3 }, 3);
assert.equal(state.input, 'clear');
state = reduce(state, { type: 'submit', now: 4 }, 4);
assert.equal(state.hiccup, 'logged_out');
state = reduce(state, { type: 'openLayer', layer: 'asks' }, 5);
state = reduce(state, { type: 'resolveHiccup' }, 6);
assert.equal(state.hiccupsRecovered, 1);
state = reduce(state, { type: 'submit', now: 7 }, 7);
state = reduce(state, { type: 'stuck', now: 8 }, 8);
assert.equal(state.hiccup, null); // logout happens once per run
state = reduce(state, { type: 'submit', now: 9 }, 9);
state = reduce(state, { type: 'submit', now: 10 }, 10);
assert.equal(state.stepIndex, 3); // review advances without expected()
state = reduce(state, { type: 'submit', now: 11 }, 11);
assert.equal(state.done, true);
assert.match(state.receiptNo ?? '', /^MASHQ-\d{6}$/);
assert.equal(createInitialState(lesson, 999).stepIndex, 2);
