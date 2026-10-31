export type AddressResult = { ok: true; url: string } | { ok: false; reason: 'empty' | 'invalid' | 'secret' };

// Turns what the person typed into a safe http(s) address, or says why not.
// Secret-like numbers are refused so a code or card number typed here is never loaded as a URL.
export function normalizeAddress(input: string): AddressResult {
  const text = input.trim();
  if (!text) return { ok: false, reason: 'empty' };
  if (/\d{9,}/.test(text.replace(/[\s-]/g, ''))) return { ok: false, reason: 'secret' };
  if (/\s/.test(text)) return { ok: false, reason: 'invalid' };
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(text) ? text : 'https://' + text;
  if (!/^https?:\/\//i.test(withScheme)) return { ok: false, reason: 'invalid' };
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes('.') && url.hostname !== 'localhost') return { ok: false, reason: 'invalid' };
    return { ok: true, url: url.toString() };
  } catch {
    return { ok: false, reason: 'invalid' };
  }
}
