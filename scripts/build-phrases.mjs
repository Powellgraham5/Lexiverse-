// Builds public/data/phrases.json from scripts/content/phrases.txt.
// A phrase in a language counts as reviewed when its box is ticked in docs/PHRASE_REVIEW.md;
// the review file is (re)generated with every unreviewed line so nothing is missed.
// Run: node scripts/build-phrases.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const LANGS = ['yo', 'ha', 'ig', 'pcm', 'fr'];
const NAMES = { yo: 'Yoruba', ha: 'Hausa', ig: 'Igbo', pcm: 'Nigerian Pidgin', fr: 'French' };
const REVIEW = join(ROOT, 'docs/PHRASE_REVIEW.md');

const rows = readFileSync(join(ROOT, 'scripts/content/phrases.txt'), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#'))
  .map((l) => { const [id, category, en, ...t] = l.split('|'); return { id, category, en, t: Object.fromEntries(LANGS.map((c, i) => [c, t[i]])) }; });

// Ticked lines look like: - [x] `thank-you` · yo · Ẹ ṣé
const ticked = new Set();
if (existsSync(REVIEW)) {
  for (const m of readFileSync(REVIEW, 'utf8').matchAll(/^- \[[xX]\] `([^`]+)` · ([a-z]+) · (.*)$/gm)) {
    const row = rows.find((r) => r.id === m[1]);
    // Only counts if the text still matches what was reviewed.
    if (row && row.t[m[2]] === m[3].trim()) ticked.add(`${m[1]}:${m[2]}`);
  }
}

const phrases = rows.map((r) => ({
  id: r.id, category: r.category, en: r.en,
  t: Object.fromEntries(LANGS.map((c) => [c, { text: r.t[c], reviewed: ticked.has(`${r.id}:${c}`) }]))
}));
writeFileSync(join(ROOT, 'public/data/phrases.json'), JSON.stringify({ version: 1, languages: LANGS, phrases }));

const lines = ['# Phrasebook review', '',
  'Every phrase in the app\'s offline phrasebook, by language. A native speaker ticks each line that is correct (change `[ ]` to `[x]`).',
  'If a line is wrong, fix the text in `scripts/content/phrases.txt`, then tick it here with the corrected text.',
  'Run `node scripts/build-phrases.mjs` afterwards. Unticked phrases show "to be checked by a native speaker" in the app.', ''];
for (const c of LANGS) {
  lines.push(`## ${NAMES[c]}`, '');
  for (const r of rows) lines.push(`- [${ticked.has(`${r.id}:${c}`) ? 'x' : ' '}] \`${r.id}\` · ${c} · ${r.t[c]}`);
  lines.push('');
}
writeFileSync(REVIEW, lines.join('\n'));
const count = (c) => phrases.filter((p) => p.t[c].reviewed).length;
console.log(`phrases.json: ${phrases.length} phrases; reviewed ${LANGS.map((c) => `${c} ${count(c)}/${phrases.length}`).join(', ')}`);
