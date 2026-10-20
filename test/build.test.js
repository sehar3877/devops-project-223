// test/build.test.js — runs on Node's built-in test runner. No test framework.
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const pages = fs.readdirSync('out').filter((f) => f.endsWith('.html'));

test('every source produced a page', () => {
  const sources = fs.readdirSync('src').filter((f) => f.endsWith('.md'));
  assert.strictEqual(pages.length, sources.length);
});

test('every page is real HTML and not raw Markdown', () => {
  for (const p of pages) {
    const html = fs.readFileSync('out/' + p, 'utf8');
    assert.match(html, /^<!doctype html>/);
    assert.doesNotMatch(html, /^# /m);
  }
});

// Test 3: no generated page may be empty (a zero-byte page means a silent build failure)
{
  const t3 = require('node:test');
  const assert3 = require('node:assert');
  const fs3 = require('node:fs');
  const path3 = require('node:path');

  t3('no generated page is empty', () => {
    const dir = path3.join(__dirname, '..', 'out');
    const pages = fs3.readdirSync(dir).filter((f) => f.endsWith('.html'));
    assert3.ok(pages.length > 0, 'no pages were built');
    for (const p of pages) {
      assert3.ok(fs3.statSync(path3.join(dir, p)).size > 0, p + ' is empty');
    }
  });
}
