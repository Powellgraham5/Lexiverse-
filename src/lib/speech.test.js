import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Fake browser: a speech engine that logs, and an Audio whose play() fails like a 502 recording.
const log = [];
let audioMade = 0;
let playBehaviour = 'fail';
globalThis.sessionStorage = { store: {}, getItem(k) { return this.store[k] ?? null; }, setItem(k, v) { this.store[k] = v; } };
globalThis.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
globalThis.window = globalThis;
globalThis.speechSynthesis = {
  speaking: false, pending: false,
  getVoices: () => [],
  cancel() { log.push('cancel'); },
  speak(u) { log.push(`speak:${u.text}`); setTimeout(() => u.onend?.(), 1); }
};
globalThis.Audio = class {
  constructor(url) { this.url = url; audioMade++; }
  play() {
    log.push('audio.play');
    if (playBehaviour === 'ok') { setTimeout(() => { this.onplaying?.(); this.onended?.(); }, 1); return Promise.resolve(); }
    return Promise.reject(Object.assign(new Error('x'), { name: playBehaviour === 'blocked' ? 'NotAllowedError' : 'NotSupportedError' }));
  }
  pause() {}
};
const speech = await import('./speech.js');

beforeEach(() => { log.length = 0; audioMade = 0; });

test('speak only cancels when something is already speaking', async () => {
  await speech.speak('hello');
  assert.deepEqual(log, ['speak:hello']);
  speechSynthesis.speaking = true;
  log.length = 0;
  const p = speech.speak('again');
  speechSynthesis.speaking = false;
  await p;
  assert.deepEqual(log, ['cancel', 'speak:again']);
});

test('a recording that fails primes speech during the tap, falls back to the voice and is remembered', async () => {
  playBehaviour = 'fail';
  const p = speech.playAudioOr('https://rec.example/a.mp3', 'wander');
  assert.deepEqual(log.slice(0, 2), ['speak: ', 'audio.play'], 'the silent unlock happens before any await');
  await p;
  assert.ok(log.includes('speak:wander'));
  log.length = 0; audioMade = 0;
  speech.playAudioOr('https://rec.example/b.mp3', 'loyal');
  assert.deepEqual(log, ['speak:loyal'], 'the next tap speaks synchronously');
  assert.equal(audioMade, 0);
  assert.equal(speech.recordingUsable('https://rec.example/c.mp3'), false);
});

test('a recording the browser blocks is not marked as broken', async () => {
  playBehaviour = 'blocked';
  await speech.playAudioOr('https://other.example/a.mp3', 'brave');
  assert.ok(log.includes('speak:brave'));
  assert.equal(speech.recordingUsable('https://other.example/z.mp3'), true);
});

test('a recording that plays does not use the voice', async () => {
  playBehaviour = 'ok';
  await speech.playAudioOr('https://good.example/a.mp3', 'calm');
  assert.ok(!log.some((l) => l === 'speak:calm'));
});
