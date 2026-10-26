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

// Speaks text; resolves when finished (or immediately when speech isn't available).
export function speak(text, { accent = 'US', rate = 1, lang } = {}) {
  if (!canSpeak()) return Promise.resolve(false);
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang || LANG[accent] || 'en-US';
  const voice = pickVoice(u.lang);
  if (voice) u.voice = voice;
  u.rate = rate;
  return new Promise((resolve) => {
    u.onend = () => resolve(true);
    u.onerror = () => resolve(false);
    synth.speak(u);
  });
}

// Plays a recorded pronunciation, falling back to speech if the file can't play (offline, blocked).
export async function playAudioOr(url, text, opts) {
  if (url) {
    try {
      const audio = new Audio(url);
      audio.playbackRate = opts?.rate || 1;
      await audio.play();
      return true;
    } catch { /* fall through to speech */ }
  }
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
