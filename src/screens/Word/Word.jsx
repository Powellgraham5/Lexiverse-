import { useEffect, useRef, useState } from 'preact/hooks';
import { canGoBack } from '../../app/Shell.jsx';
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
import { PAGE_LANGS, MAX_TRANSLATED, posLabel, uiLabel, textsToTranslate } from '../../lib/wordI18n.js';
import { LOCAL_VOICES, COMING_VOICES, hasLocalVoice, localVoiceReady, loadLocalVoice, speakLocal, stopLocal } from '../../lib/localVoice.js';
import { orbitChips, KIND_LABEL, familyLabel } from '../../lib/related.js';
import { getRecord, setWordLists, unsaveWord, setNote, savedWords } from '../../lib/saved.js';
import { allLists, createList } from '../../lib/lists.js';
import { recordLookup } from '../../lib/history.js';
import { SaveSheet, ListFormSheet } from '../../components/lists/ListSheets.jsx';
import { addRecent } from '../../lib/recent.js';
import { speak, playAudioOr, canSpeak, stopSpeaking } from '../../lib/speech.js';
import { planetFont } from '../../lib/fit.js';
import './word.css';

// The router has usually decoded the word already; decoding again must not crash on a literal %.
const safeDecode = (s) => { try { return decodeURIComponent(s); } catch { return s; } };

// Languages the whole page can be read in; "More" opens every other language.
const PAGE_TABS = PAGE_LANGS;
const TAB_NAME = { en: 'English', yo: 'Yorùbá', ha: 'Hausa', ig: 'Igbo', pcm: 'Pidgin' };
const LANG_KEY = 'lx-word-lang';
const readLang = () => { try { return localStorage.getItem(LANG_KEY) || 'en'; } catch { return 'en'; } };

// How this language can be heard: an on-device voice, the phone's own voice, or not yet.
function voiceKind(lang) {
  if (lang === 'en') return 'device';
  if (hasLocalVoice(lang)) return 'local';
  if (hasVoice(lang)) return 'device';
  return COMING_VOICES.includes(lang) ? 'coming' : 'none';
}

// Translates the word, then the first meanings and examples (each cached, so a second visit is free).
function usePageTranslation(word, e, lang) {
  return useRequest(lang === 'en' || !e ? null : async (signal) => {
    const book = await loadPhrasebook().catch(() => null);
    let head = null;
    try { head = await translate(word, 'en', lang, { signal, book }); } catch (err) { if (err?.name === 'AbortError' || err?.code === 'TR-429') throw err; }
    const map = {};
    let quota = false;
    if (!byCode(lang)?.phrasebookOnly) {
      const texts = textsToTranslate(e.meanings);
      const results = await Promise.allSettled(texts.map((t) => translate(t, 'en', lang, { signal, book })));
      if (signal.aborted) throw signal.reason;
      results.forEach((r, i) => {
        if (r.status === 'fulfilled' && r.value?.text) map[texts[i]] = r.value.text;
        else if (r.reason?.code === 'TR-429') quota = true;
      });
    }
    return { head, map, quota };
  }, [word, lang, e?.word], { isOnline: () => true, timeout: 25000 });
}

function VoiceSetup({ lang, onReady }) {
  const meta = byCode(lang);
  const kind = voiceKind(lang);
  const [ready, setReady] = useState(() => localVoiceReady(lang));
  const [progress, setProgress] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setReady(localVoiceReady(lang)); setProgress(null); setFailed(false); }, [lang]);
  if (kind === 'coming') return <p class="wd-lang-missing">A {meta.name} voice is coming soon. For now {meta.name} is text only.</p>;
  if (kind === 'none') return <p class="wd-lang-missing">There is no free {meta.name} voice yet, so {meta.name} is text only.</p>;
  if (kind !== 'local' || ready) return null;
  const v = LOCAL_VOICES[lang];
  async function download() {
    setFailed(false); setProgress(0);
    try {
      await loadLocalVoice(lang, setProgress);
      setReady(true); setProgress(null); onReady?.();
      toast({ text: `${v.name} voice ready. It works offline now.`, kind: 'success' });
    } catch { setProgress(null); setFailed(true); }
  }
  return (
    <div class="wd-voice">
      <p><b>Hear {TAB_NAME[lang] || meta.name} on this phone.</b> Download the {v.name} voice once ({v.size}). It then works offline.</p>
      {progress === null
        ? <button type="button" class="lx-btn small" onClick={download}>Download {v.name} voice ({v.size})</button>
        : (
          <div class="wd-voice-prog">
            <span class="lx-bar" role="progressbar" aria-label={`Downloading the ${v.name} voice`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress * 100)}><span style={{ width: `${Math.round(progress * 100)}%` }} /></span>
            <span aria-hidden="true">{Math.round(progress * 100)}%</span>
          </div>
        )}
      {failed && <p class="wd-lang-missing" role="alert">The voice didn't download. Check your connection and try again.</p>}
    </div>
  );
}

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

function LangPanel({ lang, setLang, tr, playing, play, voiceReady, onReady }) {
  const [picker, setPicker] = useState(false);
  const meta = byCode(lang);
  const tabs = PAGE_TABS.includes(lang) ? PAGE_TABS : [...PAGE_TABS, lang];
  const head = tr.state === 'success' ? tr.data?.head : null;
  const kind = voiceKind(lang);
  // Pidgin has no free translator, but its voice reads the English words well.
  const readsEnglish = lang === 'pcm' && tr.state === 'success';
  const canHear = (head || readsEnglish) && (kind === 'device' || (kind === 'local' && voiceReady));
  return (
    <section class="wd-lang lx-rise lx-d1" aria-labelledby="wd-lang-h">
      <h2 id="wd-lang-h">Read this word in</h2>
      <div role="group" aria-label="Page language" class="wd-lang-tabs">
        {tabs.map((c) => <button key={c} type="button" lang={c === 'en' ? 'en' : c} aria-pressed={lang === c} onClick={() => setLang(c)}>{TAB_NAME[c] || byCode(c).name}</button>)}
        <button type="button" aria-haspopup="dialog" onClick={() => setPicker(true)}>More</button>
      </div>
      {lang !== 'en' && (
        <>
          <div class="wd-lang-result" aria-live="polite" aria-busy={tr.state === 'loading'}>
            {tr.state === 'loading' && <span class="wd-sk" />}
            {head && <p lang={lang} dir={meta.dir || 'ltr'}>{head.text}</p>}
            {tr.state === 'success' && !head && (
              <p class="wd-lang-missing">{meta.phrasebookOnly ? `${meta.name} has no free translator yet, so the words stay in English. You can still hear them in a ${meta.name} voice, and the translator's phrasebook has everyday ${meta.name} phrases.` : `No ${meta.name} translation yet.`}</p>
            )}
            {(tr.state === 'error' || tr.state === 'not-found') && (
              <p class="wd-lang-missing">{tr.code === 'TR-429' ? "Today's free translations are used up, so this page stays in English. Try again tomorrow." : `${meta.name} couldn't load right now, so this page stays in English.`}</p>
            )}
          </div>
          {canHear && (
            <div class="wd-lang-play" role="group" aria-label={`Hear it in ${meta.name}`}>
              {[['tr-word', 'Hear it', SpeakerIcon], ['tr-slow', 'Slow', SlowIcon], ['tr-all', 'Read all', ReadAllIcon]].map(([k, label, I]) => (
                <button key={k} type="button" class={playing === k ? 'on' : ''} aria-pressed={playing === k} onClick={() => play(k)}>
                  {playing === k ? <span class="wd-bars" aria-hidden="true"><span /><span /><span /></span> : <I size={20} />}
                  {playing === k ? 'Stop' : label}
                </button>
              ))}
            </div>
          )}
          {(head || readsEnglish) && <VoiceSetup lang={lang} onReady={onReady} />}
          {tr.state === 'success' && tr.data?.quota && <p class="wd-lang-missing">Today's free translations ran out part way, so some meanings stay in English.</p>}
          {head && !head.reviewed && <p class="wd-lang-note">Machine translation · to be checked by a native speaker</p>}
        </>
      )}
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
  const word = safeDecode(params.word || '').toLowerCase().trim();
  usePage(word);
  const [settings] = useSettings();
  const [req, retry] = useEntry(word);
  const [level, setLevel] = useState(null);
  const [saved, setSaved] = useState(false);
  const [listIds, setListIds] = useState([]);
  const [sheet, setSheet] = useState(null); // 'save' | 'new'
  const [lists, setLists] = useState({ all: [], counts: {} });
  const [pick, setPick] = useState([]);
  const [note, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState('');
  const [playing, setPlaying] = useState(null);
  const run = useRef(0);
  const stopAll = () => { stopSpeaking(); stopLocal(); };
  useEffect(() => () => { run.current++; stopAll(); }, [word]);
  const [using, setUsing] = useState(null);
  const noteTimer = useRef(null);
  const e = req.data;
  const [lang, setLangState] = useState(readLang);
  const [, bump] = useState(0);
  const setLang = (c) => { setLangState(c); try { localStorage.setItem(LANG_KEY, c); } catch { /* private mode */ } };
  const [tr] = usePageTranslation(word, e, lang);
  const trData = lang !== 'en' && tr.state === 'success' ? tr.data : null;
  const inLang = (text) => trData?.map[text] || null;
  const voiceReady = voiceKind(lang) !== 'local' || localVoiceReady(lang);
  const canHearLang = lang !== 'en' && (voiceKind(lang) === 'device' || (voiceKind(lang) === 'local' && voiceReady));

  useEffect(() => {
    addRecent(word);
    recordLookup(word).catch(() => {});
    loadWordList().then((l) => setLevel(levelOf(word, l))).catch(() => {});
    getRecord(word).then((r) => { setSaved(Boolean(r?.saved)); setListIds(r?.listIds || []); setNoteText(r?.note || ''); }).catch(() => {});
  }, [word]);

  useEffect(() => { if (e && settings.readAloud && canSpeak()) speak(word, { accent: settings.accent, rate: settings.speechRate }); }, [e?.word]);

  // A second tap on the playing button stops it; any other button stops it and starts its own.
  async function play(kind) {
    if (playing === kind) { run.current++; stopAll(); setPlaying(null); return; }
    const id = ++run.current;
    stopAll();
    setPlaying(kind);
    const live = () => run.current === id;
    const opts = { accent: kind === 'UK' || kind === 'US' ? kind : settings.accent, rate: kind === 'slow' ? 0.6 : settings.speechRate };
    if (kind.startsWith('tr-')) {
      const say = (text, rate = settings.speechRate) => (voiceKind(lang) === 'local'
        ? speakLocal(text, lang, { rate })
        : speak(text, { lang: byCode(lang)?.speech || lang, rate }));
      const head = trData?.head?.text || word;
      try {
        if (kind === 'tr-word') await say(head);
        else if (kind === 'tr-slow') await say(head, 0.7);
        else if (kind === 'tr-all') {
          const own = (t) => inLang(t) || (lang === 'pcm' ? t : null);
          const lines = [head, ...e.meanings.slice(0, MAX_TRANSLATED).flatMap((m) => [own(m.def), m.example ? own(m.example) : null]).filter(Boolean)];
          for (const line of lines) { if (!live()) return; await say(line); }
        } else {
          await say(kind.slice(3));
        }
      } catch { if (live()) toast({ text: `Couldn't play the ${byCode(lang)?.name} voice`, kind: 'error' }); }
      if (live()) setPlaying(null);
      return;
    }
    if (kind === 'all') {
      const lines = [word, ...e.meanings.flatMap((m) => [`${m.pos}. ${m.def}`, ...(m.example ? [m.example] : [])])];
      for (const line of lines) {
        if (!live()) return;
        await speak(line, opts);
      }
    } else if (kind === 'slow') {
      await speak(word, opts);
    } else {
      const url = kind === 'UK' ? e.audio.uk : e.audio.us || e.audio.au;
      await playAudioOr(url, word, opts);
    }
    if (live()) setPlaying(null);
  }

  async function openSave() {
    const [all, words] = await Promise.all([allLists().catch(() => []), savedWords().catch(() => [])]);
    const counts = {};
    for (const w of words) for (const id of w.listIds || []) counts[id] = (counts[id] || 0) + 1;
    setLists({ all, counts });
    setPick(listIds);
    setSheet('save');
  }

  // Saving always keeps the word in My Words; lists are optional groups on top.
  async function saveTo(ids) {
    const before = { saved, listIds };
    setSheet(null);
    try {
      await setWordLists(word, ids);
      setSaved(true); setListIds(ids);
      const names = lists.all.filter((l) => ids.includes(l.id)).map((l) => l.name);
      const where = names.length === 1 ? `“${names[0]}”` : names.length ? `${names.length} lists` : 'My Words';
      toast({ text: `Saved “${word}” to ${where}`, kind: 'success', action: 'Undo', onAction: () => restore(before) });
    } catch { toast({ text: "Couldn't save on this device", kind: 'error' }); }
  }

  async function remove() {
    const before = { saved, listIds };
    setSheet(null);
    try {
      await unsaveWord(word);
      setSaved(false); setListIds([]);
      toast({ text: `Removed “${word}” from My Words`, kind: 'success', action: 'Undo', onAction: () => restore(before) });
    } catch { toast({ text: "Couldn't change this on this device", kind: 'error' }); }
  }

  async function restore(prev) {
    await (prev.saved ? setWordLists(word, prev.listIds) : unsaveWord(word)).catch(() => {});
    setSaved(prev.saved); setListIds(prev.listIds);
  }

  async function newList(form) {
    try {
      const l = await createList(form);
      setPick((ids) => [...ids, l.id]);
      setLists((x) => ({ ...x, all: [...x.all, l] }));
      setSheet('save');
    } catch { toast({ text: "Couldn't create the list", kind: 'error' }); }
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

  const back = (ev) => { if (canGoBack()) { ev.preventDefault(); history.back(); } };
  const top = (
    <div class="wd-top">
      <a class="wd-round light" href="/search" aria-label="Back" onClick={back}><BackIcon /></a>
      {e && (
        <div class="wd-top-actions">
          <button type="button" class={`wd-round ${saved ? 'on' : 'light'}`} aria-pressed={saved} aria-haspopup="dialog" aria-label={saved ? 'Saved to My Words' : 'Save to My Words'} onClick={openSave}>
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
      <div class="lx-split wd-split">
      <div class="lx-col lx-sticky wd-head">
      <section class="wd-card" aria-label={word}>
        {level && <span class="wd-level">{level.cefr} · {level.label}</span>}
        <h1 class="wd-word">{word}</h1>
        {trData?.head && <p class="wd-tr-word" lang={lang} dir={byCode(lang)?.dir || 'ltr'}><span class="lx-sr">In {byCode(lang)?.name}: </span>{trData.head.text}</p>}
        <div class="wd-say">
          {e.ipa && <p class="wd-ipa">{e.ipa}</p>}
          {e.syllables && <p class="wd-syl" aria-label={`Syllables: ${e.syllables.join(', ')}`}>{e.syllables.join(' · ')}</p>}
        </div>
        <div class="wd-play" role="group" aria-label="Pronunciation">
          {[['US', 'US', SpeakerIcon], ['UK', 'UK', SpeakerIcon], ['slow', 'Slow', SlowIcon], ['all', 'Read all', ReadAllIcon]].map(([k, label, I]) => (
            <button key={k} type="button" class={playing === k ? 'on' : ''} aria-pressed={playing === k} onClick={() => play(k)} disabled={!canSpeak() && (k === 'slow' || k === 'all')}>
              {playing === k ? <span class="wd-bars" aria-hidden="true"><span /><span /><span /></span> : <I size={22} />}
              {playing === k ? 'Stop' : label}
            </button>
          ))}
        </div>
      </section>
      {chips.length > 0 && (
        <section class="wd-related lx-rise lx-d1" aria-label="Related words">
          <p class="wd-related-h" aria-hidden="true">Related</p>
          <ul class="wd-moons">
            {chips.map((c, i) => (
              <li key={c.word} class={`p${i}`}>
                <a class={`wd-moon lx-chip ${c.kind}`} href={`/word/${c.word}`} aria-label={`${c.word}, ${KIND_LABEL[c.kind]}`}>{c.mark} {c.word}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
      <LangPanel lang={lang} setLang={setLang} tr={tr} playing={playing} play={play} voiceReady={voiceReady} onReady={() => bump((n) => n + 1)} />
      {noRecording && <p class="wd-device-voice">No recording yet, so your device's voice reads it.</p>}
      {e.stale && <p class="wd-device-voice">Showing the copy saved on this device.</p>}
      </div>

      <div class="lx-col wd-body">
      <section class="wd-meanings lx-rise lx-d3" aria-labelledby="wd-m">
        <h2 id="wd-m">{trData && uiLabel('meanings', lang) ? <><span lang={lang}>{uiLabel('meanings', lang)}</span> · Meanings</> : 'Meanings'}</h2>
        {e.meanings.map((m, i) => { const tDef = inLang(m.def); const tEx = m.example ? inLang(m.example) : null; const tPos = trData ? posLabel(m.pos, lang) : null; return (
          <article key={i} class="wd-meaning" aria-label={`Meaning ${i + 1}, ${m.pos}${i === 0 ? ', most common' : ''}`}>
            <div class="wd-meaning-head">
              <span class={`wd-num n${i % 4}`} aria-hidden="true">{i + 1}</span>
              <span class="wd-pos">{tPos ? <><span lang={lang}>{tPos}</span> · {m.pos}</> : m.pos}</span>
              {i === 0 && <span class="wd-common">Most common</span>}
            </div>
            {tDef ? (
              <>
                <p class="wd-def" lang={lang} dir={byCode(lang)?.dir || 'ltr'}>{tDef}</p>
                <p class="wd-def-en"><span class="lx-sr">In English: </span>{m.def}</p>
              </>
            ) : <p class="wd-def">{m.def}</p>}
            {m.example && (
              <div class="wd-example">
                {m.register && <span class="wd-register">{m.register}</span>}
                {tEx && <span class="wd-ex-tr" lang={lang} dir={byCode(lang)?.dir || 'ltr'}>“{tEx}”</span>}
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
              {(tDef || (lang === 'pcm' && i < MAX_TRANSLATED)) && canHearLang && (() => { const k = `tr-${tDef || m.def}`; return (
                <button type="button" class={`wd-use-btn ${playing === k ? 'on' : ''}`} aria-pressed={playing === k} onClick={() => play(k)}>
                  <SpeakerIcon size={18} />{playing === k ? 'Stop' : <>Listen in <span lang={lang}>{TAB_NAME[lang] || byCode(lang)?.name}</span></>}
                </button>
              ); })()}
              <button type="button" class="wd-round soft" aria-label={`Copy meaning ${i + 1}`} onClick={() => copy(m.def)}><CopyIcon size={20} /></button>
              <button type="button" class="wd-use-btn" aria-expanded={using === i} onClick={() => setUsing(using === i ? null : i)}><PenIcon size={18} />Use it</button>
            </div>
          </article>
        ); })}
        {trData && Object.keys(trData.map).length > 0 && e.meanings.length > MAX_TRANSLATED && <p class="wd-lang-rest">Meanings {MAX_TRANSLATED + 1} and on stay in English, to keep within today's free translations.</p>}
      </section>

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
      </div>
      </div>
      <SaveSheet open={sheet === 'save'} word={word} lists={lists.all} counts={lists.counts} selected={pick} saved={saved}
        onClose={() => setSheet(null)} onSave={saveTo} onRemove={remove} onNewList={(cur) => { setPick(cur); setSheet('new'); }} />
      <ListFormSheet open={sheet === 'new'} onClose={() => setSheet('save')} onSave={newList} />
    </>
  );
}
