"""Builds public/data/words.txt: common English words in frequency order.

Line 1 holds the rank where each estimated CEFR band ends, e.g. "#bands A1:812 A2:2304 ...".
The app uses a word's rank for its level badge and for the offline Letters (anagram) search.

Run: pip install wordfreq && python scripts/build-frequency.py
"""
import re
from pathlib import Path
from wordfreq import top_n_list, zipf_frequency

ROOT = Path(__file__).resolve().parent.parent
LIMIT = 25000
block = {w.strip() for w in (ROOT / 'scripts/content/blocklist.txt').read_text().splitlines() if w.strip() and not w.startswith('#')}

words = []
for w in top_n_list('en', 80000):
    if re.fullmatch(r'[a-z]{2,}', w) and w not in block:
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
