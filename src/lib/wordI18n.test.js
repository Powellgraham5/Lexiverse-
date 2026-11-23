import { test } from 'node:test';
import assert from 'node:assert/strict';
import { posLabel, uiLabel, textsToTranslate, PAGE_LANGS } from './wordI18n.js';

test('part-of-speech labels for each Nigerian language', () => {
  assert.equal(posLabel('noun', 'yo'), 'Orúkọ');
  assert.equal(posLabel('Verb', 'ha'), 'Aikatau');
  assert.equal(posLabel('adjective', 'ig'), 'Nkọwaaha');
  assert.equal(posLabel('noun', 'pcm'), null);
  assert.equal(posLabel('noun', 'en'), null);
  assert.equal(uiLabel('meanings', 'yo'), 'Ìtumọ̀');
  assert.deepEqual(PAGE_LANGS, ['en', 'yo', 'ha', 'ig', 'pcm']);
});

test('only the first meanings are translated, with their examples', () => {
  const ms = Array.from({ length: 6 }, (_, i) => ({ def: `d${i}`, example: i % 2 ? `e${i}` : '' }));
  assert.deepEqual(textsToTranslate(ms), ['d0', 'd1', 'e1', 'd2', 'd3', 'e3']);
});

test('no em dashes in the labels', async () => {
  const src = await import('node:fs').then((fs) => fs.readFileSync(new URL('./wordI18n.js', import.meta.url), 'utf8'));
  assert.ok(!src.includes('—'));
});
