import assert from 'node:assert/strict';
import { isDob, isId, isName, isPhone } from '../validators';

assert.equal(isName('Ali'), true);
assert.equal(isName('محمد'), true);
assert.equal(isName(' A '), false);
assert.equal(isName('1234'), false);
assert.equal(isName(''), false);
assert.equal(isName('Sara'), true);
assert.equal(isName('\u0639\u0644\u06cc'), true);
assert.equal(isName('\u06f1\u06f2\u06f3'), false);
assert.equal(isName('\u060c\u061f'), false);

assert.equal(isDob('01-01-1900'), true);
assert.equal(isDob('31-12-2026'), true);
assert.equal(isDob('15-06-2000'), true);
assert.equal(isDob('00-01-2000'), false);
assert.equal(isDob('31/12/2020'), false);
assert.equal(isDob('01-13-2020'), false);

assert.equal(isId('12345-1234567-1'), true);
assert.equal(isId('1234512345671'), true);
assert.equal(isId(' 54321-7654321-9 '), true);
assert.equal(isId('1234-1234567-1'), false);
assert.equal(isId('12345-123456-12'), false);
assert.equal(isId('12345-1234567-A'), false);

assert.equal(isPhone('0300-1234567'), true);
assert.equal(isPhone('03121234567'), true);
assert.equal(isPhone(' 0399-7654321 '), true);
assert.equal(isPhone('0200-1234567'), false);
assert.equal(isPhone('0300-123456'), false);
assert.equal(isPhone('0300-12345678'), false);

console.log('validators.test.ts passed');
