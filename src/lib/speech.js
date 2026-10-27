// Text to speech and voice input through the browser's Web Speech API (free, works offline
// with on-device voices). Every feature checks support first, so the UI can hide what is missing.

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

const LANG = { US: 'en-US', UK: 'en-GB' };

function pickVoice(lang) {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang === lang && v.localService)
    || voices.find((v) => v.lang === lang)
    || voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
}

// iPhones and iPads: speech must start during a tap, and the silent switch mutes the device voice.
export const isIOS = () => typeof navigator !== 'undefined'
  && (/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

// Called whenever the device voice speaks (the app shows a one-time silent-switch tip on iOS).
let deviceVoiceListener = null;
export const onDeviceVoice = (fn) => { deviceVoiceListener = fn; };

// Speaks text; resolves when finished (or immediately when speech isn't available).
export function speak(text, { accent = 'US', rate = 1, lang } = {}) {
  if (!canSpeak()) return Promise.resolve(false);
  const synth = window.speechSynthesis;
  // Only cancel when something is playing: on iOS a cancel straight before speak can drop the new line.
  if (synth.speaking || synth.pending) synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang || LANG[accent] || 'en-US';
  const voice = pickVoice(u.lang);
  if (voice) u.voice = voice;
  u.rate = rate;
  deviceVoiceListener?.();
  return new Promise((resolve) => {
    u.onend = () => resolve(true);
    u.onerror = () => resolve(false);
    synth.speak(u);
  });
}

// iOS only lets speech start inside a tap. A silent utterance spoken during the tap unlocks it,
// so a device-voice fallback after a failed recording can still be heard. Once per page load.
let primed = false;
export function primeSpeech() {
  if (primed || !canSpeak()) return;
  primed = true;
  const u = new SpeechSynthesisUtterance(' ');
  u.volume = 0;
  window.speechSynthesis.speak(u);
}

// Recording hosts that failed this session; their recordings are skipped so the voice answers at once.
const DOWN_KEY = 'lx-audio-down';
const down = new Set((() => { try { return JSON.parse(sessionStorage.getItem(DOWN_KEY) || '[]'); } catch { return []; } })());
const hostOf = (url) => { try { return new URL(url, 'https://x').host; } catch { return ''; } };
function markDown(url) {
  down.add(hostOf(url));
  try { sessionStorage.setItem(DOWN_KEY, JSON.stringify([...down])); } catch { /* private mode */ }
}
export const recordingUsable = (url) => Boolean(url) && !down.has(hostOf(url));

let current = null; // the recorded pronunciation playing now, so it can be stopped

// Stops any speech or recording that is playing.
export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
  if (current) { current.pause(); current.onended?.(); current = null; }
}

// Plays a recorded pronunciation, falling back to the device voice if it can't play (offline,
// blocked, or the recording host is down). Resolves when it has finished (or was stopped).
export async function playAudioOr(url, text, opts) {
  if (!recordingUsable(url)) return speak(text, opts); // synchronous inside the tap
  primeSpeech();
  const audio = new Audio(url);
  audio.playbackRate = opts?.rate || 1;
  current = audio;
  // 'ok' played, 'blocked' (the browser refused to autoplay; not the recording's fault), 'failed'.
  const result = await new Promise((resolve) => {
    let started = false;
    const timer = setTimeout(() => { if (!started) resolve('failed'); }, 2500);
    audio.onplaying = () => { started = true; clearTimeout(timer); };
    audio.onended = () => { clearTimeout(timer); resolve('ok'); };
    audio.onerror = () => { clearTimeout(timer); resolve(started ? 'ok' : 'failed'); };
    audio.play().catch((e) => { clearTimeout(timer); resolve(e?.name === 'NotAllowedError' ? 'blocked' : e?.name === 'AbortError' ? 'ok' : 'failed'); });
  });
  if (current !== audio) return true; // stopped by the learner
  current = null;
  if (result === 'ok') return true;
  audio.pause();
  if (result === 'failed') markDown(url);
  return speak(text, opts);
}

const Recognition = () => (typeof window === 'undefined' ? null : window.SpeechRecognition || window.webkitSpeechRecognition || null);
export const canListen = () => Boolean(Recognition());

// Listens once and resolves with what was heard ('' if nothing). onInterim gets live words.
export function listenOnce({ lang = 'en-US', onInterim } = {}) {
  const R = Recognition();
  if (!R) return { result: Promise.resolve(''), stop() {} };
  const rec = new R();
  rec.lang = lang;
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  let text = '';
  const result = new Promise((resolve) => {
    rec.onresult = (e) => {
      text = Array.from(e.results).map((r) => r[0].transcript).join(' ').trim();
      onInterim?.(text);
    };
    rec.onend = () => resolve(text);
    rec.onerror = () => resolve(text);
  });
  rec.start();
  return { result, stop: () => rec.stop() };
}
