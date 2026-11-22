import { useEffect, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { goBack } from '../../app/Shell.jsx';
import { usePage } from '../../app/usePage.js';
import { BackIcon, DownloadIcon, ShareIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { toast } from '../../components/toast.jsx';
import { loadPath, loadProgress, pathProgress, lessonsOf, pathById } from '../../lib/paths.js';
import { loadName, saveName } from '../../lib/challenge.js';
import { drawCertificate, downloadCertificate, shareCertificate } from '../../lib/certificate.js';
import '../Paths/paths.css';
import './certificate.css';

const longDate = (at) => new Date(at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

// A certificate for a finished course: type a name, see it drawn, then save or share the image.
export default function Certificate() {
  const { params } = useRoute();
  const meta = pathById(params.id);
  usePage(meta ? `${meta.title} certificate` : 'Certificate');
  const [st, setSt] = useState(null);
  const [name, setName] = useState(loadName);
  const [img, setImg] = useState('');
  const canvas = useRef(null);
  useEffect(() => {
    Promise.all([loadPath(params.id), loadProgress(params.id)])
      .then(([path, progress]) => setSt(path ? { path, progress } : { missing: true }))
      .catch(() => setSt({ missing: true }));
  }, [params.id]);

  const info = st?.path && (() => {
    const done = Object.values(st.progress.done || {});
    const graded = done.filter((d) => d.total);
    const score = graded.length ? Math.round((100 * graded.reduce((a, d) => a + d.score, 0)) / graded.reduce((a, d) => a + d.total, 0)) : null;
    const last = Math.max(...done.map((d) => d.at || 0), 0) || Date.now();
    return { p: pathProgress(st.path, st.progress), lessons: lessonsOf(st.path).length, score, date: longDate(last) };
  })();
  const clean = name.trim();

  useEffect(() => {
    if (!info || info.p.next || !clean) { setImg(''); return undefined; }
    let live = true;
    const t = setTimeout(async () => {
      const c = canvas.current || (canvas.current = document.createElement('canvas'));
      await drawCertificate(c, { name: clean, course: st.path.title, lessons: info.lessons, score: info.score, date: info.date });
      if (live) setImg(c.toDataURL('image/png'));
    }, 250);
    return () => { live = false; clearTimeout(t); };
  }, [clean, st]);

  const top = <div class="lx-top"><a class="lx-round" href={`/learn/path/${params.id}`} aria-label="Back" onClick={goBack}><BackIcon /></a></div>;
  if (!st) return <>{top}<h1 class="lx-sr">Certificate</h1><span class="lx-skeleton pt-sk" aria-busy="true" /></>;
  if (st.missing) return <>{top}<h1 class="lx-page-title">Certificate</h1><ErrorCard title="We couldn't find this course">Pick a course from Learn.</ErrorCard><a class="lx-btn" href="/learn/paths">All courses</a></>;

  const { path } = st;
  if (info.p.next) {
    return (
      <>{top}
        <header class="ct-head lx-rise">
          <h1 class="lx-page-title">Your {path.title} certificate</h1>
          <p class="pt-sub">Finish every lesson to unlock it. You have done {info.p.done} of {info.p.total}.</p>
        </header>
        <div class="pd-prog"><span class="lx-bar" aria-hidden="true"><span style={{ width: `${info.p.percent}%` }} /></span><span>{info.p.done} of {info.p.total} lessons done</span></div>
        <a class="lx-btn" href={`/learn/path/${path.id}/${info.p.next.id}`}>Continue: {info.p.next.title}</a>
      </>
    );
  }

  const save = async () => { saveName(clean); try { await downloadCertificate(canvas.current, path.title); toast({ text: 'Certificate saved', kind: 'success' }); } catch { toast({ text: "Couldn't save the certificate", kind: 'error' }); } };
  const share = async () => {
    saveName(clean);
    const r = await shareCertificate(canvas.current, path.title).catch(() => 'failed');
    if (r === 'unsupported' || r === 'failed') { await save(); }
  };
  return (
    <>{top}
      <header class="ct-head lx-rise">
        <h1 class="lx-page-title">Your {path.title} certificate</h1>
        <p class="pt-sub">You finished all {info.lessons} lessons. Add your name as you want it to appear.</p>
      </header>
      <label class="ct-name lx-rise lx-d1">
        <span>Name on the certificate</span>
        <input type="text" autocomplete="name" maxLength={40} value={name} onInput={(e) => setName(e.currentTarget.value)} aria-describedby="ct-hint" />
        <span id="ct-hint" class="ct-hint">{clean ? 'The preview updates as you type.' : 'Type your name to see your certificate.'}</span>
      </label>
      <div class="ct-preview lx-card lx-rise lx-d2" aria-live="polite">
        {img
          ? <img src={img} width="1600" height="1131" alt={`Certificate of completion: ${clean} has completed the Lexiverse ${path.title} course, ${info.lessons} lessons${info.score !== null ? `, average lesson score ${info.score}%` : ''}, on ${info.date}.`} />
          : <p class="ct-empty">Your certificate appears here.</p>}
      </div>
      <div class="ct-actions lx-rise lx-d3">
        <button type="button" class="lx-btn" disabled={!img} onClick={share}><ShareIcon />Share</button>
        <button type="button" class="lx-btn secondary" disabled={!img} onClick={save}><DownloadIcon />Save image</button>
      </div>
      <p class="pd-note">A practice course certificate from Lexiverse. It is not an official qualification.</p>
    </>
  );
}
