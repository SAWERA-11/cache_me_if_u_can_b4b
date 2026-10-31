import assert from 'node:assert/strict';
import type { KBEntry } from '../../engine/types';
import { createMatcher, looksLikeSecret } from '../matcher';

const bi = { ur: '', en: '' };
const entry = (id: string, ...variants: string[]): KBEntry => ({
  id, group: 'words', variants, answer: bi, tryNext: bi,
});
const entries = [
  entry('word', 'what is a word', 'lafz kya hai', 'لفظ کیا ہے'),
  entry('box', 'what does this box ask', 'yeh dabba kya poochta hai', 'یہ خانہ کیا پوچھتا ہے'),
  entry('error', 'what should I do about an error', 'ghalti ka kya karun', 'غلطی کا کیا کروں'),
  entry('logged_out', 'I was logged out', 'mujhe bahar kar diya', 'مجھے باہر کر دیا'),
  entry('safe', 'is this practice safe', 'kya yeh mehfooz hai', 'کیا یہ محفوظ ہے'),
];
const matcher = createMatcher(entries);

assert.equal(matcher.matchQuestion('what is a word')?.id, 'word');
assert.equal(matcher.matchQuestion('lafz kya hai')?.id, 'word');
assert.equal(matcher.matchQuestion('ye dabba kya poochta hai')?.id, 'box');
assert.equal(matcher.matchQuestion('ghalti ka kia karun')?.id, 'error');
assert.equal(matcher.matchQuestion('mujhe bahar kr diya')?.id, 'logged_out');
assert.equal(matcher.matchQuestion('is this practice safe')?.id, 'safe');
assert.equal(matcher.matchQuestion('لفظ کیا ہے')?.id, 'word');
assert.equal(matcher.matchQuestion('what is this completely unrelated thing'), null);
assert.equal(matcher.matchQuestion('pin 1234'), null);
assert.equal(matcher.matchQuestion('03001234567'), null);

assert.equal(looksLikeSecret('123456789'), true);
assert.equal(looksLikeSecret('1234 5678'), true);
assert.equal(looksLikeSecret('password: 1234'), true);
assert.equal(looksLikeSecret('کیا یہ محفوظ ہے'), false);

console.log('matcher.test.ts passed');
