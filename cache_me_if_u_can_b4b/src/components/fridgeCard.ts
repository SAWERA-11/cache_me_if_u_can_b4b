import { FRIDGE_IF_STUCK, FRIDGE_REMINDER, FRIDGE_STEPS, HICCUPS, STRINGS, type Lang } from '../theme/wire';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// fontBase64: Noto Naskh Arabic as base64 so Urdu renders in the PDF without a system font.
export function buildFridgeHtml(lang: Lang, fontBase64?: string): string {
  const rtl = lang === 'ur';
  const pick = (b: { ur: string; en: string }) => esc(b[lang] || b.en);
  const steps = FRIDGE_STEPS.map(pick);
  const stuck = FRIDGE_IF_STUCK.map(pick);
  const habits = Object.values(HICCUPS).map((h) => `<li>${pick(h.habit)}</li>`).join('');
  // TODO(UR-review): the Urdu 'if stuck' heading below is mine, not Savera's.
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
<ol>${steps.map((s) => `<li>${s}</li>`).join('')}</ol>
<div class="box"><b>${lang === 'ur' ? 'اگر رک جائیں' : 'If stuck, do this'}</b><ul>${stuck.map((s) => `<li>${s}</li>`).join('')}</ul></div>
<div class="box"><ul>${habits}</ul></div>
<p>${pick(FRIDGE_REMINDER)}</p>
</body></html>`;
}
