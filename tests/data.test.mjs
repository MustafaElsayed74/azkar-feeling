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

test('every dua context has an Arabic source text', () => {
  const manualContexts = {
    'Istiʿadhah #1':
      'قال الله تعالى: فإذا قرأت القرآن فاستعذ بالله من الشيطان الرجيم.',
  };
  const uniqueContexts = new Map();

  for (const dua of flat.filter((item) => item.hadith || item.virtue)) {
    const [primaryArabic, ...embeddedLines] = dua.arabic.split(/\r?\n/);
    const key = `${dua.title}\u0000${primaryArabic.trim()}`;
    const arabicReference = (dua.reference || '')
      .split(/\r?\n/)
      .filter((line) => /[\u0600-\u06FF]/.test(line))
      .join('\n')
      .trim();
    const candidates = [
      arabicReference,
      embeddedLines.join('\n').trim(),
      manualContexts[dua.title] || '',
    ].filter(
      (value) => value.replace(/[^\u0621-\u064A]/g, '').length >= 45,
    );
    const bestContext = candidates.sort((a, b) => b.length - a.length)[0];
    const existing = uniqueContexts.get(key);

    if (bestContext && (!existing || bestContext.length > existing.length)) {
      uniqueContexts.set(key, bestContext);
    } else if (!uniqueContexts.has(key)) {
      uniqueContexts.set(key, '');
    }
  }

  assert.equal(uniqueContexts.size, 84);
  for (const [key, context] of uniqueContexts) {
    assert.ok(context, `Missing Arabic context: ${key.split('\u0000')[0]}`);
    assert.match(context, /[\u0600-\u06FF]/, key);
    assert.doesNotMatch(context, /[A-Za-z]/, key);
  }
});
