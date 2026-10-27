import { useEffect, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { useRequest } from '../../app/useRequest.js';
import { useSettings } from '../../app/settings-context.jsx';
import {
  BackIcon, BookmarkIcon, ShareIcon, SpeakerIcon, SlowIcon, ReadAllIcon, CopyIcon, PenIcon, AlertIcon
} from '../../app/icons.jsx';
import { toast } from '../../components/toast.jsx';
import { LanguagePicker } from '../../components/LanguagePicker.jsx';
import { lookup } from '../../lib/dictionary.js';
import { loadDaily } from '../../lib/daily.js';
import { loadWordList, levelOf } from '../../lib/words.js';
import { didYouMean } from '../../lib/datamuse.js';
import { translate, loadPhrasebook } from '../../lib/translate.js';
import { byCode, hasVoice } from '../../lib/languages.js';
import { orbitChips, KIND_LABEL, familyLabel } from '../../lib/related.js';
import { getRecord, saveWord, unsaveWord, setNote } from '../../lib/saved.js';
import { addRecent } from '../../lib/recent.js';
import { speak, playAudioOr, canSpeak } from '../../lib/speech.js';
import { planetFont } from '../../lib/fit.js';
import './word.css';

const QUICK_LANGS = ['yo', 'ha', 'ig', 'fr'];

// The example sentence with the word itself highlighted.
function Example({ text, word }) {
  const re = new RegExp(`(\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\w*)`, 'i');
  const parts = text.split(re);
  return <span>“{parts.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))}”</span>;
}

function useEntry(word) {
  return useRequest(async (signal) => {
    const daily = await loadDaily().then((ws) => ws.find((w) => w.w === word) || null).catch(() => null);
    return lookup(word, { signal, daily });
  }, [word], { isOnline: () => true });
}

function Translation({ word, settings }) {
  const [lang, setLang] = useState(QUICK_LANGS.includes(settings.translateTo) ? settings.translateTo : 'yo');
  const [picker, setPicker] = useState(false);
  const [req] = useRequest(async (signal) => translate(word, 'en', lang, { signal, book: await loadPhrasebook().catch(() => null) }), [word, lang], { isOnline: () => true });
  const meta = byCode(lang);
  const tabs = QUICK_LANGS.includes(lang) ? QUICK_LANGS : [...QUICK_LANGS, lang];
  return (
    <section class="wd-lang lx-rise lx-d4" aria-labelledby="wd-lang-h">
      <h2 id="wd-lang-h">In your language</h2>
      <div role="group" aria-label="Choose language" class="wd-lang-tabs">
        {tabs.map((c) => <button key={c} type="button" aria-pressed={lang === c} onClick={() => setLang(c)}>{byCode(c).name}</button>)}
        <button type="button" aria-haspopup="dialog" onClick={() => setPicker(true)}>More</button>
      </div>
      <div class="wd-lang-result" aria-live="polite" aria-busy={req.state === 'loading'}>
        {req.state === 'loading' && <span class="wd-sk" />}
        {req.state === 'success' && (
          <>
            <p lang={lang} dir={meta.dir || 'ltr'}>{req.data.text}</p>
            {hasVoice(lang) && (
              <button type="button" class="wd-round" aria-label={`Listen in ${meta.name}`} onClick={() => speak(req.data.text, { lang: meta.speech || lang, rate: settings.speechRate })}>
                <SpeakerIcon />
              </button>
            )}
          </>
        )}
        {(req.state === 'error' || req.state === 'not-found') && (
          <p class="wd-lang-missing">{req.code === 'TR-429' ? "Today's free translations are used up. Try again tomorrow." : `No ${meta.name} translation yet.`}</p>
        )}
      </div>
      {req.state === 'success' && !req.data.reviewed && <p class="wd-lang-note">Sample translation · to be checked by a native speaker</p>}
      <LanguagePicker open={picker} value={lang} onClose={() => setPicker(false)} onPick={(c) => { setLang(c); setPicker(false); }} />
    </section>
  );
}

function NotFound({ word }) {
  const [sugs, setSugs] = useState([]);
  useEffect(() => {
    didYouMean(word).then((s) => setSugs(s ? [s] : [])).catch(() => {});
  }, [word]);
  return (
    <section class="wd-state lx-card" aria-labelledby="wd-nf">
      <span class="wd-state-orbit" aria-hidden="true">?</span>
      <h1 id="wd-nf">We couldn't find “{word}”</h1>
      <p>It may be misspelled, or it's not in the dictionary yet.</p>
      {sugs.length > 0 && (
        <>
          <h2>Did you mean</h2>
          <ul class="wd-sugs">{sugs.map((s) => <li key={s}><a class="lx-chip" href={`/word/${s}`}>{s}</a></li>)}</ul>
        </>
      )}
      <a class="lx-btn secondary small" href={`/search?mode=meaning&q=${encodeURIComponent(word)}`}>Describe the meaning instead</a>
    </section>
  );
}

export default function Word() {
  const { params } = useRoute();
  const word = decodeURIComponent(params.word || '').toLowerCase().trim();
  usePage(word);
  const [settings] = useSettings();
  const [req, retry] = useEntry(word);
  const [level, setLevel] = useState(null);
  const [saved, setSaved] = useState(false);
  const [note, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState('');
  const [playing, setPlaying] = useState(null);
  const [using, setUsing] = useState(null);
  const noteTimer = useRef(null);
  const e = req.data;

  useEffect(() => {
    addRecent(word);
    loadWordList().then((l) => setLevel(levelOf(word, l))).catch(() => {});
    getRecord(word).then((r) => { setSaved(Boolean(r?.saved)); setNoteText(r?.note || ''); }).catch(() => {});
  }, [word]);

  useEffect(() => { if (e && settings.readAloud && canSpeak()) speak(word, { accent: settings.accent, rate: settings.speechRate }); }, [e?.word]);

  async function play(kind) {
    setPlaying(kind);
    const opts = { accent: kind === 'UK' || kind === 'US' ? kind : settings.accent, rate: kind === 'slow' ? 0.6 : settings.speechRate };
    if (kind === 'all') {
      await speak(word, opts);
      for (const m of e.meanings) {
        await speak(`${m.pos}. ${m.def}`, opts);
        if (m.example) await speak(m.example, opts);
      }
    } else if (kind === 'slow') {
      await speak(word, opts);
    } else {
      const url = kind === 'UK' ? e.audio.uk : e.audio.us || e.audio.au;
      await playAudioOr(url, word, opts);
    }
    setPlaying(null);
  }

  async function toggleSave() {
    const next = !saved;
    setSaved(next);
    try {
      await (next ? saveWord(word) : unsaveWord(word));
      toast({ text: next ? `Saved “${word}” to My Words` : `Removed “${word}” from My Words`, kind: 'success', action: 'Undo', onAction: () => { setSaved(!next); (next ? unsaveWord(word) : saveWord(word)); } });
    } catch { setSaved(!next); toast({ text: "Couldn't save on this device", kind: 'error' }); }
  }

  function onNote(text) {
    setNoteText(text);
    setNoteSaved('');
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setNote(word, text).then(() => setNoteSaved('Note saved')).catch(() => setNoteSaved("Couldn't save the note")), 600);
  }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast({ text: 'Copied', kind: 'success' }); } catch { toast({ text: "Couldn't copy", kind: 'error' }); }
  }

  const back = (ev) => { if (history.length > 1) { ev.preventDefault(); history.back(); } };
  const top = (
    <div class="wd-top">
      <a class="wd-round light" href="/search" aria-label="Back" onClick={back}><BackIcon /></a>
      {e && (
        <div class="wd-top-actions">
          <button type="button" class={`wd-round ${saved ? 'on' : 'light'}`} aria-pressed={saved} aria-label={saved ? 'Saved to My Words' : 'Save to My Words'} onClick={toggleSave}>
            <BookmarkIcon filled={saved} />
          </button>
          <a class="wd-round light" href={`/share/${word}`} aria-label="Share as an image card"><ShareIcon /></a>
        </div>
      )}
    </div>
  );

  if (req.state === 'not-found') return <>{top}<NotFound word={word} /></>;
  if (req.state === 'error' || req.state === 'offline') {
    const off = typeof navigator !== 'undefined' && navigator.onLine === false;
    return (
      <>
        {top}
        <section class="wd-state lx-card" role="alert">
          <span class="wd-state-orbit lost" aria-hidden="true"><AlertIcon /></span>
          <h1>{off ? "You're offline" : 'This word got lost in space'}</h1>
          <p>{off ? `“${word}” isn't saved on this device yet. It will open when you're back online.` : "We couldn't load it right now. It's not you. Your saved words still work."}</p>
          <div class="wd-state-row">
            <button type="button" class="lx-btn small" onClick={retry}>Try again</button>
            <a class="lx-btn secondary small" href="/words">Open my saved words</a>
          </div>
          <p class="wd-code">Error code {req.code || 'DICT-503'} · share this if you contact us</p>
        </section>
      </>
    );
  }
  if (!e) {
    return (
      <>
        {top}
        <div class="wd-skeleton" aria-busy="true" aria-label={`Loading ${word}`}>
          <h1 class="lx-sr">{word}</h1>
          <span class="lx-skeleton wd-sk-planet" />
          <span class="lx-skeleton" style={{ width: '50%', height: '1.25rem' }} />
          <div class="wd-sk-row">{[0, 1, 2, 3].map((i) => <span key={i} class="lx-skeleton" />)}</div>
          <span class="lx-skeleton" style={{ width: '100%', height: '9rem', borderRadius: '1.5rem' }} />
        </div>
      </>
    );
  }

  const chips = orbitChips({ syn: e.synonyms, ant: e.antonyms, fam: e.family }, 4);
  const noRecording = !e.audio.us && !e.audio.uk && !e.audio.au;

  return (
    <>
      {top}
      <section class="wd-orbit" aria-label={`${word} and nearby words`}>
        <span class="wd-ring" aria-hidden="true" />
        <div class="wd-planet">
          {level && <span class="wd-level">{level.cefr} · {level.label}</span>}
          <h1 style={{ fontSize: planetFont(word, 108) }}>{word}</h1>
        </div>
        {chips.length > 0 && (
          <ul class="wd-moons">
            {chips.map((c, i) => (
              <li key={c.word} class={`p${i}`}>
                <a class={`wd-moon lx-chip ${c.kind}`} href={`/word/${c.word}`} aria-label={`${c.word}, ${KIND_LABEL[c.kind]}`}>{c.mark} {c.word}</a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div class="wd-say lx-rise lx-d1">
        {e.ipa && <p class="wd-ipa">{e.ipa}</p>}
        {e.syllables && <p class="wd-syl" aria-label={`Syllables: ${e.syllables.join(', ')}`}>{e.syllables.join(' · ')}</p>}
      </div>

      <div class="wd-play lx-rise lx-d2" role="group" aria-label="Pronunciation">
        {[['US', 'US', SpeakerIcon], ['UK', 'UK', SpeakerIcon], ['slow', 'Slow', SlowIcon], ['all', 'Read all', ReadAllIcon]].map(([k, label, I]) => (
          <button key={k} type="button" class={playing === k ? 'on' : ''} aria-label={playing === k ? `Playing ${label}` : undefined} onClick={() => play(k)} disabled={!canSpeak() && (k === 'slow' || k === 'all')}>
            {playing === k ? <span class="wd-bars" aria-hidden="true"><span /><span /><span /></span> : <I size={22} />}
            {label}
          </button>
        ))}
      </div>
      {noRecording && <p class="wd-device-voice">No recording yet, so your device's voice reads it.</p>}
      {e.stale && <p class="wd-device-voice">Showing the copy saved on this device.</p>}

      <section class="wd-meanings lx-rise lx-d3" aria-labelledby="wd-m">
        <h2 id="wd-m">Meanings</h2>
        {e.meanings.map((m, i) => (
          <article key={i} class="wd-meaning" aria-label={`Meaning ${i + 1}, ${m.pos}${i === 0 ? ', most common' : ''}`}>
            <div class="wd-meaning-head">
              <span class={`wd-num n${i % 4}`} aria-hidden="true">{i + 1}</span>
              <span class="wd-pos">{m.pos}</span>
              {i === 0 && <span class="wd-common">Most common</span>}
            </div>
            <p class="wd-def">{m.def}</p>
            {m.example && (
              <div class="wd-example">
                {m.register && <span class="wd-register">{m.register}</span>}
                <Example text={m.example} word={word} />
              </div>
            )}
            {using === i && (
              <div class="wd-use">
                <label for={`use-${i}`}>Write your own sentence with “{word}”</label>
                <textarea id={`use-${i}`} rows="2" onBlur={(ev) => { const t = ev.currentTarget.value.trim(); if (t) { onNote(note ? `${note}\n${t}` : t); setUsing(null); } }} />
                <span class="wd-hint">It's added to your note when you leave the box.</span>
              </div>
            )}
            <div class="wd-meaning-actions">
              <button type="button" class="wd-round soft" aria-label={`Listen to meaning ${i + 1}`} onClick={() => speak(m.def, { accent: settings.accent, rate: settings.speechRate })}><SpeakerIcon size={20} /></button>
              <button type="button" class="wd-round soft" aria-label={`Copy meaning ${i + 1}`} onClick={() => copy(m.def)}><CopyIcon size={20} /></button>
              <button type="button" class="wd-use-btn" aria-expanded={using === i} onClick={() => setUsing(using === i ? null : i)}><PenIcon size={18} />Use it</button>
            </div>
          </article>
        ))}
      </section>

      <Translation word={word} settings={settings} />

      {e.origin && (
        <section class="wd-journey" aria-labelledby="wd-j">
          <h2 id="wd-j">The word's journey</h2>
          <div class="wd-journey-line">
            <p>{e.origin}</p>
            {e.source && <a href={e.source} target="_blank" rel="noopener">From Wiktionary (CC BY-SA)</a>}
          </div>
        </section>
      )}

      {e.family.length > 0 && (
        <section class="wd-family" aria-labelledby="wd-f">
          <h2 id="wd-f">Word family</h2>
          <ul class="lx-card">
            {e.family.map((f) => <li key={f}><span>{familyLabel(f)}</span><a href={`/word/${f}`}>{f}</a></li>)}
          </ul>
        </section>
      )}

      <section class="wd-note">
        <label for="wd-note">My note</label>
        <textarea id="wd-note" rows="3" value={note} placeholder="A memory trick, a sentence, anything that helps" onInput={(ev) => onNote(ev.currentTarget.value)} />
        <span class="wd-note-status" role="status">{noteSaved}</span>
      </section>
    </>
  );
}
