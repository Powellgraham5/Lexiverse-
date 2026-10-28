import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { PlusIcon, SearchIcon, PenIcon } from '../../app/icons.jsx';
import { toast } from '../../components/toast.jsx';
import { allNotes, addNote, searchNotes } from '../../lib/notebook.js';
import { ago } from '../../lib/history.js';
import './notebook.css';

// The Notebook tab in My Words: every note, newest edit first, with search.
export function Notebook() {
  const { route } = useLocation();
  const [notes, setNotes] = useState(null);
  const [q, setQ] = useState('');
  useEffect(() => { allNotes().then(setNotes).catch(() => setNotes([])); }, []);

  async function create() {
    try { const n = await addNote({ title: '', body: '' }); route(`/words/note/${n.id}`); }
    catch { toast({ text: "Couldn't create a note", kind: 'error' }); }
  }

  if (!notes) return <span class="lx-skeleton mw-sk" aria-busy="true" />;
  const shown = searchNotes(notes, q);
  return (
    <section class="nb" aria-label="Notebook">
      <div class="nb-bar">
        <div class="mw-search nb-search">
          <SearchIcon />
          <label for="nb-q" class="lx-sr">Search your notes</label>
          <input id="nb-q" type="search" value={q} placeholder="Search your notes" autocomplete="off" onInput={(e) => setQ(e.currentTarget.value)} />
        </div>
        <button type="button" class="lx-btn nb-new" onClick={create}><PlusIcon size={20} />New note</button>
      </div>
      {q && <p class="lx-sr" aria-live="polite">{shown.length} note{shown.length === 1 ? '' : 's'} found</p>}
      {notes.length === 0 ? (
        <div class="mw-empty lx-card">
          <span class="nb-empty-icon" aria-hidden="true"><PenIcon size={36} /></span>
          <h2>Your notebook is empty</h2>
          <p>Jot down rules, new words or ideas from your lessons. You can also tap “Save to notebook” on any lesson card or writing format.</p>
          <button type="button" class="lx-btn" onClick={create}>Write your first note</button>
        </div>
      ) : shown.length === 0 ? (
        <p class="mw-none">No note matches “{q}”.</p>
      ) : (
        <ul class="nb-list">
          {shown.map((n) => (
            <li key={n.id}>
              <a class="nb-card" href={`/words/note/${n.id}`}>
                <span class="nb-tag">{n.tag}</span>
                <b>{n.title || 'Untitled note'}</b>
                <span class="nb-snippet">{n.body.slice(0, 140) || 'Empty note'}</span>
                <span class="nb-when">Edited {ago(n.updatedAt)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
