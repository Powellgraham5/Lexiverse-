import 'fake-indexeddb/auto';
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { saveWord, unsaveWord, isSaved, setNote, getRecord, savedWords } from './saved.js';
import { clear, resetDB } from './db.js';

beforeEach(async () => { resetDB(); await clear('words'); });

test('save and unsave a word, keeping its note', async () => {
  await setNote('Serendipity', 'A lucky dip!');
  assert.equal(await isSaved('serendipity'), false);
  await saveWord('serendipity');
  assert.equal(await isSaved('SERENDIPITY'), true);
  await unsaveWord('serendipity');
  assert.equal(await isSaved('serendipity'), false);
  assert.equal((await getRecord('serendipity')).note, 'A lucky dip!');
});

test('saved words come back newest first', async () => {
  await saveWord('one');
  await new Promise((r) => setTimeout(r, 5));
  await saveWord('two');
  await setNote('three', 'not saved');
  assert.deepEqual((await savedWords()).map((r) => r.id), ['two', 'one']);
});
