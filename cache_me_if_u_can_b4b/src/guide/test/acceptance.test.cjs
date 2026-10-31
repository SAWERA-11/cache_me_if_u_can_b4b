// Maaz's real-content checks; native sheets and playback still need phone tests.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const load = require('./load-source.cjs');
const { buildDictionary } = load('src/guide/dictionary.ts');
const { KB } = load('src/content/index.ts');
const { createMatcher, looksLikeSecret } = load('src/helper/matcher.ts');
const matcher = createMatcher(KB);
const questions = [
  ['OTP kya hota hai?', 'what_is_otp'],
  ['What is a verification code?', 'what_is_verification_code'],
  ['domisile kya hai', 'what_is_domicile'],
  ['What does account title mean?', 'what_is_account_title'],
  ['upload kaise karun', 'what_is_upload'],
  ['What is captcha?', 'what_is_captcha'],
  ['date of birth format?', 'date_format'],
  ['CNIC number kaise likhein?', 'id_number_format'],
  ['mobile number kaise likhun', 'phone_number'],
  ['name as on CNIC?', 'name_as_on_id'],
  ['address lines?', 'address_parts'],
  ['choose from a list', 'choice_lists'],
  ['photo upload rules?', 'photo_requirements'],
  ['What is an optional box?', 'required_optional'],
  ['submit nahi ho raha hai', 'will_not_submit'],
  ['my file is too large', 'file_too_large'],
  ['session khatam ho gaya', 'session_expired'],
  ['password bhool gaya hai', 'forgot_password'],
  ['someone called for my code', 'caller_asks_code'],
  ['can I try again please?', 'can_i_try_again'],
];
let matches = 0;
for (const [question, expected] of questions) {
  const actual = matcher.matchQuestion(question)?.id ?? null;
  const pass = actual === expected;
  if (pass) matches++;
  console.log((pass ? 'MATCH ' : 'MISS ') + question + ' -> ' + actual);
}
assert.equal(matcher.matchQuestion('zzzzqxvvv'), null);
assert.equal(matcher.matchQuestion(''), null);
assert.ok(looksLikeSecret('PIN: 1234'));
assert.equal(matcher.matchQuestion('PIN: 1234'), null);
const mapSource = fs.readFileSync('src/audio/audioMap.ts', 'utf8');
const audioIds = new Set(Array.from(mapSource.matchAll(/"([^"]+)"\s*:\s*require\(/g), match => match[1]));
for (const lang of ['ur', 'en']) {
  const dictionary = buildDictionary(lang);
  assert.equal(dictionary.placeholder, false);
  assert.ok(dictionary.glossary.length >= 30);
  const clips = [dictionary.ui.mapAudio, dictionary.safety.audio, ...Object.values(dictionary.kinds).map(kind => kind.audio)];
  clips.forEach(id => assert.ok(audioIds.has(id), 'Missing Guide audio ID: ' + id));
  dictionary.glossary.forEach(term => assert.doesNotThrow(() => new RegExp(term.pattern, 'i')));
}
assert.notEqual(buildDictionary('ur').ui.listen, buildDictionary('en').ui.listen);
console.log('PASS honest fallback; secret guard; Urdu/English dictionaries; 12 Guide audio IDs; glossary patterns');
console.log('Real KB result: ' + matches + '/20 expected answers');
assert.ok(matches >= 14, 'At least 14/20 questions must match the expected KB answer');
