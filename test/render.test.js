// test/render.test.js — unit tests that load tools/build.js directly,
// so the coverage report finally measures the code that matters.
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { makeTitle, renderPage, main } = require('../tools/build');

test('a heading becomes an h1', () => {
  assert.match(renderPage('# Hello', 'x'), /<h1>Hello<\/h1>/);
});

test('the title is the one we pass in', () => {
  assert.match(renderPage('text', 'notes'), /<title>notes<\/title>/);
});

test('makeTitle turns a file name into a readable title', () => {
  assert.strictEqual(makeTitle('src/our-notes.md'), 'Our Notes');
});

test('missing arguments give the usage exit code', () => {
  assert.strictEqual(main([]), 2);
});

test('main writes the page it was asked for', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'render-'));
  const src = path.join(dir, 'hello.md');
  fs.writeFileSync(src, '# Hi');
  assert.strictEqual(main([src, path.join(dir, 'out', 'hello.html')]), 0);
  assert.match(fs.readFileSync(path.join(dir, 'out', 'hello.html'), 'utf8'),
    /<title>Hello<\/title>/);
});
