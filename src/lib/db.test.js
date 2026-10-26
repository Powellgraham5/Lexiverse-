import 'fake-indexeddb/auto';
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { get, put, all, del, clear, resetDB } from './db.js';

beforeEach(async () => { resetDB(); await clear('words'); await clear('kv'); });

test('stores and reads records by id', async () => {
  await put('words', { id: 'serendipity', savedAt: 1 });
  await put('words', { id: 'benevolent', savedAt: 2 });
  assert.deepEqual(await get('words', 'serendipity'), { id: 'serendipity', savedAt: 1 });
  assert.equal((await all('words')).length, 2);
});

test('put replaces an existing record', async () => {
  await put('words', { id: 'eloquent', savedAt: 1 });
  await put('words', { id: 'eloquent', savedAt: 5 });
  assert.equal((await get('words', 'eloquent')).savedAt, 5);
});

test('kv store takes an explicit key', async () => {
  await put('kv', { done: true }, 'onboarding');
  assert.deepEqual(await get('kv', 'onboarding'), { done: true });
});

test('delete removes a record and missing keys read as undefined', async () => {
  await put('words', { id: 'serene' });
  await del('words', 'serene');
  assert.equal(await get('words', 'serene'), undefined);
});
