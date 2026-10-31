import { KB } from '../content';
import Fuse from 'fuse.js';
import type { KBEntry } from '../engine/types';
import { normalizeUrdu } from '../lib/normalizeUrdu';

const chipIds: Record<string, string> = {
  chip_word: 'word',
  chip_box: 'box',
  chip_error: 'error',
  chip_logged_out: 'logged_out',
  chip_safe: 'safe',
};

const index = new Fuse(
  (KB as KBEntry[]).flatMap((entry) => entry.variants.map((variant) => ({
    entry, text: normalizeUrdu(variant),
  }))),
  { keys: ['text'], includeScore: true, threshold: 0.4, ignoreLocation: true },
);

export function matchQuestion(question: string): KBEntry | null {
  const query = normalizeUrdu(question);
  if (!query) return null;
  const best = index.search(query)[0];
  return best && (best.score ?? 1) <= 0.45 ? best.item.entry : null;
}

export function looksLikeSecret(question: string): boolean {
  const normalized = question.replace(/[\u0660-\u0669\u06F0-\u06F9]/g,
    (digit) => String(digit.charCodeAt(0) & 15));
  const compact = normalized.replace(/[\s-]/g, '');
  return /\d{9,}/.test(compact)
    || /\d{4}.*\d{4}/.test(compact)
    || /\b(?:password|pin)\s*[:=]?\s*\d+/i.test(normalized);
}

export function matchChip(chipId: string): KBEntry | null {
  const id = chipIds[chipId];
  return (KB as KBEntry[]).find((entry) => entry.id === id) ?? null;
}
