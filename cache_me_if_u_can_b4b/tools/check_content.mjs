// Sanity checks for src/content. Run: node --experimental-strip-types tools/check_content.mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('../src/guide/test/register.cjs');
const { LESSON1, HICCUPS, SAFETY_LINES, GLOSSARY, STRINGS, KB, GUIDE_TEXT } = require('../src/content/index.ts');

const REQUIRED_KEYS = `start listen stuck helper practice_banner next back undo try_again got_it take_a_moment yes no continue_card welcome_back
consent_title consent_line1 consent_line2 consent_line3
home_title lessons find_help guide_me guide_on_badge settings
step_of
layer_asks layer_where layer_format layer_unsure
oops_title oops_fix sms_banner session_expired log_in_again vague_error_banner
review_title read_aloud submit receipt_title receipt_save
result_title rung_0 rung_1 rung_2 comfort_q comfort_ok comfort_unsure comfort_notyet next_lesson practise_again
fridge_card share_whatsapp wa_training_wheels wa_share_app
find_video_title checked_by_team from_youtube video_helped_q video_banner
helper_title helper_unsure secret_warning jargon_title chip_word chip_box chip_error chip_logged_out chip_safe
settings_text_size settings_audio_speed settings_language settings_reset settings_share_progress settings_about
strength_unaided_recovery strength_fewer_hints strength_careful_check strength_default`.split(/\s+/);

const problems = [];
const bad = (m) => problems.push(m);
const emptyBi = (b) => !b || !b.en || !b.ur;

for (const k of REQUIRED_KEYS) if (!STRINGS[k] || emptyBi(STRINGS[k])) bad(`STRINGS missing ${k}`);
if (!STRINGS.step_of.en.includes('{n}') || !STRINGS.step_of.ur.includes('{total}')) bad('step_of placeholders');
if (!STRINGS.sms_banner.en.includes('{code}') || !STRINGS.sms_banner.ur.includes('{code}')) bad('sms_banner placeholder');
for (const [k, v] of Object.entries(STRINGS)) if (/!/.test(v.en)) bad(`STRINGS ${k} has an exclamation mark`);

const ids = LESSON1.steps.map((s) => s.id).join(',');
if (ids !== 'ready,name,father,dob,id,phone,city,domicile,session,photo,otp,review,submit') bad(`step order ${ids}`);
const p = LESSON1.persona;
for (const s of LESSON1.steps) {
  if (emptyBi(s.label) || emptyBi(s.asks)) bad(`step ${s.id} missing text`);
  if (s.expected && s.example && s.id !== 'name' && s.id !== 'father' && !s.expected(s.example, p)) bad(`step ${s.id} example fails expected`);
  for (const g of s.glossary ?? []) if (!GLOSSARY.find((t) => t.id === g)) bad(`step ${s.id} glossary ${g} missing`);
  if (s.choices && s.choices.filter((c) => c.correct).length !== 1) bad(`step ${s.id} needs exactly one correct choice`);
}
const photo = LESSON1.steps.find((s) => s.id === 'photo');
if (photo.choices[0].correct) bad('photo1 must not be correct');
if (!LESSON1.steps.find((s) => s.id === 'name').expected('Bashir Ahmed', p)) bad('name expected');
if (!LESSON1.steps.find((s) => s.id === 'id').expected('4210112345671', p)) bad('id expected without dashes');

if (Object.keys(HICCUPS).length !== 8) bad('HICCUPS count');
for (const [k, h] of Object.entries(HICCUPS)) if (h.id !== k || h.audio !== `h_${k}` || emptyBi(h.habit) || emptyBi(h.happened)) bad(`hiccup ${k}`);
if (SAFETY_LINES.length !== 6) bad('SAFETY_LINES count');

if (GLOSSARY.length < 30) bad(`GLOSSARY has ${GLOSSARY.length}`);
for (const t of GLOSSARY) {
  if (t.audio !== `g_${t.id}`) bad(`glossary audio ${t.id}`);
  let re;
  try { re = new RegExp(t.pattern, 'i'); } catch (e) { bad(`glossary pattern ${t.id}: ${e.message}`); continue; }
  if (!re.test(t.term.en) && !re.test(t.term.ur)) bad(`glossary pattern ${t.id} does not match its own term`);
}

const want = { words: 8, fields: 10, errors: 8, logged_out: 4, safety: 6, reassurance: 4 };
const got = {};
for (const e of KB) got[e.group] = (got[e.group] ?? 0) + 1;
for (const [g, n] of Object.entries(want)) if (got[g] !== n) bad(`KB ${g}: ${got[g]} (want ${n})`);
const kbIds = new Set(KB.map((e) => e.id));
if (kbIds.size !== KB.length) bad('KB duplicate ids');
for (const e of KB) {
  if (e.variants.length < 4 || e.variants.length > 6) bad(`KB ${e.id} variants ${e.variants.length}`);
  for (const c of e.chips ?? []) if (!kbIds.has(c)) bad(`KB ${e.id} chip ${c} missing`);
  if (e.group === 'safety' && !e.answer.en.endsWith('Hang up and call the official number on your card.')) bad(`KB ${e.id} safety ending`);
}

for (const lang of ['en', 'ur']) {
  const g = GUIDE_TEXT[lang];
  for (const [k, v] of Object.entries(g.kinds)) if (!v.title || !v.asks || v.audio !== `kind_${k}`) bad(`guide ${lang} ${k}`);
}

console.log(problems.length ? problems.join('\n') : 'content OK');
process.exit(problems.length ? 1 : 0);
