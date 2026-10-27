// What to practise: due reviews first, then words the learner met or saved, then fresh words
// from their level and goal so there is always something to do. Builders for each game live here too.
import { get } from './db.js';
import { normalize } from './dictionary.js';
import { fresh, loadReviews, saveReview, getReview } from './srs.js';
import { savedWords } from './saved.js';
import { shuffle } from './hash.js';

// A word of the day the learner has seen joins their reviews (due now).
export async function recordMet(word, now = Date.now()) {
  if (!(await getReview(word))) await saveReview(fresh(word, now));
}

// Everything a game needs about one word, from daily.json or the device's dictionary cache.
export async function cardFor(word, dailyByWord) {
  const d = dailyByWord.get(word);
  if (d) return { w: d.w, pos: d.pos, def: d.def, ex: d.ex, ipa: d.ipa, audio: d.audio, syl: d.syl, allPos: d.allPos };
  const cached = await get('cache', `dict:${word}`).catch(() => null);
  if (!cached) return null;
  const n = normalize(cached.data);
  const m = n.meanings.find((x) => x.example) || n.meanings[0];
  return m ? { w: word, pos: m.pos, def: m.def, ex: m.example, ipa: n.ipa, audio: n.audio, syl: null } : null;
}

// Picks the word ids for a session. Pure, so it is easy to test.
export function pickWords({ reviews, saved, daily, profile, size = 8, from = 'due', now = Date.now() }) {
  const reviewed = new Map(reviews.map((r) => [r.id, r]));
  const due = reviews.filter((r) => r.due <= now).sort((a, b) => a.due - b.due).map((r) => r.id);
  const savedIds = saved.map((s) => s.id);
  const goal = profile?.goal || 'e';
  const level = profile?.level || 2;
  const fresh = shuffle(daily.filter((w) => w.l === level && !reviewed.has(w.w)), `${level}${goal}`, (w) => w.w)
    .sort((a, b) => (b.goals.includes(goal) ? 1 : 0) - (a.goals.includes(goal) ? 1 : 0)).map((w) => w.w);
  let order;
  if (from === 'all') order = [...new Set([...due, ...savedIds, ...reviews.map((r) => r.id)])];
  else if (from === 'goal') order = [...new Set([...due.filter((id) => daily.find((w) => w.w === id)?.goals.includes(goal)), ...fresh])];
  else order = [...new Set([...due, ...savedIds.filter((id) => !reviewed.has(id))])];
  return [...new Set([...order, ...fresh])].slice(0, size);
}

export async function buildSession({ daily, profile, size, from, now = Date.now() }) {
  const [reviews, saved] = await Promise.all([loadReviews().catch(() => []), savedWords().catch(() => [])]);
  const byWord = new Map(daily.map((w) => [w.w, w]));
  const ids = pickWords({ reviews, saved, daily, profile, size: (size || 8) + 4, from, now });
  const cards = [];
  for (const id of ids) {
    const c = await cardFor(id, byWord);
    if (c?.def) cards.push(c);
    if (cards.length === (size || 8)) break;
  }
  return cards;
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasWord = (text, w) => new RegExp(`\\b${esc(w)}\\b`, 'i').test(text || '');

// Short meaning for tight spaces (word match): first clause, at most ~60 characters.
export function shortDef(def) {
  const first = def.split(/[;:]/)[0].replace(/\.$/, '').trim();
  return first.length <= 60 ? first : first.slice(0, first.lastIndexOf(' ', 57)) + '…';
}

// Quiz questions. Types: 'meaning' (pick the meaning), 'gap' (fill the gap; only when the example
// uses the exact word), 'listen' (hear it, pick the word) and 'spell' (hear it, type it).
export function buildQuiz(cards, daily, seed = 'q', count = 5, types = ['meaning', 'gap']) {
  const out = [];
  for (const [i, c] of cards.slice(0, count).entries()) {
    const samePos = daily.filter((w) => w.w !== c.w && w.pos === c.pos && !(w.syn || []).includes(c.w));
    let type = types[i % types.length];
    if (type === 'gap' && !hasWord(c.ex, c.w)) type = types.find((t) => t !== 'gap') || 'meaning';
    const Word = c.w[0].toUpperCase() + c.w.slice(1);
    if (type === 'gap') {
      const others = shuffle(samePos, seed + c.w, (w) => w.w).slice(0, 3).map((w) => w.w);
      const options = shuffle([c.w, ...others], seed + c.w + 'o');
      out.push({ type: 'Fill the gap', kind: 'choice', word: c.w, card: c, text: c.ex.replace(new RegExp(`\\b${esc(c.w)}\\b`, 'i'), '___'),
        options, answer: options.indexOf(c.w), why: `${Word} means: ${c.def}` });
    } else if (type === 'listen') {
      const others = shuffle(daily.filter((w) => w.w !== c.w && Math.abs(w.w.length - c.w.length) <= 3), seed + c.w, (w) => w.w).slice(0, 3).map((w) => w.w);
      const options = shuffle([c.w, ...others], seed + c.w + 'o');
      out.push({ type: 'Listening', kind: 'choice', listen: true, word: c.w, card: c, text: 'Which word did you hear?',
        options, answer: options.indexOf(c.w), why: `${Word}: ${c.def}` });
    } else if (type === 'spell') {
      out.push({ type: 'Spelling', kind: 'typed', listen: true, word: c.w, card: c, text: 'Type the word you hear',
        why: `${c.syl ? c.syl.join(' · ') : c.w}: ${c.def}` });
    } else {
      const others = shuffle(samePos.filter((w) => w.def !== c.def), seed + c.w, (w) => w.w).slice(0, 3).map((w) => shortDef(w.def));
      const right = shortDef(c.def);
      const options = shuffle([right, ...others], seed + c.w + 'o');
      out.push({ type: 'Meaning', kind: 'choice', word: c.w, card: c, text: `What does “${c.w}” mean?`,
        options, answer: options.indexOf(right), why: c.ex ? `For example: “${c.ex}”` : c.def });
    }
  }
  return out;
}

// Word match: the meanings column never lines up with its word.
export function buildMatch(cards, seed = 'm') {
  const words = cards.slice(0, 4).map((c) => c.w);
  let defs = shuffle(cards.slice(0, 4).map((c) => ({ w: c.w, text: shortDef(c.def) })), seed, (d) => d.w);
  if (words.length > 1) {
    // Rotate until no meaning sits beside its own word.
    for (let k = 0; k < defs.length && defs.some((d, i) => d.w === words[i]); k++) defs = [...defs.slice(1), defs[0]];
  }
  return { words, defs };
}

// Letter-by-letter feedback for Listen & spell (edit-distance alignment).
// Returns [{ ch, status: 'ok' | 'wrong' | 'missing' | 'extra' }] in the target word's order.
export function diffSpelling(target, typed) {
  const a = target.toLowerCase(), b = typed.toLowerCase().trim();
  const D = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  const out = [];
  let i = a.length, j = b.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) {
      out.unshift({ ch: a[i - 1], status: a[i - 1] === b[j - 1] ? 'ok' : 'wrong', typed: b[j - 1] }); i--; j--;
    } else if (i > 0 && D[i][j] === D[i - 1][j] + 1) {
      out.unshift({ ch: a[i - 1], status: 'missing' }); i--;
    } else {
      out.unshift({ ch: b[j - 1], status: 'extra' }); j--;
    }
  }
  return out;
}
