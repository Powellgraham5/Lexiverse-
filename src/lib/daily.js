// Word of the day and the daily challenge, built from public/data/daily.json.
import { hash } from './hash.js';

// Local calendar day as YYYY-MM-DD, so "today" follows the learner's own clock.
export const dayKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const dayNumber = (key) => Math.round(Date.UTC(...key.split('-').map((n, i) => (i === 1 ? n - 1 : +n))) / 86400000);

// The words a learner's days are drawn from: words tagged for their goal at their level. When
// that is under MIN_POOL words (e.g. everyday words at Advanced), the goal's words from the
// nearest level are added; only if that is still too few does the whole level join in.
const MIN_POOL = 20;
export function dailyPool(words, { level = 2, goal = 'e' } = {}) {
  const tagged = (l) => words.filter((w) => w.l === l && w.goals.includes(goal));
  let pool = tagged(level);
  for (const near of [level - 1, level + 1]) if (pool.length < MIN_POOL) pool = [...pool, ...tagged(near)];
  if (pool.length < MIN_POOL) pool = [...new Set([...pool, ...words.filter((w) => w.l === level)])];
  return pool.length ? pool : words;
}

// One word per day, cycling through the learner's pool in a stable shuffled order.
export function wordOfTheDay(words, { level = 2, goal = 'e', day = dayKey() } = {}) {
  const pool = dailyPool(words, { level, goal });
  const order = [...pool].sort((a, b) => hash(`${level}${goal}${a.w}`) - hash(`${level}${goal}${b.w}`));
  const n = dayNumber(day);
  return order[((n % order.length) + order.length) % order.length];
}

const POS_HINT = {
  adjective: 'it describes a person or thing',
  noun: 'it names a person, thing or idea',
  verb: 'it is an action, something you do',
  adverb: 'it describes how something is done'
};

const article = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// "Which sentence uses it correctly?" One right answer (the word's own example) and two
// sentences where the word sits in a grammatical slot it can never fill, so there is never a
// second right answer. Words that fit every slot (calm: adjective, noun and verb) get a
// "What does it mean?" question instead.
export function buildChallenge(target, words, seed = target.w) {
  const can = new Set(target.allPos || [target.pos]);
  // Nouns can describe other nouns ("a surprise party"), so a noun never fills an adjective's slot.
  const slots = ['verb', 'noun', 'adjective'].filter((p) => !can.has(p) && !(p === 'adjective' && can.has('noun')));
  const re = (w) => new RegExp(`\\b${escape(w)}\\b`, 'i');
  const donors = words
    .filter((w) => w.w !== target.w && slots.includes(w.pos) && !(w.allPos || []).some((p) => can.has(p)) && re(w.w).test(w.ex))
    .sort((a, b) => hash(seed + a.w) - hash(seed + b.w));
  const picked = [];
  for (const pos of [...slots, ...slots]) {
    const d = donors.find((x) => x.pos === pos && !picked.includes(x));
    if (d && picked.length < 2) picked.push(d);
  }
  const Word = target.w[0].toUpperCase() + target.w.slice(1);
  const place = (sentence, from) => sentence
    .replace(re(from), (m) => (m[0] === m[0].toUpperCase() ? Word : target.w))
    // Keep "a" or "an" in front of the inserted word grammatical, so only the word's slot is wrong.
    .replace(new RegExp(`\\b(a|an|A|An) (${escape(target.w)}|${escape(Word)})\\b`), (_, art, w) => `${art[0] === 'A' ? article(w).replace('a', 'A') : article(w)} ${w}`);

  if (picked.length === 2) {
    const options = [{ text: target.ex, correct: true }, ...picked.map((d) => ({ text: place(d.ex, d.w), correct: false }))]
      .sort((a, b) => hash(seed + a.text) - hash(seed + b.text));
    return {
      kind: 'usage',
      question: 'Which sentence uses it correctly?',
      options,
      answer: options.findIndex((o) => o.correct),
      explain: `${Word} is ${article(target.pos)} ${target.pos}: ${POS_HINT[target.pos] || 'it has its own place in a sentence'}. ${target.def}`
    };
  }

  // Meaning question: two other words' definitions from the same level, never a near-synonym.
  const others = words
    .filter((w) => w.w !== target.w && w.l === target.l && !target.syn?.includes(w.w) && !w.syn?.includes(target.w))
    .sort((a, b) => hash(seed + a.w) - hash(seed + b.w)).slice(0, 2);
  const options = [{ text: target.def, correct: true }, ...others.map((w) => ({ text: w.def, correct: false }))]
    .sort((a, b) => hash(seed + a.text) - hash(seed + b.text));
  return {
    kind: 'meaning',
    question: `What does “${target.w}” mean?`,
    options,
    answer: options.findIndex((o) => o.correct),
    explain: `${Word}: ${target.def} For example: “${target.ex}”`
  };
}

let loading = null;
export function loadDaily(fetchImpl = globalThis.fetch) {
  if (!loading) {
    loading = fetchImpl('/data/daily.json').then((r) => {
      if (!r.ok) throw new Error('daily.json ' + r.status);
      return r.json();
    }).then((d) => d.words).catch((e) => { loading = null; throw e; });
  }
  return loading;
}
