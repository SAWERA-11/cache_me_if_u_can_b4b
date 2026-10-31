import { HICCUPS, STRINGS, type Lang } from '../theme/wire';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// fontBase64: Noto Naskh Arabic as base64 so Urdu renders in the PDF without a system font.
export function buildFridgeHtml(lang: Lang, fontBase64?: string): string {
  const rtl = lang === 'ur';
  const pick = (b: { ur: string; en: string }) => esc(b[lang] || b.en);
  // TODO(UR-review): fridge step wording below is English-first until Savera supplies strings.
  const steps = [
    'Read the page slowly.', 'Take one box at a time.', 'Use the grey example under the box.',
    'If a word is new, ask for its meaning.', 'Look over everything before you submit.',
  ];
  const stuck = ['Stop. Nothing is broken.', 'Go back one step. Your answers stay.', 'Ask someone you trust, or call the official number.'];
  const habits = Object.values(HICCUPS).map((h) => `<li>${pick(h.habit)}</li>`).join('');
  const title = STRINGS.fridge_card ? pick(STRINGS.fridge_card) : 'Fridge card';
  return `<!DOCTYPE html><html dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"/>
<style>
${fontBase64 ? `@font-face { font-family: 'NaskhEmbedded'; src: url(data:font/ttf;base64,${fontBase64}) format('truetype'); }` : ''}
@page { size: A4; margin: 18mm; }
body { font-family: ${rtl ? "'NaskhEmbedded', 'Noto Naskh Arabic', serif" : 'Arial, sans-serif'}; font-size: 20pt; color: #111827; }
h1 { font-size: 30pt; border-bottom: 2px solid #CBD5E1; padding-bottom: 6pt; }
ol, ul { line-height: 1.6; }
.box { border: 2px solid #CBD5E1; border-radius: 10pt; padding: 8pt 16pt; margin: 12pt 0; }
</style></head><body>
<h1>${title}</h1>
<ol>${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
<div class="box"><b>If stuck, do this</b><ul>${stuck.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
<div class="box"><ul>${habits}</ul></div>
<p>Remember to call the official number if you are unsure.</p>
</body></html>`;
}
