// Exercise the hook contract with a deterministic hook lifecycle and fixture modules.
/* eslint react-hooks/rules-of-hooks: off -- Hooks run through the lifecycle fixture below. */
const assert = require('node:assert/strict');
const Module = require('node:module');
const originalLoad = Module._load;
const bi = { ur: '', en: 'Practice' };
const lesson = { id: 'fixture', title: bi, persona: { name: 'Fixture Person' }, ready: [], steps: [
  { id: 'introduction', kind: 'info', label: bi, asks: bi },
  { id: 'name', kind: 'field', label: bi, asks: bi, expected: (value) => value === 'Fixture Person' },
  { id: 'review', kind: 'review', label: bi, asks: bi },
  { id: 'submit', kind: 'submit', label: bi, asks: bi },
] };
const historicalEvent = { lessonId: 'fixture', stepId: 'name', ts: 1, firstActionMs: 0, hintTaps: 0,
  stuckTaps: 0, wrongAttempts: 0, undoTaps: 0, audioReplays: 0, revealedAnswer: false,
  completed: false, exited: true };
const app = { events: [historicalEvent], results: [],
  addEvent: (event) => app.events.push(event), addResult: (result) => app.results.push(result) };
const useApp = (select) => select(app);
useApp.getState = () => app;
let slots = [], cursor = 0, effects = [];
const react = {
  useReducer: (reducer, arg, init) => {
    const index = cursor++;
    if (!(index in slots)) slots[index] = init(arg);
    return [slots[index], (action) => { slots[index] = reducer(slots[index], action); }];
  },
  useState: (init) => {
    const index = cursor++;
    if (!(index in slots)) slots[index] = typeof init === 'function' ? init() : init;
    return [slots[index], (value) => { slots[index] = value; }];
  },
  useRef: (value) => {
    const index = cursor++;
    return slots[index] ?? (slots[index] = { current: value });
  },
  useEffect: (effect) => { effects.push(effect); },
  useCallback: (callback) => callback,
};
Module._load = function (request, parent, main) {
  if (parent?.filename.endsWith('useRunner.ts')) {
    if (request === 'react') return react;
    if (request === '../store/useApp') return { useApp };
    if (request === '../content') return { LESSONS: { [lesson.id]: lesson }, STRINGS: {
      strength_careful_check: { ur: 'fixture translation', en: 'Careful fixture check' },
    } };
  }
  return originalLoad.call(this, request, parent, main);
};
try {
  const { useRunner } = require('../useRunner.ts');
  const render = () => {
    cursor = 0; effects = [];
    const view = useRunner('fixture');
    for (const effect of effects) { effect(); effect(); } // repeated effect setup
    return view;
  };
  let view = render();
  assert.equal(view.stepIndex, 1); // resume from the exited step's identifier
  assert.equal(view.input, ''); // typed values never survive a restart
  view.actions.setInput('Fixture Person');
  view = render();
  view.actions.submit();
  view = render();
  view.actions.submit();
  view = render();
  view.actions.submit();
  view = render();
  assert.equal(view.done, true);
  assert.equal(view.result.strength.en, 'Careful fixture check');
  assert.equal(view.result.score, 0.75); // the earlier exit remains part of the resumed run
  assert.equal(app.results.length, 1);
  assert.equal(app.events.length, 4); // old exit plus three new completed steps
  render();
  assert.equal(app.results.length, 1);
  assert.ok(!JSON.stringify(app.events).includes('Fixture Person'));
  view.actions.restart();
  view = render();
  assert.equal(view.done, false);
  assert.equal(view.stepIndex, 0);
  assert.deepEqual(view.answers, []);
  const countBeforeExit = app.events.length;
  view.actions.exit();
  assert.equal(app.events.length, countBeforeExit + 1); // persists before navigation can unmount
  assert.equal(app.events.at(-1).exited, true);
  render();
  assert.equal(app.events.length, countBeforeExit + 1);
  // A new mount starts from the beginning after successful completion.
  slots = [];
  assert.equal(render().stepIndex, 0);
  console.log('useRunner.test.cjs passed (resume, translated result, effect replay, privacy)');
} finally {
  Module._load = originalLoad;
}
