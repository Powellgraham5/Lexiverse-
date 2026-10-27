import { useEffect, useMemo, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { PlusIcon, SearchIcon, CheckIcon } from '../../app/icons.jsx';
import { toast } from '../../components/toast.jsx';
import { ListPlanet } from '../../components/lists/ListPlanet.jsx';
import { ListFormSheet } from '../../components/lists/ListSheets.jsx';
import { allLists, createList, listStats } from '../../lib/lists.js';
import { savedWords } from '../../lib/saved.js';
import { loadReviews } from '../../lib/srs.js';
import { recentLookups, ago } from '../../lib/history.js';
import { loadDaily } from '../../lib/daily.js';
import './words.css';

const SAVED = { id: 'saved', name: 'All saved words', colour: '#14123A' };
const DOTS = ['#4A2FE0', '#1F9D63', '#FF8A65', '#E5B000', '#2F80ED'];

function Badge({ stats }) {
  if (stats.due > 0) return <span class="mw-badge due">{stats.due} due</span>;
  if (stats.count && stats.fresh === stats.count) return <span class="mw-badge new">New</span>;
  if (stats.count) return <span class="mw-badge done"><CheckIcon size={14} />Done</span>;
  return null;
}

export default function Words() {
  usePage('My Words');
  const { route } = useLocation();
  const [data, setData] = useState(null);
  const [q, setQ] = useState('');
  const [creating, setCreating] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [defs, setDefs] = useState(new Map());

  async function load() {
    const [lists, saved, reviews, recent] = await Promise.all([allLists(), savedWords(), loadReviews(), recentLookups(20)]);
    setData({ lists, saved, reviews, recent });
  }
  useEffect(() => { load().catch(() => setData({ lists: [], saved: [], reviews: [], recent: [] })); }, []);
  useEffect(() => { loadDaily().then((ws) => setDefs(new Map(ws.map((w) => [w.w, w.def])))).catch(() => {}); }, []);

  const cards = useMemo(() => {
    if (!data) return [];
    const ids = (l) => data.saved.filter((w) => l.id === 'saved' || (w.listIds || []).includes(l.id)).map((w) => w.id);
    return [SAVED, ...data.lists].map((l) => ({ list: l, stats: listStats(ids(l), data.reviews) }));
  }, [data]);
  const matches = q.trim() && data ? data.saved.filter((w) => w.id.includes(q.trim().toLowerCase())) : null;

  async function create(form) {
    try {
      const l = await createList(form);
      setCreating(false);
      toast({ text: `Created “${l.name}”`, kind: 'success' });
      route(`/words/list/${l.id}`);
    } catch { toast({ text: "Couldn't create the list", kind: 'error' }); }
  }

  if (!data) return <><h1 class="lx-page-title">My Words</h1><div class="mw-grid" aria-busy="true">{[0, 1, 2, 3].map((i) => <span key={i} class="lx-skeleton mw-sk" />)}</div></>;
  const total = data.saved.length;
  const recent = showAll ? data.recent : data.recent.slice(0, 5);

  return (
    <>
      <div class="mw-head lx-rise">
        <div><h1 class="lx-page-title">My Words</h1><p class="mw-sub">{total} word{total === 1 ? '' : 's'} in your galaxy</p></div>
        <button type="button" class="mw-add" aria-label="New list" onClick={() => setCreating(true)}><PlusIcon /></button>
      </div>

      {total === 0 && data.lists.length === 0 ? (
        <section class="mw-empty lx-card lx-rise lx-d1" aria-labelledby="mw-empty-h">
          <div class="mw-empty-orbit" aria-hidden="true"><span class="ring"><span class="moon" /></span><span class="core" /></div>
          <h2 id="mw-empty-h">Your galaxy is empty</h2>
          <p>Tap the bookmark on any word to save it here. Saved words come back for review so you remember them.</p>
          <a class="lx-btn" href="/">Save today's word</a>
          <button type="button" class="lx-btn ghost" onClick={() => setCreating(true)}>Create a list first</button>
        </section>
      ) : (
        <>
          <div class="mw-search lx-rise lx-d1">
            <SearchIcon />
            <label for="mw-q" class="lx-sr">Search your saved words</label>
            <input id="mw-q" type="search" value={q} placeholder="Search your saved words" autocomplete="off" onInput={(e) => setQ(e.currentTarget.value)} />
          </div>

          {matches ? (
            <section aria-label="Matching saved words">
              <p class="lx-sr" aria-live="polite">{matches.length} match{matches.length === 1 ? '' : 'es'}</p>
              {matches.length ? (
                <ul class="mw-rows">{matches.map((w, i) => (
                  <li key={w.id}><a class="mw-row" href={`/word/${w.id}`}><span class="mw-dot" style={{ background: DOTS[i % DOTS.length] }} aria-hidden="true">{w.id[0]}</span><span><b>{w.id}</b>{defs.get(w.id) && <span>{defs.get(w.id)}</span>}</span></a></li>
                ))}</ul>
              ) : <p class="mw-none">No saved word matches “{q}”. <a href={`/search?q=${encodeURIComponent(q)}`}>Search the dictionary</a></p>}
            </section>
          ) : (
            <>
              <ul class="mw-grid lx-rise lx-d2">
                {cards.map(({ list, stats }) => (
                  <li key={list.id}>
                    <a class="mw-card" href={`/words/list/${list.id}`}>
                      <span class="mw-card-top"><ListPlanet list={list} size={52} /><Badge stats={stats} /></span>
                      <b>{list.name}</b>
                      <span class="mw-meta">{stats.count} word{stats.count === 1 ? '' : 's'} · {stats.known}% known</span>
                      <span class="mw-bar" aria-hidden="true"><span style={{ width: `${stats.known}%`, background: list.colour }} /></span>
                    </a>
                  </li>
                ))}
                <li>
                  <button type="button" class="mw-card new" onClick={() => setCreating(true)}><PlusIcon size={28} /><b>New list</b><span class="mw-meta">Group words your way</span></button>
                </li>
              </ul>

              {data.recent.length > 0 && (
                <section class="mw-recent lx-rise lx-d3" aria-labelledby="mw-rec">
                  <div class="mw-recent-head"><h2 id="mw-rec">Recently looked up</h2>{data.recent.length > 5 && <button type="button" class="lx-btn ghost small" aria-expanded={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'See all'}</button>}</div>
                  <ol class="mw-timeline lx-card">
                    {recent.map((h, i) => (
                      <li key={h.id}>
                        <a href={`/word/${h.id}`}><span class="mw-dot" style={{ background: DOTS[i % DOTS.length] }} aria-hidden="true">{h.id[0]}</span>
                          <span class="mw-tl-text"><b>{h.id}</b>{defs.get(h.id) && <span>{defs.get(h.id)}</span>}</span>
                          <span class="mw-when">{ago(h.at)}</span></a>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </>
          )}
        </>
      )}
      <ListFormSheet open={creating} onClose={() => setCreating(false)} onSave={create} />
    </>
  );
}
