import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { useRequest } from '../../app/useRequest.js';
import { useSettings } from '../../app/settings-context.jsx';
import { SearchIcon, MicIcon, CloseIcon, TranslateIcon, SpeakerIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { startsWith, didYouMean, byMeaning, byPattern, rhymes } from '../../lib/datamuse.js';
import { loadWordList, lettersSearch } from '../../lib/words.js';
import { loadDaily, wordOfTheDay } from '../../lib/daily.js';
import { loadProfile } from '../../lib/profile.js';
import { loadRecent, addRecent, clearRecent } from '../../lib/recent.js';
import { canListen, listenOnce, speak } from '../../lib/speech.js';
import './search.css';

const MODES = [
  ['word', 'Word', 'Search words'],
  ['meaning', 'Meaning', 'Describe a meaning'],
  ['pattern', 'Pattern', 'Word pattern, like c?t'],
  ['rhymes', 'Rhymes', 'Find rhymes for'],
  ['letters', 'Letters', 'Your letters']
];
const DOTS = ['var(--lx-primary)', 'var(--lx-family-bg)', 'var(--lx-note-bg)', 'var(--lx-opposite-bg)', 'var(--lx-info-bg)'];
const HINTS = {
  pattern: '? is one letter, * is any letters. Try c?t or *ful.',
  letters: 'Type up to 10 letters. Use ? for a blank tile.',
  meaning: 'Describe it in your own words, like “person who loves books”.'
};

// Words from today's set that start with the query: always available offline.
const offlineMatches = (words, text) => (words || []).filter((w) => w.w.startsWith(text.trim().toLowerCase())).slice(0, 6).map((w) => ({ word: w.w, def: w.def }));

async function runSearch(mode, text, signal) {
  if (mode === 'word') {
    let rows = await startsWith(text, signal);
    const exact = rows.some((r) => r.word === text.trim().toLowerCase());
    const suggestion = exact ? null : await didYouMean(text, signal);
    if (!rows.length && suggestion) rows = await startsWith(suggestion, signal);
    return { rows, suggestion };
  }
  if (mode === 'meaning') return { rows: await byMeaning(text, signal) };
  if (mode === 'pattern') return { rows: await byPattern(text, signal) };
  if (mode === 'rhymes') return { rhymes: await rhymes(text, signal) };
  const list = await loadWordList();
  return { letters: lettersSearch(text.slice(0, 10), list.list) };
}

const isEmpty = (d) => !d || (d.rows ? !d.rows.length && !d.suggestion : d.rhymes ? !d.rhymes.groups.length : !d.letters.length);

function Rows({ rows, best, onPick }) {
  return (
    <ul class="sr-rows">
      {rows.map((r, i) => (
        <li key={r.word} class={`lx-rise lx-d${Math.min(i + 1, 4)}`}>
          <a class="sr-row" href={`/word/${r.word}`} onClick={() => onPick(r.word)}>
            <span class="sr-dot" style={{ background: DOTS[i % DOTS.length] }} aria-hidden="true" />
            <span class="sr-text"><b>{r.word}</b>{r.def && <span>{r.def}</span>}</span>
            {best && i === 0 && <span class="sr-best">Best</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Search() {
  usePage('Search');
  const { route, query } = useLocation();
  const [settings] = useSettings();
  const [mode, setMode] = useState(query.mode && MODES.some((m) => m[0] === query.mode) ? query.mode : 'word');
  const [text, setText] = useState(query.q || '');
  const [debounced, setDebounced] = useState(text);
  const [recent, setRecent] = useState(loadRecent);
  const [listening, setListening] = useState(false);
  const [daily, setDaily] = useState(null);
  const input = useRef(null);

  useEffect(() => {
    loadDaily().then(setDaily).catch(() => {});
    // Warm the word list so Letters works even if the connection drops later.
    const t = setTimeout(() => loadWordList().catch(() => {}), 1500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { const t = setTimeout(() => setDebounced(text), 250); return () => clearTimeout(t); }, [text]);

  const q = debounced.trim();
  const active = mode === 'letters' ? q.replace(/[^a-z?]/gi, '').length >= 2 : q.length >= 2;
  const [req, retry] = useRequest(active ? (signal) => runSearch(mode, q, signal) : null, [mode, q, active],
    // Letters runs on the device, so it works offline.
    { isEmpty, isOnline: mode === 'letters' ? () => true : undefined });

  const pick = (w) => setRecent(addRecent(w));
  const todayWord = daily && wordOfTheDay(daily, { level: loadProfile()?.level || 2, goal: loadProfile()?.goal || 'e' });
  const label = MODES.find((m) => m[0] === mode)[2];
  const data = req.data;
  const count = data?.rows?.length ?? data?.rhymes?.groups.reduce((n, g) => n + g.words.length, 0) ?? data?.letters?.reduce((n, g) => n + g.words.length, 0) ?? 0;
  const offline = useMemo(() => offlineMatches(daily, q), [daily, q]);

  function submit(e) {
    e.preventDefault();
    const w = text.trim().toLowerCase();
    if (mode === 'word' && /^[a-z-]+$/.test(w)) { pick(w); route(`/word/${w}`); }
  }

  async function voice() {
    setListening(true);
    const { result } = listenOnce({ lang: settings.accent === 'UK' ? 'en-GB' : 'en-US', onInterim: setText });
    const heard = await result;
    setListening(false);
    if (heard) setText(mode === 'word' ? heard.split(' ')[0].toLowerCase() : heard);
    input.current?.focus();
  }

  return (
    <>
      <h1 class="lx-rise lx-page-title sr-title">Search</h1>
      <form role="search" class="sr-box lx-rise lx-d1" onSubmit={submit}>
        <SearchIcon />
        <label for="q" class="lx-sr">{label}</label>
        <input id="q" ref={input} type="search" value={text} placeholder={label} autocomplete="off" autocapitalize="off" spellcheck={false}
          enterkeyhint="search" onInput={(e) => setText(e.currentTarget.value)} />
        {text && <button type="button" class="sr-clear" aria-label="Clear search" onClick={() => { setText(''); input.current?.focus(); }}><CloseIcon size={18} /></button>}
        {canListen() && (
          <button type="button" class={`sr-mic ${listening ? 'on' : ''}`} aria-label={listening ? 'Listening' : 'Search by voice'} aria-pressed={listening} onClick={voice}>
            <MicIcon />
          </button>
        )}
      </form>

      <div role="group" aria-label="Search type" class="sr-modes lx-rise lx-d2">
        {MODES.map(([key, name]) => (
          <button key={key} type="button" aria-pressed={mode === key} onClick={() => { setMode(key); input.current?.focus(); }}>{name}</button>
        ))}
      </div>
      {HINTS[mode] && <p class="sr-hint">{HINTS[mode]}</p>}

      {mode === 'pattern' && q && (
        <div class="sr-slots" aria-hidden="true">
          {q.replace(/[^a-z?*]/gi, '').split('').map((c, i) => <span key={i} class={c === '?' || c === '*' ? 'blank' : ''}>{c === '*' ? '…' : c === '?' ? '' : c}</span>)}
        </div>
      )}

      <p class="lx-sr" aria-live="polite">
        {req.state === 'success' ? `${count} result${count === 1 ? '' : 's'}` : req.state === 'empty' ? 'No results' : ''}
      </p>

      {!active && (
        <div class="sr-idle">
          {recent.length > 0 && mode === 'word' && (
            <section class="sr-section" aria-labelledby="recent">
              <div class="sr-section-head"><h2 id="recent">Recent</h2><button type="button" class="lx-btn ghost small" onClick={() => setRecent(clearRecent())}>Clear</button></div>
              <ul class="sr-recent">
                {recent.map((w) => <li key={w}><a class="lx-chip" href={`/word/${w}`}>{w}</a></li>)}
              </ul>
            </section>
          )}
          <section class="sr-section" aria-labelledby="explore">
            <h2 id="explore">Explore</h2>
            {todayWord && (
              <a class="sr-row" href={`/word/${todayWord.w}`}>
                <span class="sr-dot" style={{ background: DOTS[0] }} aria-hidden="true" />
                <span class="sr-text"><span class="sr-kicker">Word of the day</span><b>{todayWord.w}</b></span>
              </a>
            )}
          </section>
        </div>
      )}

      {active && req.state === 'loading' && (
        <ul class="sr-rows" aria-busy="true" aria-label="Searching">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} class="sr-row sk"><span class="lx-skeleton sr-dot" /><span class="sr-text"><span class="lx-skeleton" style={{ width: '40%', height: '1rem' }} /><span class="lx-skeleton" style={{ width: '75%', height: '.8rem' }} /></span></li>
          ))}
        </ul>
      )}

      {active && req.state === 'offline' && (
        <section class="sr-state lx-card">
          <h2>You're offline</h2>
          <p>Searching the dictionary needs a connection. Letters search still works offline.</p>
          <button type="button" class="lx-btn secondary small" onClick={() => setMode('letters')}>Use Letters</button>
          {offline.length > 0 && <><h3>From today's words</h3><Rows rows={offline} onPick={pick} /></>}
        </section>
      )}

      {active && req.state === 'error' && (
        <>
          <ErrorCard title="Search isn't responding" code={req.code || 'DICT-503'} onRetry={retry}>
            {offline.length ? 'Showing matches from today\'s words.' : 'Try again in a moment.'}
          </ErrorCard>
          {offline.length > 0 && <Rows rows={offline} onPick={pick} />}
        </>
      )}

      {active && req.state === 'empty' && (
        <section class="sr-state lx-card">
          <span class="sr-empty-orbit" aria-hidden="true">?</span>
          <h2>“{q}” isn't in our universe yet</h2>
          <p>{mode === 'word' ? 'Check the spelling, or try Meaning and describe what you are looking for.' : 'Try fewer letters or a different search type.'}</p>
          {mode === 'word' && <button type="button" class="lx-btn secondary small" onClick={() => setMode('meaning')}>Search by meaning</button>}
        </section>
      )}

      {active && req.state === 'success' && data && (
        <>
          {data.suggestion && (
            <p class="sr-suggest">No exact match. Did you mean <a href={`/word/${data.suggestion}`} onClick={() => pick(data.suggestion)}>{data.suggestion}</a>?</p>
          )}
          {mode === 'pattern' && <p class="sr-count">{count} found</p>}
          {data.rows && <Rows rows={data.rows} best={mode === 'meaning'} onPick={pick} />}
          {mode === 'meaning' && <p class="sr-hint">Not it? Try different words, like “person who collects books”.</p>}
          {data.rhymes && (
            <>
              {data.rhymes.groups.map((g) => (
                <section key={g.syllables} class="sr-section" aria-label={`${g.syllables} syllable rhymes`}>
                  <h2>{g.syllables} syllable{g.syllables === 1 ? '' : 's'}</h2>
                  <ul class="sr-recent">{g.words.map((w) => <li key={w}><a class="lx-chip" href={`/word/${w}`} onClick={() => pick(w)}>{w}</a></li>)}</ul>
                </section>
              ))}
              {data.rhymes.near.length > 0 && (
                <section class="sr-section" aria-labelledby="near">
                  <h2 id="near">Near rhymes</h2>
                  <ul class="sr-recent">{data.rhymes.near.map((w) => <li key={w}><a class="lx-chip opposite" href={`/word/${w}`}>{w}</a></li>)}</ul>
                </section>
              )}
              <button type="button" class="lx-btn secondary small sr-hear" onClick={() => speak(data.rhymes.groups.flatMap((g) => g.words).join(', '), { accent: settings.accent, rate: settings.speechRate })}>
                <SpeakerIcon size={20} />Hear them all
              </button>
            </>
          )}
          {data.letters && data.letters.map((g) => (
            <section key={g.length} class="sr-section" aria-label={g.all ? `Uses all ${g.length} letters` : `${g.length} letters`}>
              <h2>{g.all ? `Uses all ${g.length} letters` : `${g.length} letters`}</h2>
              <ul class="sr-recent">{g.words.map((w) => <li key={w}><a class={`lx-chip ${g.all ? 'family' : ''}`} href={`/word/${w}`} onClick={() => pick(w)}>{w}</a></li>)}</ul>
            </section>
          ))}
        </>
      )}

      <a class="sr-translator lx-rise lx-d4" href="/translate">
        <span class="sr-translator-icon" aria-hidden="true"><TranslateIcon /></span>
        <span><b>Translator</b><span>Yoruba, Hausa, Igbo, French and more</span></span>
      </a>
    </>
  );
}
