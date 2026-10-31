export function normalizeUrdu(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/\u0640/g, '')
    .replace(/\u064A|\u0649/g, '\u06CC')
    .replace(/\u0643/g, '\u06A9')
    .replace(/\u0647/g, '\u06C1')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
