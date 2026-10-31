// Fixture-based tests: node src/helper/__tests__/matcher.test.cjs
/* global __dirname */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const vm = require('node:vm');

const entries = [
  { id: 'word', group: 'words', chips: ['chip_safe'], variants: ['what does domicile mean', 'domicile kya hai', 'لفظ کا مطلب'] },
  { id: 'box', variants: ['how do I fill this box', 'box kaise bharun'] },
  { id: 'error', variants: ['the form shows an error', 'form mein masla'] },
  { id: 'actual_safe_id', group: 'safety', variants: ['is practice safe'] },
];
const matcherPath = path.resolve(__dirname, '../matcher.ts');
const originalLoad = Module._load;
const originalTs = require.extensions['.ts'];
try {
  require.extensions['.ts'] = (module, filename) => {
    module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    }).outputText, filename);
  };
  Module._load = function (request, parent, isMain) {
    if (request === '../content' && parent?.filename === matcherPath) return { KB: entries };
    return originalLoad.call(this, request, parent, isMain);
  };
  const { matchQuestion, matchChip, looksLikeSecret } = require(matcherPath);
  const serverSource = fs.readFileSync(path.resolve(__dirname, '../../../server/index.js'), 'utf8');
  const serverGuard = serverSource.match(/function isSecret\(value\) \{[\s\S]*?\n\}/)[0];
  const isServerSecret = vm.runInNewContext('(' + serverGuard + ')');
  for (const [query, expected] of [
    ['what does domicile mean', 'word'], ['what does domicle mean', 'word'],
    ['DOMICILE KYA HAI?', 'word'], ['domicile kya he', 'word'],
    ['لَفْظ کا مطلب', 'word'], ['how do I fill this box', 'box'],
    ['box kaise bharun', 'box'], ['the form shows an eror', 'error'],
    ['form mein masla', 'error'], ['zzzzzzzzzzzzzz', null], ['', null],
    ['WHAT DOES DOMICILE MEAN', 'word'], ['domicile kya hai!!!', 'word'],
    ['how do i fill this box?', 'box'], ['BOX KAISE BHARUN', 'box'],
    ['the form shows an error.', 'error'], ['FORM MEIN MASLA?', 'error'],
    ['is practice safe', 'actual_safe_id'], ['is practce safe', 'actual_safe_id'],
    ['   ', null], ['pin 1234', null],
  ]) assert.equal(matchQuestion(query)?.id ?? null, expected, query);
  assert.equal(matchChip('chip_word'), entries[0]);
  assert.equal(matchChip('unknown'), null);
  assert.equal(matchChip('chip_safe'), entries[3]);
  assert.equal(matchChip('actual_safe_id'), entries[3]);
  for (const query of ['123456789', '12345-1234567-1', '1234 5678', 'PIN: 1234',
    'password=12', '۱۲۳۴۵۶۷۸۹', '١٢٣٤٥٦٧٨٩', 'pin ۱۲۳۴',
    '03.00.12.34.56.7', '１２３４５６７８９', 'PIN：１２３４', '03/00/12/34/56/7']) {
    assert.equal(looksLikeSecret(query), true, query);
    assert.equal(isServerSecret(query), true, 'server: ' + query);
  }
  for (const query of ['how to fill a form', 'lesson 123', 'pin a message']) {
    assert.equal(looksLikeSecret(query), false, query);
    assert.equal(isServerSecret(query), false, 'server: ' + query);
  }
  console.log('matcher.test.cjs passed');
} finally {
  Module._load = originalLoad;
  if (originalTs) require.extensions['.ts'] = originalTs;
  else delete require.extensions['.ts'];
}
