"""Builds public/data/words.txt: common English words in frequency order.

Line 1 holds the rank where each estimated CEFR band ends, e.g. "#bands A1:812 A2:2304 ...".
The app uses a word's rank for its level badge and for the offline Letters (anagram) search.

Words must be real dictionary words (or an inflection of one), which drops names, brands and
abbreviations (ceo, iphone, dallas). The 3000 most common words are kept as they are.

Run: pip install wordfreq english-words && python scripts/build-frequency.py
"""
import re
from pathlib import Path
from wordfreq import top_n_list, zipf_frequency
from english_words import get_english_words_set

ROOT = Path(__file__).resolve().parent.parent
LIMIT = 25000
block = set(re.findall(r"'([a-z]+)'", (ROOT / 'src/lib/blocklist.js').read_text()))

DICT = get_english_words_set(['web2', 'gcide'], lower=True, alpha=True)
INFLECTIONS = [('ies', 'y'), ('ied', 'y'), ('es', ''), ('s', ''), ('ed', ''), ('ed', 'e'), ('ing', ''), ('ing', 'e'),
               ('er', ''), ('er', 'e'), ('est', ''), ('ly', ''), ('ness', ''), ('ment', '')]


def is_word(w):
    """A dictionary word, an inflection of one, or a British spelling of one."""
    candidates = {w, w.replace('our', 'or'), re.sub(r'is(e|ed|es|ing|ation|ations)$', r'iz\1', w)}
    for c in list(candidates):
        for suf, rep in INFLECTIONS:
            if c.endswith(suf) and len(c) > len(suf) + 1:
                stem = c[:-len(suf)]
                candidates.add(stem + rep)
                if len(stem) > 2 and stem[-1] == stem[-2]:  # banned -> ban, referring -> refer
                    candidates.add(stem[:-1])
    return any(c in DICT for c in candidates)


words = []
for i, w in enumerate(top_n_list('en', 120000)):
    if re.fullmatch(r'[a-z]{2,}', w) and w not in block and (len(words) < 3000 or is_word(w)):
        words.append(w)
    if len(words) == LIMIT:
        break

# Estimated CEFR bands from Zipf frequency (a rough guide, shown to learners as an estimate).
cuts = [('A1', 5.0), ('A2', 4.5), ('B1', 4.0), ('B2', 3.5), ('C1', 3.0)]
bands = []
for name, z in cuts:
    end = next((i for i, w in enumerate(words) if zipf_frequency(w, 'en') < z), len(words))
    bands.append(f'{name}:{end}')

out = ROOT / 'public/data/words.txt'
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text('#bands ' + ' '.join(bands) + '\n' + '\n'.join(words) + '\n')
print(out, len(words), 'words', bands)
