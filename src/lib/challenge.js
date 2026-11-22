import { local } from './store.js';

// "Challenge a friend": the link carries the exact questions and the sender's score, nothing else.
// /learn/bank/jamb/<subject>?ch=bi3.bi17...&s=14-20&n=Ada[&subs=english,biology]
export function challengeUrl(origin, { subject, ids, score, total, name = '', subs = [] }) {
  const q = new URLSearchParams({ ch: ids.join('.'), s: `${score}-${total}` });
  if (name.trim()) q.set('n', name.trim().slice(0, 20));
  if (subs.length) q.set('subs', subs.join(','));
  return `${origin}/learn/bank/jamb/${subject}?${q}`;
}

export function readChallenge(query = {}) {
  if (!query.ch) return null;
  const ids = String(query.ch).split('.').filter((x) => /^[a-z]{1,4}\d{1,4}$/.test(x)).slice(0, 60);
  const [score, total] = String(query.s || '').split('-').map(Number);
  if (!ids.length) return null;
  return {
    ids,
    score: Number.isFinite(score) ? score : null,
    total: Number.isFinite(total) ? total : ids.length,
    name: String(query.n || '').replace(/[<>]/g, '').slice(0, 20),
    subs: String(query.subs || '').split(',').filter(Boolean).slice(0, 4)
  };
}

export const challengeText = (title, score, total, url) => `I scored ${score}/${total} on these JAMB ${title} questions on Lexiverse. Can you beat me? ${url}`;
export const whatsappUrl = (text) => `https://wa.me/?text=${encodeURIComponent(text)}`;

// The learner's first name, kept on this device for challenges and certificates.
const NAME = 'lx-name';
export function loadName(storage = local()) { try { return storage?.getItem(NAME) || ''; } catch { return ''; } }
export function saveName(name, storage = local()) { try { storage?.setItem(NAME, name.trim().slice(0, 40)); } catch { /* ignore */ } }
