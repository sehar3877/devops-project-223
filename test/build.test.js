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

const t3 = require('node:test');
const a3 = require('node:assert');
const fs3 = require('node:fs');
const path3 = require('node:path');

t3('no built page is empty', () => {
  const dir = path3.join(__dirname, '..', 'out');
  const pages = fs3.readdirSync(dir).filter(f => f.endsWith('.html'));
  a3.ok(pages.length > 0, 'no pages were built');
  for (const p of pages) {
    a3.ok(fs3.statSync(path3.join(dir, p)).size > 0, p + ' is empty');
  }
});
