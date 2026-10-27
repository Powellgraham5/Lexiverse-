import { useEffect, useMemo, useState } from 'preact/hooks';
import { useRoute, useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { useSettings } from '../../app/settings-context.jsx';
import { BackIcon, MoreIcon, SpeakerIcon, CloseIcon, CardsIcon, LearnIcon, SearchIcon } from '../../app/icons.jsx';
import { toast } from '../../components/toast.jsx';
import { Segmented } from '../../components/controls.jsx';
import { ListPlanet } from '../../components/lists/ListPlanet.jsx';
import { ListOptionsSheet, RenameSheet, ListFormSheet, DeleteSheet } from '../../components/lists/ListSheets.jsx';
import { getList, updateList, deleteList, restoreList, wordsInList, removeFromList, listStats, statusOf, toCSV } from '../../lib/lists.js';
import { setWordLists, unsaveWord } from '../../lib/saved.js';
import { loadReviews } from '../../lib/srs.js';
import { loadDaily } from '../../lib/daily.js';
import { shortDef } from '../../lib/practice.js';
import { playAudioOr } from '../../lib/speech.js';
import './words.css';

const SAVED = { id: 'saved', name: 'All saved words', colour: '#14123A' };
const STATUS = { new: 'New', due: 'Due', learning: 'Learning', known: 'Known' };
const SORTS = [['due', 'Due first'], ['az', 'A to Z'], ['new', 'Newest']];
const RANK = { due: 0, new: 1, learning: 2, known: 3 };

export default function ListDetail() {
  const { params } = useRoute();
  const { route } = useLocation();
  const id = params.id;
  const [settings] = useSettings();
  const [list, setList] = useState(null);
  const [words, setWords] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [daily, setDaily] = useState(new Map());
  const [sort, setSort] = useState('due');
  const [sheet, setSheet] = useState(null); // 'options' | 'rename' | 'look' | 'delete'
  const [missing, setMissing] = useState(false);
  usePage(list?.name || 'List');

  async function load() {
    const [l, ws, rs] = await Promise.all([id === 'saved' ? SAVED : getList(id), wordsInList(id), loadReviews().catch(() => [])]);
    if (!l) { setMissing(true); return; }
    setList(l); setWords(ws); setReviews(rs);
  }
  useEffect(() => { load().catch(() => setMissing(true)); }, [id]);
  useEffect(() => { loadDaily().then((ws) => setDaily(new Map(ws.map((w) => [w.w, w])))).catch(() => {}); }, []);

  const byId = useMemo(() => new Map(reviews.map((r) => [r.id, r])), [reviews]);
  const rows = useMemo(() => {
    if (!words) return [];
    const out = words.map((w) => {
      const d = daily.get(w.id);
      return { id: w.id, savedAt: w.savedAt || 0, def: d ? shortDef(d.def) : '', audio: d?.audio, status: statusOf(byId.get(w.id)) };
    });
    if (sort === 'az') return out.sort((a, b) => a.id.localeCompare(b.id));
    if (sort === 'new') return out.sort((a, b) => b.savedAt - a.savedAt);
    return out.sort((a, b) => RANK[a.status] - RANK[b.status] || a.id.localeCompare(b.id));
  }, [words, daily, byId, sort]);

  if (missing) {
    return (
      <section class="mw-empty lx-card" aria-labelledby="ld-gone">
        <h1 id="ld-gone" class="lx-page-title">This list isn't here</h1>
        <p>It may have been deleted on this device. Your saved words are still in My Words.</p>
        <a class="lx-btn" href="/words">Open My Words</a>
      </section>
    );
  }
  if (!list || !words) return <div aria-busy="true"><h1 class="lx-sr">List</h1><span class="lx-skeleton mw-sk" /></div>;

  const stats = listStats(words.map((w) => w.id), reviews);
  const real = id !== 'saved';
  const q = `?list=${encodeURIComponent(id)}`;

  async function rename(name) {
    try { setList(await updateList(id, { name })); setSheet(null); toast({ text: 'List renamed', kind: 'success' }); }
    catch { toast({ text: "Couldn't rename the list", kind: 'error' }); }
  }
  async function relook({ colour, icon }) {
    try { setList(await updateList(id, { colour, icon })); setSheet(null); }
    catch { toast({ text: "Couldn't change the list", kind: 'error' }); }
  }
  async function remove() {
    try {
      const snap = await deleteList(id);
      setSheet(null);
      route('/words');
      toast({ text: `Deleted “${snap.list.name}”`, kind: 'success', action: 'Undo', onAction: () => restoreList(snap).then(() => route(`/words/list/${id}`)) });
    } catch { toast({ text: "Couldn't delete the list", kind: 'error' }); }
  }
  function exportCSV() {
    setSheet(null);
    const blob = new Blob([toCSV(rows.map((r) => ({ word: r.id, def: r.def, status: STATUS[r.status] })))], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${list.name.replace(/[^\w-]+/g, '-').toLowerCase() || 'list'}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast({ text: 'CSV downloaded', kind: 'success' });
  }
  async function take(word) {
    const before = words.find((w) => w.id === word);
    try {
      await (real ? removeFromList(word, id) : unsaveWord(word));
      setWords((ws) => ws.filter((w) => w.id !== word));
      toast({
        text: real ? `Removed “${word}” from this list` : `Removed “${word}” from My Words`, kind: 'success', action: 'Undo',
        onAction: async () => { await setWordLists(word, before.listIds || []); load(); }
      });
    } catch { toast({ text: "Couldn't remove it", kind: 'error' }); }
  }
  const hear = (r) => playAudioOr(settings.accent === 'UK' ? r.audio?.uk : r.audio?.us, r.id, { accent: settings.accent, rate: settings.speechRate });

  return (
    <>
      <div class="ld-top">
        <a class="ld-round" href="/words" aria-label="Back to My Words"><BackIcon /></a>
        {real && <button type="button" class="ld-round" aria-label="List options" aria-haspopup="dialog" onClick={() => setSheet('options')}><MoreIcon /></button>}
      </div>

      <div class="lx-split">
        <div class="lx-col lx-sticky">
          <header class="ld-head lx-rise">
            <ListPlanet list={list} size={88} />
            <h1 class="lx-page-title">{list.name}</h1>
            <p class="mw-sub">{stats.count} word{stats.count === 1 ? '' : 's'} · {stats.known}% known{stats.due ? ` · ${stats.due} due` : ''}</p>
            <span class="mw-bar ld-bar" aria-hidden="true"><span style={{ width: `${stats.known}%`, background: list.colour }} /></span>
          </header>
          {stats.count > 0 && (
            <div class="ld-actions lx-rise lx-d1">
              <a class="lx-btn" href={`/learn/flashcards${q}`}><CardsIcon />{stats.due ? `Review ${stats.due} due` : 'Review this list'}</a>
              <a class="lx-btn secondary" href={`/learn/quiz${q}`}><LearnIcon />Quiz me</a>
            </div>
          )}
        </div>

        <div class="lx-col">
          {stats.count === 0 ? (
            <section class="mw-empty lx-card lx-rise lx-d1" aria-labelledby="ld-empty">
              <div class="mw-empty-orbit small" aria-hidden="true"><span class="ring"><span class="moon" /></span><span class="core" /></div>
              <h2 id="ld-empty">No words in this list yet</h2>
              <p>Open any word and tap the bookmark, then pick this list.</p>
              <a class="lx-btn" href="/search"><SearchIcon />Find words</a>
            </section>
          ) : (
            <>
              <Segmented label="Sort" options={SORTS} value={sort} onChange={setSort} />
              <ul class="mw-rows ld-rows lx-rise lx-d2" aria-label={`Words in ${list.name}`}>
                {rows.map((r) => (
                  <li key={r.id} class="ld-row">
                    <a href={`/word/${r.id}`} class="ld-word">
                      <b>{r.id}</b>
                      {r.def && <span>{r.def}</span>}
                    </a>
                    <span class={`ld-status ${r.status}`}>{STATUS[r.status]}</span>
                    <button type="button" class="ld-icon" aria-label={`Listen to ${r.id}`} onClick={() => hear(r)}><SpeakerIcon size={20} /></button>
                    <button type="button" class="ld-icon" aria-label={`Remove ${r.id}${real ? ' from this list' : ' from My Words'}`} onClick={() => take(r.id)}><CloseIcon size={20} /></button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {real && (
        <>
          <ListOptionsSheet open={sheet === 'options'} list={list} onClose={() => setSheet(null)}
            onRename={() => setSheet('rename')} onLook={() => setSheet('look')} onExport={exportCSV} onDelete={() => setSheet('delete')} />
          <RenameSheet open={sheet === 'rename'} list={list} onClose={() => setSheet(null)} onSave={rename} />
          <ListFormSheet open={sheet === 'look'} list={list} title="Colour and icon" onClose={() => setSheet(null)} onSave={relook} />
          <DeleteSheet open={sheet === 'delete'} list={list} count={stats.count} onClose={() => setSheet(null)} onDelete={remove} />
        </>
      )}
    </>
  );
}
