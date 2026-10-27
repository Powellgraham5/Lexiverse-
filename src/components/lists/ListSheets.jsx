import { useEffect, useState } from 'preact/hooks';
import { Sheet } from '../Sheet.jsx';
import { ListPlanet, ICON_LABEL } from './ListPlanet.jsx';
import { COLOURS, ICONS, MAX_NAME } from '../../lib/lists.js';
import { PenIcon, TrashIcon, DownloadIcon, StarIcon, PlusIcon } from '../../app/icons.jsx';
import './lists.css';

const COLOUR_NAMES = ['Indigo', 'Coral', 'Green', 'Gold', 'Blue', 'Pink'];

// New list, or change a list's colour and icon. Create stays off until there is a name.
export function ListFormSheet({ open, list, onClose, onSave, title }) {
  const [name, setName] = useState('');
  const [colour, setColour] = useState(COLOURS[0]);
  const [icon, setIcon] = useState(ICONS[0]);
  useEffect(() => { if (open) { setName(list?.name || ''); setColour(list?.colour || COLOURS[0]); setIcon(list?.icon || ICONS[0]); } }, [open]);
  const ok = name.trim().length > 0;
  return (
    <Sheet open={open} title={title || (list ? 'Change look' : 'New list')} onClose={onClose}>
      <form class="lf-form" onSubmit={(e) => { e.preventDefault(); if (ok) onSave({ name, colour, icon }); }}>
        <div class="lf-preview" aria-hidden="true"><ListPlanet list={{ name: name || '?', colour, icon }} size={48} /><b>{name.trim() || 'Your new list'}</b></div>
        <div class="lf-field">
          <label for="lf-name">Name</label>
          <input id="lf-name" class="lf-input" value={name} maxLength={MAX_NAME} autocomplete="off" placeholder="Exam preparation" onInput={(e) => setName(e.currentTarget.value)} />
          <span class="lf-count" aria-live="polite">{name.length} / {MAX_NAME}</span>
        </div>
        <fieldset class="lf-swatches" aria-label="Planet colour">
          <legend class="lf-legend">Planet colour</legend>
          {COLOURS.map((c, i) => <button key={c} type="button" class="lf-swatch" style={{ '--c': c }} aria-pressed={colour === c} aria-label={COLOUR_NAMES[i]} onClick={() => setColour(c)} />)}
        </fieldset>
        <fieldset class="lf-icons" aria-label="Icon">
          <legend class="lf-legend">Icon</legend>
          {ICONS.map((ic) => (
            <button key={ic} type="button" class="lf-icon" aria-pressed={icon === ic} aria-label={ICON_LABEL[ic]} onClick={() => setIcon(ic)}>
              <ListPlanet list={{ name: name || 'A', colour: 'transparent', icon: ic }} size={28} />
            </button>
          ))}
        </fieldset>
        <button type="submit" class="lx-btn" aria-disabled={!ok}>{list ? 'Save' : 'Create list'}</button>
      </form>
    </Sheet>
  );
}

// Rename: prefilled; Save stays off while the name is empty or unchanged.
export function RenameSheet({ open, list, onClose, onSave }) {
  const [name, setName] = useState('');
  useEffect(() => { if (open) setName(list?.name || ''); }, [open]);
  const ok = name.trim() && name.trim() !== list?.name;
  return (
    <Sheet open={open} title="Rename list" onClose={onClose}>
      <form class="lf-form" onSubmit={(e) => { e.preventDefault(); if (ok) onSave(name); }}>
        <div class="lf-field">
          <label for="rn-name">List name</label>
          <input id="rn-name" class="lf-input" value={name} maxLength={MAX_NAME} autocomplete="off" onInput={(e) => setName(e.currentTarget.value)}
            ref={(el) => { if (el && open && document.activeElement !== el) { el.focus(); el.select(); } }} />
          <span class="lf-count" aria-live="polite">{name.length} / {MAX_NAME}</span>
        </div>
        <div class="lf-row">
          <button type="button" class="lx-btn secondary" onClick={onClose}>Cancel</button>
          <button type="submit" class="lx-btn" aria-disabled={!ok}>Save</button>
        </div>
      </form>
    </Sheet>
  );
}

// Delete: says exactly what goes and what stays.
export function DeleteSheet({ open, list, count, onClose, onDelete }) {
  return (
    <Sheet open={open} title={`Delete “${list?.name}”?`} onClose={onClose}>
      <p class="lf-text">The list goes, but its {count} word{count === 1 ? '' : 's'} stay in My Words, with their notes and other lists. You can undo for a few seconds.</p>
      <div class="lf-row">
        <button type="button" class="lx-btn secondary" onClick={onClose}>Keep it</button>
        <button type="button" class="lx-btn lf-danger" onClick={onDelete}>Delete list</button>
      </div>
    </Sheet>
  );
}

export function ListOptionsSheet({ open, list, onClose, onRename, onLook, onExport, onDelete }) {
  return (
    <Sheet open={open} title={list?.name || 'List'} onClose={onClose}>
      <ul class="lf-menu">
        <li><button type="button" onClick={onRename}><PenIcon size={20} />Rename</button></li>
        <li><button type="button" onClick={onLook}><StarIcon size={20} />Change colour and icon</button></li>
        <li><button type="button" onClick={onExport}><DownloadIcon size={20} />Export as CSV</button></li>
        <li class="sep"><button type="button" class="danger" onClick={onDelete}><TrashIcon size={20} />Delete list</button></li>
      </ul>
    </Sheet>
  );
}

// Save a word to one or more lists (from the word page's bookmark).
export function SaveSheet({ open, word, lists, counts, selected, saved, onClose, onSave, onRemove, onNewList }) {
  const [pick, setPick] = useState(new Set());
  useEffect(() => { if (open) setPick(new Set(selected)); }, [open, selected.join()]);
  const toggle = (id) => { const n = new Set(pick); n.has(id) ? n.delete(id) : n.add(id); setPick(n); };
  return (
    <Sheet open={open} title={`Save “${word}”`} onClose={onClose}>
      <p class="lf-text">{lists.length ? 'Pick one or more lists. It is always kept in My Words.' : 'It goes to My Words. Lists help you group words; make one any time.'}</p>
      {lists.length > 0 && (
        <ul class="ss-list">
          {lists.map((l) => (
            <li key={l.id}>
              <label class={`ss-row ${pick.has(l.id) ? 'on' : ''}`}>
                <ListPlanet list={l} size={36} />
                <span><b>{l.name}</b><span>{counts[l.id] || 0} word{counts[l.id] === 1 ? '' : 's'}</span></span>
                <input type="checkbox" checked={pick.has(l.id)} onChange={() => toggle(l.id)} />
              </label>
            </li>
          ))}
        </ul>
      )}
      <button type="button" class="ss-new" onClick={() => onNewList([...pick])}><PlusIcon size={20} />New list</button>
      <button type="button" class="lx-btn" onClick={() => onSave([...pick])}>
        {pick.size ? `Save to ${pick.size} list${pick.size === 1 ? '' : 's'}` : saved ? 'Keep in My Words' : 'Save to My Words'}
      </button>
      {saved && <button type="button" class="lx-btn ghost" onClick={onRemove}>Remove from My Words</button>}
    </Sheet>
  );
}
