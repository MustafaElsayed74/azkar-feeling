import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
}

const feelings = readJson('../src/data/feelings.json');
const nested = readJson('../src/data/duas_by_feeling.json');
const flat = readJson('../src/data/duas_flat.json');
const arabicTitles = readJson('../src/data/dua_titles_ar.json');

test('generated datasets agree on counts and slugs', () => {
  const nestedCount = nested.feelings.reduce(
    (total, group) => total + group.duas.length,
    0,
  );
  const slugs = nested.feelings.map((group) => group.slug);

  assert.equal(feelings.length, nested.feelings.length);
  assert.equal(nested.total_items, nestedCount);
  assert.equal(flat.length, nestedCount);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.includes('suicidal'));

  for (const group of nested.feelings) {
    assert.equal(group.items_count, group.duas.length, group.slug);
  }
});

test('every dua has Arabic text, a source URL, and a reviewed Arabic title', () => {
  const uniqueTitles = new Set(flat.map((dua) => dua.title));

  for (const dua of flat) {
    assert.match(dua.arabic, /[\u0600-\u06FF]/, dua.title);
    assert.match(dua.source_url, /^https:\/\//, dua.title);
    assert.ok(arabicTitles[dua.title], `Missing Arabic title: ${dua.title}`);
  }

  assert.equal(Object.keys(arabicTitles).length, uniqueTitles.size);
  for (const [englishTitle, arabicTitle] of Object.entries(arabicTitles)) {
    assert.match(arabicTitle, /[\u0600-\u06FF]/, englishTitle);
    assert.doesNotMatch(arabicTitle, /[A-Za-z]/, englishTitle);
  }
});

test('the normalized search model has one entry per unique dua', () => {
  const uniqueDuas = new Set(
    flat.map((dua) => `${dua.title}\u0000${dua.arabic ?? ''}`),
  );

  assert.equal(uniqueDuas.size, 103);
  assert.equal(flat.length, 277);
});
