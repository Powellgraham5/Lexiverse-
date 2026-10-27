import { useState } from 'preact/hooks';
import { Sheet } from './Sheet.jsx';
import { LANGUAGES, searchLanguages, hasVoice } from '../lib/languages.js';
import { CheckIcon } from '../app/icons.jsx';
import './language-picker.css';

// "Translate into" picker: Nigerian languages pinned, search by English or native name.
export function LanguagePicker({ open, value, onPick, onClose, title = 'Translate into' }) {
  const [q, setQ] = useState('');
  const list = searchLanguages(q);
  const pinned = list.filter((l) => l.pinned);
  const rest = list.filter((l) => !l.pinned);
  const Row = (l) => (
    <li key={l.code}>
      <button type="button" class="lp-row" aria-pressed={value === l.code} onClick={() => { onPick(l.code); setQ(''); }}>
        <span class="lp-names"><b>{l.name}</b><span lang={l.code} dir={l.dir || 'ltr'}>{l.native}</span></span>
        <span class="lp-tags">
          {l.beta && <span class="lp-tag">Beta</span>}
          {l.phrasebookOnly ? <span class="lp-tag">Phrasebook</span> : hasVoice(l.code) ? <span class="lp-tag voice">Voice</span> : <span class="lp-tag">Text only</span>}
        </span>
        {value === l.code && <CheckIcon size={20} />}
      </button>
    </li>
  );
  return (
    <Sheet open={open} title={title} onClose={() => { setQ(''); onClose(); }}>
      <label for="lp-q" class="lx-sr">Search languages</label>
      <input id="lp-q" class="lp-search" type="search" placeholder="Search languages" value={q} autocomplete="off" onInput={(e) => setQ(e.currentTarget.value)} />
      <p class="lx-sr" aria-live="polite">{q ? `${list.length} language${list.length === 1 ? '' : 's'}` : ''}</p>
      {pinned.length > 0 && <><h3 class="lp-h">Popular in Nigeria</h3><ul class="lp-list">{pinned.map(Row)}</ul></>}
      {rest.length > 0 && <><h3 class="lp-h">All languages</h3><ul class="lp-list">{rest.map(Row)}</ul></>}
      {!list.length && <p class="lp-empty">No language matches “{q}”.</p>}
    </Sheet>
  );
}

export const LANGUAGE_COUNT = LANGUAGES.length - 1;
