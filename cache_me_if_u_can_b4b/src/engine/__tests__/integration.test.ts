import assert from 'node:assert/strict';
import { createInitialState, reduce, type Action } from '../runner';
import { buildResult, scoredEvents } from '../estimate';
import { findLesson, resumableLessonId } from '../catalog';
import { defaultOops } from '../oopsDefaults';
import type { FieldKind, HiccupId, Lesson } from '../types';

// Contract fixture follows Savera S2's thirteen step IDs, without authoring app content.
const bi = { ur: '', en: 'Fixture' };
const lesson: Lesson = {
  id: 'fixture', title: bi, ready: [],
  persona: { name: 'Practice Person', father: 'Practice Parent', dobWords: 'One January',
    dob: '01-01-1960', idNumber: '12345-1234567-1', phone: '0300-1234567', city: 'City', domicile: 'Region' },
  steps: [
    { id: 'ready', kind: 'info', label: bi, asks: bi },
    ...(['name', 'father', 'dob', 'id', 'phone'] as const).map((id) => ({
      id, kind: 'field' as const, fieldKind: (id === 'id' ? 'id_number' : id === 'father' ? 'name' : id) as FieldKind,
      label: bi, asks: bi,
      expected: (value: string, persona: Lesson['persona']) => value === persona[id === 'id' ? 'idNumber' : id],
      ...(id === 'dob' ? { hiccup: { id: 'wrong_format' as const, when: 'wrong' as const } } : {}),
      ...(id === 'id' ? { hiccup: { id: 'find_answer' as const, when: 'enter' as const } } : {}),
    })),
    ...(['city', 'domicile', 'photo'] as const).map((id) => ({
      id, kind: 'field' as const, fieldKind: id === 'photo' ? 'file' as const : 'choice' as const,
      label: bi, asks: bi, choices: [{ id: 'wrong', label: bi }, { id: 'correct', label: bi, correct: true }],
      ...(id === 'domicile' ? { hiccup: { id: 'unknown_word' as const, when: 'enter' as const } } : {}),
      ...(id === 'photo' ? { hiccup: { id: 'upload_rejected' as const, when: 'wrong' as const } } : {}),
    })),
    { id: 'otp', kind: 'field', fieldKind: 'code', example: '482913', expected: (value) => value === '482913',
      label: bi, asks: bi, hiccup: { id: 'verification_code', when: 'enter' } },
    { id: 'review', kind: 'review', label: bi, asks: bi },
    { id: 'submit', kind: 'submit', label: bi, asks: bi, hiccup: { id: 'vague_error', when: 'submit_first' } },
  ],
};
lesson.steps.splice(8, 0, { id: 'session', kind: 'info', label: bi, asks: bi,
  hiccup: { id: 'logged_out', when: 'enter' } });
const registry = { fixture: lesson };
assert.equal(findLesson(registry, 'fixture'), lesson);
assert.equal(findLesson(registry, 'toString'), undefined);
assert.equal(lesson.steps.length, 13);
let state = createInitialState(lesson, 0, 100);
let clock = 100;
const send = (action: Action) => { clock += 10; state = reduce(state, action, clock); };
const submit = () => send({ type: 'submit', now: clock + 10 });
const recover = (expected: HiccupId) => {
  assert.equal(state.hiccup, expected);
  send({ type: 'resolveHiccup' });
  assert.equal(state.hiccup, null);
};
submit();
send({ type: 'backPressed' }); recover('back_fear');
send({ type: 'backPressed' }); assert.equal(state.hiccup, null);
while (!state.done) {
  const current = state.lesson.steps[state.stepIndex];
  if (current.id === 'dob' || current.id === 'photo') {
    send({ type: 'setInput', value: 'wrong' }); submit();
    recover(current.id === 'dob' ? 'wrong_format' : 'upload_rejected');
  }
  if (state.hiccup) {
    const hiccup = state.hiccup;
    if (current.id === 'id') send({ type: 'openLayer', layer: 'where' });
    recover(hiccup);
    if (current.id === 'id') {
      send({ type: 'stuck', now: clock + 10 });
      send({ type: 'setInput', value: lesson.persona.dob }); submit();
      assert.equal(state.hiccup, null); // re-entering id does not repeat find_answer
    }
  }
  if (current.kind === 'field') {
    send({ type: 'reveal', now: clock + 10 });
    // Only this fixture action supplies the expected value; reveal must map choices/persona correctly.
    assert.ok(state.input);
  }
  submit();
  if (state.hiccup === 'vague_error') { recover('vague_error'); submit(); }
}
assert.equal(state.hiccupsShown, 8);
assert.equal(state.hiccupsRecovered, 7);
assert.match(state.receiptNo ?? '', /^MASHQ-\d{6}$/);
assert.equal(buildResult(scoredEvents(state.events, lesson)).rung, 0); // all field answers revealed
assert.equal(resumableLessonId(state.events), null);
assert.equal(resumableLessonId([...state.events, { ...state.events[0], lessonId: 'other', exited: true }]), 'other');
const exited = { ...state.events[0], exited: true, completed: false };
assert.equal(resumableLessonId([exited, { ...exited, lessonId: 'other' }, exited]), 'fixture');
for (const kind of ['name', 'dob', 'id_number', 'phone', 'choice', 'text', 'file', 'code'] as const) {
  assert.ok(defaultOops(kind).fix.en.length > 10);
}
console.log('integration.test.ts passed (keyed catalog, 13 steps, 8 unique hiccups, reveal, scoring)');
