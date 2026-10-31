// Builds content/review.html: the priority Urdu lines (safety, hiccup habits, Lesson 1 questions,
// main buttons) with English beside them and a play button where a clip exists.
// Open the file in a browser, mark each line, then press "Copy results" and paste them to the team.
// Run: node tools/build_review_page.mjs
import { existsSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('../src/guide/test/register.cjs');
const { LESSON1, HICCUPS, SAFETY_LINES, STRINGS } = require('../src/content/index.ts');

const clip = (id) => (id && existsSync(`assets/audio/${id}.mp3`) ? id : null);
const sections = [];

sections.push({
  title: '1. Safety lines',
  items: SAFETY_LINES.map((l, i) => ({ id: `safety_${i + 1}`, en: l.en, ur: l.ur, audio: clip(`safety_${i + 1}`) })),
});

sections.push({
  title: '2. Hiccup habits (one calm habit for each surprise)',
  items: Object.values(HICCUPS).map((h) => ({ id: h.audio, en: h.habit.en, ur: h.habit.ur, audio: clip(h.audio) })),
});

const lesson = [
  { id: 'lesson_title', en: LESSON1.title.en, ur: LESSON1.title.ur, audio: null },
  ...LESSON1.ready.map((r) => ({ id: r.id, en: r.text.en, ur: r.text.ur, audio: clip(r.audio) })),
];
for (const s of LESSON1.steps) {
  lesson.push({ id: `label_${s.id}`, en: s.label.en, ur: s.label.ur, audio: null, note: 'Box title' });
  lesson.push({ id: s.audio?.asks ?? `asks_${s.id}`, en: s.asks.en, ur: s.asks.ur, audio: clip(s.audio?.asks), note: 'Question' });
}
sections.push({ title: '3. Lesson 1: title, things to keep ready, and each question', items: lesson });

const BUTTONS = [
  'start', 'next', 'back', 'try_again', 'got_it', 'listen', 'stuck', 'helper', 'submit',
  'practice_banner', 'take_a_moment',
  'layer_asks', 'layer_where', 'layer_format', 'layer_unsure',
  'oops_title', 'oops_fix', 'session_expired', 'log_in_again', 'review_title',
  'consent_title', 'consent_line1', 'consent_line2', 'consent_line3',
  'rung_0', 'rung_1', 'rung_2',
];
sections.push({
  title: '4. Main buttons and screen lines',
  items: BUTTONS.map((k) => {
    const audio = clip(`ui_${k}`);
    return { id: audio ?? `str_${k}`, en: STRINGS[k].en, ur: STRINGS[k].ur, audio };
  }),
});

// Strings Ahmer added during app integration (src/content/integrationStrings.ts). Screen text only.
const { INTEGRATION_STRINGS } = require('../src/content/integrationStrings.ts');
sections.push({
  title: '5. New app screen lines (added by Ahmer)',
  items: Object.entries(INTEGRATION_STRINGS).map(([k, v]) => ({ id: `str_${k}`, en: v.en, ur: v.ur, audio: null })),
});

const total = sections.reduce((n, s) => n + s.items.length, 0);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const body = sections.map((s) => `
<h2>${esc(s.title)}</h2>
${s.items.map((it) => `
<div class="item" data-id="${esc(it.id)}">
  <div class="meta">${esc(it.id)}${it.note ? ` · ${esc(it.note)}` : ''}</div>
  <div class="ur" dir="rtl" lang="ur">${esc(it.ur)}</div>
  <div class="en">${esc(it.en)}</div>
  ${it.audio ? `<audio controls preload="none" src="../assets/audio/${esc(it.audio)}.mp3"></audio>` : '<div class="noaudio">No voice clip (screen text only)</div>'}
  <div class="actions">
    <button class="ok" type="button">Approve</button>
    <button class="fix" type="button">Needs fix</button>
  </div>
  <div class="fixbox">
    <label>Better Urdu (optional)<textarea class="better" dir="rtl" lang="ur" rows="2"></textarea></label>
    <label>What is wrong? (gender, tone, pronunciation, pause…)<textarea class="why" rows="2"></textarea></label>
  </div>
</div>`).join('')}`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mashq: Urdu review (priority lines)</title>
<style>
@font-face { font-family: 'Naskh'; src: url('../assets/fonts/NotoNaskhArabic-Regular.ttf'); }
body { font-family: system-ui, sans-serif; max-width: 760px; margin: 0 auto; padding: 16px 16px 120px; background: #faf8f4; color: #1d1d1d; }
h1 { font-size: 24px; } h2 { margin-top: 36px; font-size: 20px; border-bottom: 2px solid #ddd; padding-bottom: 6px; }
.help { background: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 12px 16px; line-height: 1.6; }
.item { background: #fff; border: 2px solid #e2e2e2; border-radius: 12px; padding: 14px 16px; margin: 14px 0; }
.item.approved { border-color: #2e7d32; background: #f1f8f2; }
.item.needsfix { border-color: #b26a00; background: #fff8ec; }
.meta { font-size: 13px; color: #777; }
.ur { font-family: 'Naskh', 'Noto Naskh Arabic', 'Segoe UI', serif; font-size: 28px; line-height: 1.9; margin: 6px 0; }
.en { font-size: 17px; color: #444; margin-bottom: 8px; }
.noaudio { font-size: 14px; color: #888; margin: 6px 0; }
audio { width: 100%; margin: 6px 0; }
.actions { display: flex; gap: 10px; margin-top: 8px; }
.actions button { flex: 1; min-height: 52px; font-size: 18px; border-radius: 10px; border: 2px solid #999; background: #fff; cursor: pointer; }
.item.approved .ok { background: #2e7d32; color: #fff; border-color: #2e7d32; }
.item.needsfix .fix { background: #b26a00; color: #fff; border-color: #b26a00; }
.fixbox { display: none; margin-top: 10px; }
.item.needsfix .fixbox { display: block; }
.fixbox label { display: block; font-size: 14px; color: #555; margin-top: 8px; }
textarea { width: 100%; box-sizing: border-box; font-size: 18px; padding: 8px; border-radius: 8px; border: 1px solid #bbb; margin-top: 4px; }
textarea[dir=rtl] { font-family: 'Naskh', 'Noto Naskh Arabic', serif; font-size: 22px; }
.bar { position: fixed; bottom: 0; left: 0; right: 0; background: #1d1d1d; color: #fff; padding: 12px 16px; display: flex; gap: 12px; align-items: center; justify-content: center; flex-wrap: wrap; }
.bar button { min-height: 44px; font-size: 16px; padding: 0 18px; border-radius: 8px; border: 0; cursor: pointer; }
#out { width: 100%; max-width: 760px; display: none; direction: ltr; }
</style>
</head>
<body>
<h1>Mashq: Urdu review</h1>
<div class="help">
  <b>${total} lines.</b> For each line: read the Urdu, press play if there is a clip, then press <b>Approve</b> or <b>Needs fix</b>.<br>
  Check: respectful (آپ), no blame, no scary words, everyday words, numbers read correctly, no odd pauses, works for men and women.<br>
  Your marks are saved in this browser. When done, press <b>Copy results</b> and paste them into the chat.
</div>
${body}
<div class="bar">
  <span id="count"></span>
  <button id="copy" type="button">Copy results</button>
  <textarea id="out" rows="6" readonly></textarea>
</div>
<script>
const KEY = 'mashq-review-v1';
const state = JSON.parse(localStorage.getItem(KEY) || '{}');
const items = [...document.querySelectorAll('.item')];
function save() { localStorage.setItem(KEY, JSON.stringify(state)); render(); }
function render() {
  let done = 0;
  for (const el of items) {
    const s = state[el.dataset.id] || {};
    el.classList.toggle('approved', s.mark === 'approved');
    el.classList.toggle('needsfix', s.mark === 'needs-fix');
    if (s.mark) done++;
  }
  document.getElementById('count').textContent = done + ' / ' + items.length + ' marked';
}
for (const el of items) {
  const id = el.dataset.id;
  const s = state[id] || {};
  el.querySelector('.better').value = s.better || '';
  el.querySelector('.why').value = s.why || '';
  el.querySelector('.ok').onclick = () => { state[id] = { ...state[id], mark: 'approved' }; save(); };
  el.querySelector('.fix').onclick = () => { state[id] = { ...state[id], mark: 'needs-fix' }; save(); };
  el.querySelector('.better').oninput = (e) => { state[id] = { ...state[id], better: e.target.value }; save(); };
  el.querySelector('.why').oninput = (e) => { state[id] = { ...state[id], why: e.target.value }; save(); };
}
document.getElementById('copy').onclick = async () => {
  const lines = items.map((el) => {
    const s = state[el.dataset.id] || {};
    let line = el.dataset.id + ': ' + (s.mark || 'pending');
    if (s.mark === 'needs-fix') line += ' | ur: ' + (s.better || '').trim() + ' | why: ' + (s.why || '').trim();
    return line;
  });
  const text = lines.join('\\n');
  const out = document.getElementById('out');
  out.value = text; out.style.display = 'block';
  try { await navigator.clipboard.writeText(text); document.getElementById('copy').textContent = 'Copied'; }
  catch { out.select(); }
};
render();
</script>
</body>
</html>
`;

writeFileSync('content/review.html', html, 'utf8');
console.log(`content/review.html: ${total} lines in ${sections.length} sections`);
