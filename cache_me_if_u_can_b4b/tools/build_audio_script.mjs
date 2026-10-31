// Builds content/audio-script.csv (id,text_ur) from src/content, sorted by the S6 priority order.
// Also writes content/audio-todo.txt: every id whose Urdu is still a draft (TODO(UR-review)).
// Run: node tools/build_audio_script.mjs
import { writeFileSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('../src/guide/test/register.cjs');
const { LESSON1, HICCUPS, SAFETY_LINES, GLOSSARY, STRINGS, KB, GUIDE_TEXT, GUIDE_MAP_LINE } = require('../src/content/index.ts');

// UI strings that get a voice clip (audio id ui_<key>). Short button labels are left silent.
const UI_KEYS = [
  'start', 'practice_banner', 'take_a_moment', 'welcome_back', 'continue_card',
  'consent_title', 'consent_line1', 'consent_line2', 'consent_line3',
  'layer_asks', 'layer_where', 'layer_format', 'layer_unsure',
  'oops_title', 'oops_fix', 'session_expired', 'log_in_again', 'vague_error_banner',
  'review_title', 'read_aloud', 'receipt_save', 'result_title', 'comfort_q',
  'rung_0', 'rung_1', 'rung_2', 'helper_unsure', 'secret_warning', 'video_banner',
  'strength_unaided_recovery', 'strength_fewer_hints', 'strength_careful_check', 'strength_default',
];

// Lines whose on-screen text does not read well aloud (digit patterns). Same meaning, spoken form.
const SPOKEN = {
  dob_format: 'دن، مہینہ، سال۔ مثال کے طور پر: صفر سات، صفر تین، انیس سو اٹھاون۔',
  ui_layer_where: 'یہ کہاں پر ہے؟',
  phone_format: 'صفر تین سے شروع ہونے والے گیارہ ہندسے۔ جیسے: صفر تین سو، ایک دو تین چار پانچ چھ سات۔',
};

const rows = [];
const add = (id, text) => rows.push([id, SPOKEN[id] ?? text]);

// Priority 1: UI prompts, then Lesson 1 asks, then the other lesson layers.
for (const k of UI_KEYS) add(`ui_${k}`, STRINGS[k].ur);
add('ui_consent', [STRINGS.consent_line1.ur, STRINGS.consent_line2.ur, STRINGS.consent_line3.ur].join(' '));
for (const r of LESSON1.ready) if (r.audio) add(r.audio, r.text.ur);
for (const s of LESSON1.steps) if (s.audio?.asks) add(s.audio.asks, s.asks.ur);
for (const s of LESSON1.steps) {
  if (s.audio?.where && s.where) add(s.audio.where, s.where.ur);
  if (s.audio?.format && s.format) add(s.audio.format, s.format.ur);
  if (s.audio?.ifUnsure && s.ifUnsure) add(s.audio.ifUnsure, s.ifUnsure.ur);
}

// Priority 2: hiccup habits and safety lines.
for (const h of Object.values(HICCUPS)) add(h.audio, h.habit.ur);
SAFETY_LINES.forEach((l, i) => add(`safety_${i + 1}`, l.ur));

// Priority 3: Guide field-kind bubbles, form map and safety.
for (const k of Object.values(GUIDE_TEXT.ur.kinds)) add(k.audio, k.asks);
add('guide_map', GUIDE_MAP_LINE.ur);
add('guide_safety', `${GUIDE_TEXT.ur.safety.title}۔ ${GUIDE_TEXT.ur.safety.body}`);

// Priority 4: glossary.
// Glossary terms the Urdu voice mispronounces in Urdu script; the reviewer chose the English spelling.
const SPOKEN_TERM = { g_pickup: ['پک اپ', 'Pickup'], g_surge: ['سرج', 'Surge'] };
const spokenTerm = (t) => (SPOKEN_TERM[t.audio] ? t.term.ur.replace(...SPOKEN_TERM[t.audio]) : t.term.ur);
for (const t of GLOSSARY) add(t.audio, `${spokenTerm(t)}۔ ${t.plain.ur} ${t.analogy.ur}`);

// Priority 5: helper answers.
for (const e of KB) if (e.audio) add(e.audio, `${e.answer.ur} ${e.tryNext.ur}`);

const seen = new Set();
for (const [id] of rows) {
  if (seen.has(id)) throw new Error(`duplicate audio id ${id}`);
  seen.add(id);
}

const q = (s) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
writeFileSync('content/audio-script.csv', 'id,text_ur\n' + rows.map(([id, t]) => `${id},${q(t)}`).join('\n') + '\n', 'utf8');

// Every Urdu line is still a draft until a native speaker approves it in content/review-status.txt.
let approved = new Set();
try {
  approved = new Set(readFileSync('content/review-status.txt', 'utf8').split('\n')
    .map((l) => l.match(/^(\S+):\s*approved/)?.[1]).filter(Boolean));
} catch {}
const todo = rows.map(([id]) => id).filter((id) => !approved.has(id));
writeFileSync('content/audio-todo.txt',
  '# Audio ids whose Urdu text is still a draft (TODO(UR-review)). Regenerate their mp3 after the text is fixed.\n' +
  todo.join('\n') + '\n', 'utf8');

console.log(`${rows.length} clips written to content/audio-script.csv, ${todo.length} still in review`);
