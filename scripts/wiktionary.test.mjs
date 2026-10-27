import { test } from 'node:test';
import assert from 'node:assert/strict';
import { etymologyText, syllables } from './wiktionary.mjs';

const page = (ety, extra = '') => `==English==\n\n===Etymology===\n${ety}\n\n===Pronunciation===\n${extra}\n\n===Noun===\n# x\n\n==French==\n===Etymology===\nnope`;

test('serendipity: suffix, coin and wiki link render as plain text', () => {
  const t = etymologyText(page(`{{ety|en|:af|Serendib<alt:Serendip>|-ity|tree=1}}\nFrom {{suffix|en|Serendip|t1=variant|ity}}. {{coin|en|Horace Walpole|nobycat=1|in=1754}} based on the Persian story of the {{w|The Three Princes of Serendip|Three Princes of Serendip}}, who were “always making discoveries”.`));
  assert.equal(t, 'From Serendip + -ity. Coined by Horace Walpole in 1754 based on the Persian story of the Three Princes of Serendip, who were “always making discoveries”.');
});

test('borrowings name the language and keep glosses', () => {
  const t = etymologyText(page(`{{root|en|ine-pro|*welh₁-}}\nFrom {{uder|en|fro|benevolent}}, borrowed from {{bor|en|la|benevolēns}} ("benevolent").`));
  assert.equal(t, 'From Old French benevolent, borrowed from Latin benevolēns ("benevolent").');
});

test('an unknown template or language drops the whole origin', () => {
  assert.equal(etymologyText(page('From {{mystery|en|thing}}.')), null);
  assert.equal(etymologyText(page('From {{bor|en|xx-unknown|word}}.')), null);
  assert.equal(etymologyText('==English==\n===Noun===\n# x'), null);
});

test('only the English section is read', () => {
  assert.equal(etymologyText('==French==\n===Etymology===\nFrom {{bor|fr|la|x}}.\n\n'), null);
});

test('syllables come from the hyphenation template', () => {
  assert.deepEqual(syllables(page('From x.', '* {{hyphenation|en|ser|en|dip|i|ty}}')), ['ser', 'en', 'dip', 'i', 'ty']);
  assert.deepEqual(syllables(page('From x.', '* {{hyph|en|ben|ev|o|lent||be|nev|o|lent}}')), ['ben', 'ev', 'o', 'lent']);
  assert.equal(syllables(page('From x.')), null);
});
