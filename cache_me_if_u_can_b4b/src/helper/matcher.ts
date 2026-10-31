import Fuse from 'fuse.js';
import { KB, STRINGS } from '../content';
import type { KBEntry } from '../engine/types';
import { normalizeUrdu } from '../lib/normalizeUrdu';

type SearchRow = { entry: KBEntry; text: string };

const chipIds: Record<string, string> = {
  chip_word: 'what_is_otp',
  chip_box: 'if_unsure',
  chip_error: 'red_message',
  chip_logged_out: 'session_expired',
  chip_safe: 'check_if_real',
};

const chipGroups: Record<string, KBEntry['group']> = {
  chip_word: 'words', chip_box: 'fields', chip_error: 'errors',
  chip_logged_out: 'logged_out', chip_safe: 'safety',
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
      const target = entries.find((entry) => entry.id === question.trim());
      if (target) return target;
      const best = index.search(query)[0];
      return best && (best.score ?? 1) <= 0.45 ? best.item.entry : null;
    },
  };
}

const matcher = createMatcher(KB);

export function matchQuestion(question: string): KBEntry | null {
  if (!normalizeUrdu(question) || looksLikeSecret(question)) return null;
  const query = normalizeUrdu(question);
  const chip = Object.keys(chipIds).find((id) => id === question.trim()
    || [STRINGS?.[id]?.en, STRINGS?.[id]?.ur].some((text) => !!text && normalizeUrdu(text) === query));
  return chip ? matchChip(chip) : matcher.matchQuestion(question);
}

export function looksLikeSecret(question: string): boolean {
  const normalized = question.normalize('NFKC').replace(/[\u0660-\u0669\u06F0-\u06F9]/g,
    (digit) => String(digit.charCodeAt(0) & 15));
  const compact = normalized.replace(/[\s\p{P}]/gu, '');
  return /\d{9,}/.test(compact)
    || /\d{4}.*\d{4}/.test(compact)
    || /\b(?:password|pin)\s*[:=]?\s*\d+/i.test(normalized);
}

export function matchChip(chipId: string): KBEntry | null {
  const id = chipIds[chipId];
  // KBEntry.chips are follow-up targets, not aliases for the entry holding them.
  return KB.find((entry) => entry.id === chipId)
    ?? KB.find((entry) => entry.id === id)
    ?? (chipGroups[chipId] ? KB.find((entry) => entry.group === chipGroups[chipId]) : null) ?? null;
}
