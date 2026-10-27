// Related words shown around a word: similar (≈), opposite (≠), same family (+).
// The symbols carry the meaning too, so colour is never the only signal.
export const KIND_LABEL = { similar: 'similar meaning', opposite: 'opposite meaning', family: 'same word family' };

// Up to `max` chips, mixing kinds: two similar, one opposite, a third similar, one family.
export function orbitChips({ syn = [], ant = [], fam = [] }, max = 5) {
  const s = syn.map((word) => ({ word, kind: 'similar', mark: '≈' }));
  const a = ant.map((word) => ({ word, kind: 'opposite', mark: '≠' }));
  const f = fam.map((word) => ({ word, kind: 'family', mark: '+' }));
  const slots = [s[0], s[1], a[0], s[2], f[0]];
  const spare = [a[1], f[1]].filter(Boolean);
  return slots.map((c) => c || spare.shift()).filter(Boolean).slice(0, max);
}

// A rough grammatical label for a family member, from its ending.
export function familyLabel(word) {
  if (/ly$/.test(word)) return 'Adverb';
  if (/(tion|sion|ence|ance|ness|ity|ment|ism|ist|er|or|ship|hood)s?$/.test(word)) return 'Noun';
  if (/(ous|ful|ive|al|ic|able|ible|less|ent|ant|ary)$/.test(word)) return 'Adjective';
  if (/(ed|ing|ise|ize|ate|en)$/.test(word)) return 'Verb';
  return 'Related';
}
