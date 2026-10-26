import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequest, RequestError, STATES } from './request-state.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function collect(opts) {
  const seen = [];
  const req = createRequest({ showDelay: 30, minVisible: 40, retryDelay: 10, timeout: 200, ...opts, onState: (s) => seen.push(s) });
  return { req, seen, states: () => seen.map((s) => s.state) };
}

test('fast success never shows a skeleton', async () => {
  const { req, states } = collect({ load: async () => ['word'] });
  await req.run();
  assert.deepEqual(states(), [STATES.SUCCESS]);
});

test('slow success shows loading, then success', async () => {
  const { req, states } = collect({ load: async () => { await sleep(60); return ['word']; } });
  await req.run();
  assert.deepEqual(states(), [STATES.LOADING, STATES.SUCCESS]);
});

test('skeleton stays visible for the minimum time', async () => {
  let shown = 0;
  const { req, seen } = collect({ load: async () => { await sleep(35); return ['word']; } });
  const t0 = Date.now();
  await req.run();
  shown = Date.now() - t0;
  assert.equal(seen[0].state, STATES.LOADING);
  assert.ok(shown >= 30 + 40 - 5, `finished after ${shown} ms`);
});

test('empty data gives the empty state', async () => {
  const { req, states } = collect({ load: async () => [] });
  await req.run();
  assert.deepEqual(states(), [STATES.EMPTY]);
});

test('not-found is shown immediately, without retrying', async () => {
  let calls = 0;
  const { req, states } = collect({ load: async () => { calls++; throw new RequestError('not-found'); } });
  await req.run();
  assert.equal(calls, 1);
  assert.deepEqual(states(), [STATES.NOT_FOUND]);
});

test('one silent retry recovers from a blip', async () => {
  let calls = 0;
  const { req, states } = collect({ load: async () => { if (++calls === 1) throw new Error('blip'); return ['word']; } });
  await req.run();
  assert.equal(calls, 2);
  assert.deepEqual(states(), [STATES.SUCCESS]);
});

test('repeated failure ends in the error state with its code', async () => {
  const { req, seen } = collect({ load: async () => { throw new RequestError('server', 'down', 'DICT-503'); } });
  await req.run();
  assert.equal(seen.at(-1).state, STATES.ERROR);
  assert.equal(seen.at(-1).code, 'DICT-503');
});

test('a load that hangs times out into the error state', async () => {
  const { req, seen } = collect({ timeout: 50, retries: 0, load: () => new Promise(() => {}) });
  await req.run();
  assert.equal(seen.at(-1).state, STATES.ERROR);
  assert.equal(seen.at(-1).error.kind, 'timeout');
});

test('offline goes straight to the offline state', async () => {
  let calls = 0;
  const { req, states } = collect({ isOnline: () => false, load: async () => { calls++; return []; } });
  await req.run();
  assert.equal(calls, 0);
  assert.deepEqual(states(), [STATES.OFFLINE]);
});

test('a newer run cancels the older one (fast typing in search)', async () => {
  const { req, states } = collect({ load: async (signal) => { await sleep(50); return ['x']; } });
  const first = req.run();
  await sleep(5);
  const second = req.run();
  await Promise.all([first, second]);
  assert.deepEqual(states().filter((s) => s === STATES.SUCCESS).length, 1);
});
