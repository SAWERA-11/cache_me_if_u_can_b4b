import Fuse from 'fuse.js';
import type { KBEntry } from '../engine/types';
import { normalizeUrdu } from '../lib/normalizeUrdu';

type SearchRow = { entry: KBEntry; text: string };

const chipIds: Record<string, string> = {
  chip_word: 'word',
  chip_box: 'box',
  chip_error: 'error',
  chip_logged_out: 'logged_out',
  chip_safe: 'safe',
};

export function createMatcher(entries: KBEntry[]): {
  matchQuestion: (question: string) => KBEntry | null;
} {
  const index = new Fuse<SearchRow>(
    entries.flatMap((entry) => entry.variants.map((variant) => ({
      entry, text: normalizeUrdu(variant),
    }))),
    { keys: ['text'], includeScore: true, threshold: 0.4, ignoreLocation: true },
  );
  return {
    matchQuestion: (question: string): KBEntry | null => {
      if (looksLikeSecret(question)) return null;
      const query = normalizeUrdu(question);
      if (!query) return null;
      const best = index.search(query)[0];
      return best && (best.score ?? 1) <= 0.45 ? best.item.entry : null;
    },
  };
}

let matcher: ReturnType<typeof createMatcher> | null = null;

function getMatcher(): ReturnType<typeof createMatcher> {
  if (!matcher) {
    const content = require('../content') as { KB: KBEntry[] };
    matcher = createMatcher(content.KB);
  }
  return matcher;
}

export function matchQuestion(question: string): KBEntry | null {
  return getMatcher().matchQuestion(question);
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
  const content = require('../content') as { KB: KBEntry[] };
  const id = chipIds[chipId];
  return content.KB.find((entry) => entry.chips?.includes(chipId))
    ?? content.KB.find((entry) => entry.id === id) ?? null;
}
