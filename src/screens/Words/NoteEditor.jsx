import { useEffect, useRef, useState } from 'preact/hooks';
import { useRoute, useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { BackIcon, TrashIcon } from '../../app/icons.jsx';
import { toast } from '../../components/toast.jsx';
import { getNote, updateNote, deleteNote, restoreNote } from '../../lib/notebook.js';
import './notebook.css';

// One note on ruled paper. Saves 600 ms after typing stops.
export default function NoteEditor() {
  const { params } = useRoute();
  const { route } = useLocation();
  const [note, setNote] = useState(undefined);
  const [status, setStatus] = useState('');
  const timer = useRef(null);
  usePage(note?.title || 'Note');
  useEffect(() => { getNote(params.id).then(setNote).catch(() => setNote(null)); }, [params.id]);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Always save both fields from the latest state, so a quick title edit followed by a body edit
  // does not lose the title when the second edit replaces the pending save.
  const latest = useRef(null);
  function edit(patch) {
    const next = { ...note, ...latest.current, ...patch };
    latest.current = next;
    setNote(next);
    setStatus('');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => updateNote(next.id, { title: latest.current.title, body: latest.current.body })
      .then(() => setStatus('Saved')).catch(() => setStatus("Couldn't save")), 600);
  }
  async function remove() {
    clearTimeout(timer.current);
    const gone = await deleteNote(note.id).catch(() => null);
    route('/words?tab=notebook');
    toast({ text: 'Note deleted', kind: 'success', action: 'Undo', onAction: () => restoreNote(gone).then(() => route(`/words/note/${gone.id}`)) });
  }

  const top = <div class="ld-top"><a class="ld-round" href="/words?tab=notebook" aria-label="Back to notebook"><BackIcon /></a>
    {note && <button type="button" class="ld-round" aria-label="Delete note" onClick={remove}><TrashIcon /></button>}</div>;
  if (note === undefined) return <>{top}<h1 class="lx-sr">Note</h1><span class="lx-skeleton mw-sk" aria-busy="true" /></>;
  if (!note) return <>{top}<section class="mw-empty lx-card"><h1 class="lx-page-title">This note isn't here</h1><p>It may have been deleted.</p><a class="lx-btn" href="/words?tab=notebook">Open notebook</a></section></>;

  return (
    <>
      {top}
      <h1 class="lx-sr">{note.title || 'Untitled note'}</h1>
      <div class="ne-paper lx-rise">
        <span class="nb-tag">{note.tag}</span>
        <label for="ne-title" class="lx-sr">Title</label>
        <input id="ne-title" class="ne-title" value={note.title} placeholder="Title" maxLength={120} onInput={(e) => edit({ title: e.currentTarget.value })} />
        <label for="ne-body" class="lx-sr">Note</label>
        <textarea id="ne-body" class="ne-body" value={note.body} placeholder="Start writing…" onInput={(e) => edit({ body: e.currentTarget.value })} />
      </div>
      <p class="ne-status" role="status">{status}</p>
    </>
  );
}
