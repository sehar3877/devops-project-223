const { test } = require('node:test');
const assert = require('node:assert');
const { isSamePage } = require('../tools/same-page');

test('different titles are not the same page', () => {
  assert.strictEqual(isSamePage({ title: 'a' }, { title: 'b' }), false);
});

test('equal titles are the same page', () => {
  assert.strictEqual(isSamePage({ title: 'a' }, { title: 'a' }), true);
});

test('a missing page is never the same page', () => {
  assert.strictEqual(isSamePage(null, { title: 'a' }), false);
});
