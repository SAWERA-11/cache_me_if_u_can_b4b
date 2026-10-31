const assert = require('node:assert/strict');
require('./register.cjs');
const { normalizeAddress } = require('../address.ts');

assert.deepEqual(normalizeAddress('  example.com/form '), { ok: true, url: 'https://example.com/form' });
assert.deepEqual(normalizeAddress('http://example.com'), { ok: true, url: 'http://example.com/' });
assert.equal(normalizeAddress('').reason, 'empty');
assert.equal(normalizeAddress('javascript:alert(1)').reason, 'invalid');
assert.equal(normalizeAddress('file:///etc/passwd').reason, 'invalid');
assert.equal(normalizeAddress('two words').reason, 'invalid');
assert.equal(normalizeAddress('notasite').reason, 'invalid');
assert.equal(normalizeAddress('4111 1111 1111 1111').reason, 'secret');
console.log('PASS address: scheme added, http(s) only, secrets and junk refused');
