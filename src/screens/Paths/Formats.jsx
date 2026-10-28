import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { BackIcon, CopyIcon, PenIcon, ChevronIcon } from '../../app/icons.jsx';
import { toast } from '../../components/toast.jsx';
import { FORMAT_GROUPS } from '../../content/formats.js';
import { addNote } from '../../lib/notebook.js';
import { pathById } from '../../lib/paths.js';
import './paths.css';

const asText = (f) => f.template.join('\n');

function FormatCard({ group, f }) {
  const [open, setOpen] = useState(false);
  const [target] = f.practice || [];
  async function copy() {
    try { await navigator.clipboard.writeText(asText(f)); toast({ text: 'Template copied', kind: 'success' }); }
    catch { toast({ text: "Couldn't copy on this device", kind: 'error' }); }
  }
  async function save() {
    try {
      await addNote({ title: `${f.title} (${group.title})`, body: `${f.use}\n\n${asText(f)}\n\nRules:\n${f.rules.map((r) => `• ${r}`).join('\n')}`, tag: group.title });
      toast({ text: 'Saved to your notebook', kind: 'success', action: 'Open', onAction: () => { location.href = '/words?tab=notebook'; } });
    } catch { toast({ text: "Couldn't save the note", kind: 'error' }); }
  }
  return (
    <li class="fm-card lx-card">
      <button type="button" class="fm-head" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span><b>{f.title}</b><span>{f.use}</span></span>
        <ChevronIcon class={open ? 'fm-chev open' : 'fm-chev'} />
      </button>
      {open && (
        <div class="fm-body">
          <h4>Layout</h4>
          <pre class="fm-template" aria-label={`${f.title} layout`}>{asText(f)}</pre>
          <h4>Rules</h4>
          <ul class="fm-rules">{f.rules.map((r) => <li key={r}>{r}</li>)}</ul>
          <p class="fm-mistake"><b>Common mistake:</b> {f.mistake}</p>
          <div class="fm-actions">
            <button type="button" class="lx-btn secondary small" onClick={copy}><CopyIcon size={18} />Copy template</button>
            <button type="button" class="lx-btn secondary small" onClick={save}><PenIcon size={18} />Save to notebook</button>
            {target && pathById(target)?.load && <a class="lx-btn small" href={`/learn/path/${f.practice[0]}/${f.practice[1]}`}>Practise it</a>}
          </div>
        </div>
      )}
    </li>
  );
}

export default function Formats() {
  usePage('Writing formats');
  const { query } = useLocation();
  const [group, setGroup] = useState(query.group && FORMAT_GROUPS.some((g) => g.id === query.group) ? query.group : 'all');
  const shown = group === 'all' ? FORMAT_GROUPS : FORMAT_GROUPS.filter((g) => g.id === group);
  return (
    <>
      <div class="ld-top"><a class="ld-round" href="/learn/paths" aria-label="Back to learning paths"><BackIcon /></a></div>
      <h1 class="lx-page-title lx-rise">Writing formats</h1>
      <p class="pt-sub lx-rise lx-d1">The layout and rules for each kind of writing. Open one, copy the template or save it to your notebook.</p>
      <div class="fm-filter lx-rise lx-d1" role="group" aria-label="Show formats for">
        {[['all', 'All'], ...FORMAT_GROUPS.map((g) => [g.id, g.title])].map(([id, label]) => (
          <button key={id} type="button" class="fm-chip" aria-pressed={group === id} onClick={() => setGroup(id)}>{label}</button>
        ))}
      </div>
      {shown.map((g) => (
        <section key={g.id} class="fm-group lx-rise lx-d2" aria-labelledby={`fm-${g.id}`}>
          <h2 id={`fm-${g.id}`}>{g.title}</h2>
          {g.note && <p class="pd-note">{g.note}</p>}
          <ul class="fm-list">{g.formats.map((f) => <FormatCard key={f.id} group={g} f={f} />)}</ul>
        </section>
      ))}
    </>
  );
}
