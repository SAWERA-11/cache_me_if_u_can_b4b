// Isolate the untrusted-message boundary without loading React Native or audio.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const calls = [];
const state = { audioSpeed: 0.8, addStruggle: kind => calls.push(['struggle', kind]) };
const dependencies = {
  '../lib/audio': { playClip: (...args) => calls.push(['audio', ...args]) },
  '../lib/uiBus': { uiBus: { emit: (...args) => calls.push(['event', ...args]) } },
  '../store/useApp': { useApp: { getState: () => state } },
};
const source = ts.transpileModule(fs.readFileSync('src/guide/bridge.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const sandbox = { exports: {}, require: name => { assert.ok(dependencies[name], name); return dependencies[name]; } };
vm.runInNewContext(source, sandbox);
const handle = sandbox.exports.handleGuideMessage;
for (const raw of ['{', 'null', '[]', '"text"', 'x'.repeat(4097)]) assert.doesNotThrow(() => handle(raw));
for (const msg of [
  { type: 'PLAY_AUDIO', audioId: 'guide_name', value: 'NEVER_FORWARD' },
  { type: 'JARGON', termId: 'domicile', pageText: 'NEVER_FORWARD' },
  { type: 'ASK_HELPER', kinds: ['name', 'name', 'phone'] },
  { type: 'FIELD_HELP', fieldKind: 'name' },
]) handle(JSON.stringify(msg));
assert.equal(JSON.stringify(calls), JSON.stringify([
  ['audio', 'guide_name', 0.8], ['event', 'jargon', 'domicile'],
  ['event', 'helper', ['name', 'phone']], ['struggle', 'name'],
]));
const count = calls.length;
for (const msg of [
  { type: 'PLAY_AUDIO', audioId: '../private/file' },
  { type: 'JARGON', termId: '<page text>' },
  { type: 'ASK_HELPER', kinds: ['password'] },
  { type: 'ASK_HELPER', kinds: Array(11).fill('name') },
  { type: 'FIELD_HELP', fieldKind: 'sensitive' },
  { type: 'SENSITIVE_FOCUS' }, { type: 'GUIDE_READY', url: 'https://example.invalid/' },
  { type: 'CHECK_RESULT', emptyRequiredCount: 1 },
]) handle(JSON.stringify(msg));
assert.equal(calls.length, count);
assert.ok(!JSON.stringify(calls).includes('NEVER_FORWARD'));
console.log('PASS bridge accepts allowed identifiers/kinds and ignores malformed, unknown and sensitive payloads');
