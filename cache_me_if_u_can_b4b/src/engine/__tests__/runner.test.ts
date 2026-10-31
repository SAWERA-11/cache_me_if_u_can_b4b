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
