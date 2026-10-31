import assert from 'node:assert/strict';
import { KB, LESSON1, LESSONS, STRINGS, VIDEOS } from '../../content';
import { matchChip, matchQuestion } from '../../helper/matcher';
import { createInitialState, reduce, type Action } from '../runner';
import { buildResult, scoredEvents } from '../estimate';
import type { HiccupId } from '../types';

assert.equal(LESSONS[LESSON1.id], LESSON1);
const questions: [string, string][] = [
  ['OTP kya hota hai', 'what_is_otp'], ['domisile kya hai', 'what_is_domicile'],
  ['account ka naam', 'what_is_account_title'], ['سیشن کیا ہے', 'what_is_session'],
  ['upload kaise karun', 'what_is_upload'], ['date of birth format', 'date_format'],
  ['mobile number kaise likhun', 'phone_number'], ['نام کیسے لکھیں', 'name_as_on_id'],
  ['address lines', 'address_parts'], ['choose from list', 'choice_lists'],
  ['تصویر کیسی ہو', 'photo_requirements'], ['star wala box', 'required_optional'],
  ['error aa gaya', 'red_message'], ['submit nahi ho raha', 'will_not_submit'],
  ['photo saaf nahi', 'photo_unclear'], ['سیشن ختم ہو گیا', 'session_expired'],
  ['someone called for code', 'caller_asks_code'], ['i shared my pin', 'already_shared'],
  ['can i undo', 'can_i_undo'], ['بار بار پوچھنا', 'okay_to_ask'],
];
let matches = 0;
for (const [question, expected] of questions) {
  const answer = matchQuestion(question);
  assert.ok(!answer || answer.id === expected, `${question}: wrong answer ${answer?.id}, expected ${expected}`);
  if (answer) matches++;
}
assert.ok(matches >= 14, `${matches}/20 real-content matches (need 14)`);
assert.equal(matchQuestion('zzzzzzzzzzzzzzzzzzzz'), null);
assert.equal(matchQuestion('PIN: 1234'), null);
for (const [chip, target] of Object.entries({ chip_word: 'what_is_otp', chip_box: 'if_unsure',
  chip_error: 'red_message', chip_logged_out: 'session_expired', chip_safe: 'check_if_real' })) {
  assert.equal(matchChip(chip)?.id, target);
  for (const language of ['en', 'ur'] as const) assert.equal(matchQuestion(STRINGS[chip][language])?.id, target);
}
for (const entry of KB) {
  for (const target of entry.chips ?? []) assert.equal(matchQuestion(target)?.id, target);
}

function play(mode: 'clean' | 'supported' | 'revealed') {
  let state = createInitialState(LESSON1, 0, 100);
  let clock = 100;
  const shown = new Set<HiccupId>();
  const send = (action: Action) => { clock += 10; state = reduce(state, action, clock); };
  const submit = () => send({ type: 'submit', now: clock + 10 });
  const resolve = () => {
    if (!state.hiccup) return;
    shown.add(state.hiccup);
    send({ type: 'resolveHiccup' });
  };
  const answers: Record<string, string> = { name: LESSON1.persona.name, father: LESSON1.persona.father,
    dob: LESSON1.persona.dob, id: LESSON1.persona.idNumber.replace(/-/g, ''), phone: LESSON1.persona.phone.replace(/-/g, '') };
  let iterations = 0;
  while (!state.done) {
    assert.ok(iterations++ < 40, 'lesson did not finish');
    resolve();
    const step = state.lesson.steps[state.stepIndex];
    if (mode === 'supported' && step.id === 'name') { send({ type: 'backPressed' }); resolve(); }
    if (step.kind === 'field') {
      if (mode === 'supported') {
        send({ type: 'openLayer', layer: 'asks' });
        if (step.id === 'dob' || step.id === 'photo') {
          send({ type: 'setInput', value: 'wrong' }); submit(); resolve();
        }
      }
      if (mode === 'revealed') send({ type: 'reveal', now: clock + 10 });
      else send({ type: 'setInput', value: step.choices?.find((choice) => choice.correct)?.id ?? answers[step.id] ?? step.example ?? '' });
    }
    submit();
    if (state.hiccup === 'vague_error') { resolve(); submit(); }
  }
  const result = buildResult(scoredEvents(state.events, LESSON1), [], state.hiccupsShown, state.hiccupsRecovered);
  assert.match(state.receiptNo ?? '', /^MASHQ-\d{6}$/);
  assert.ok(state.events.every((event) => !('input' in event) && !('previousInputs' in event)));
  return { result, shown };
}
assert.equal(play('clean').result.rung, 2);
const supported = play('supported');
assert.equal(supported.result.rung, 1);
assert.equal(supported.shown.size, 8);
assert.equal(supported.result.hiccupsShown, 8);
assert.equal(play('revealed').result.rung, 0);
assert.ok(VIDEOS.length > 0);
console.log(`realContent.test.ts passed (${matches}/20 KB matches, bilingual chips, follow-ups, real lesson rungs 2/1/0, 8 hiccups)`);
