import { useEffect, useRef } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { TodayIcon, SearchIcon, WordsIcon, LearnIcon, MeIcon } from './icons.jsx';
import { Starfield } from '../components/Starfield.jsx';
import { OfflineBanner } from '../components/OfflineBanner.jsx';
import { Toasts, toast } from '../components/toast.jsx';
import { onDeviceVoice, isIOS } from '../lib/speech.js';
import { requestHeadingFocus } from './usePage.js';
import { homeFor } from '../lib/home.js';
import { loadProfile } from '../lib/profile.js';
import './shell.css';

const TABS = [
  { href: '/', label: 'Home', Icon: TodayIcon },
  { href: '/search', label: 'Search', Icon: SearchIcon },
  { href: '/words', label: 'Words', Icon: WordsIcon },
  { href: '/learn', label: 'Learn', Icon: LearnIcon },
  { href: '/me', label: 'Me', Icon: MeIcon }
];

// The word of the day (/today) is Home for Everyday English learners; for everyone else it lives under Learn.
const todayIsHome = () => homeFor(loadProfile()).kind === 'today';
const isActive = (href, path) => {
  if (path === '/today') return todayIsHome() ? href === '/' : href === '/learn';
  return href === '/' ? path === '/' : path === href || path.startsWith(href + '/');
};

// Focused flows (and path lessons) fill the screen without the tab bar.
const FULLSCREEN = ['/welcome', '/challenge', '/learn/flashcards', '/learn/quiz', '/learn/spell', '/learn/match', '/learn/setup'];

// The first time the device voice speaks on an iPhone or iPad, explain the silent switch once.
const TIP_KEY = 'lx-tip-silent';
onDeviceVoice(() => {
  if (!isIOS()) return;
  try { if (localStorage.getItem(TIP_KEY)) return; localStorage.setItem(TIP_KEY, '1'); } catch { return; }
  toast({ text: "Can't hear it? Turn off silent mode (the switch on the side of your iPhone) to hear the device voice." });
});

// Scroll memory for Back and Forward: positions are saved per URL as the learner scrolls.
const scrollPositions = new Map();
let cameBack = false;
let backY = 0;
// How many screens the learner has moved through in this tab, so Back buttons never leave the app.
let moves = 0;
export const canGoBack = () => moves > 0;
// For Back links: go back within the app when there is somewhere to go back to, else follow the link.
export const goBack = (e) => { if (moves > 0) { e.preventDefault(); history.back(); } };
let shown = typeof location !== 'undefined' ? location.pathname + location.search : '';
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  // Read the saved position at once: while the page swaps, scroll events would overwrite it.
  addEventListener('popstate', () => {
    // A same-page jump (the skip link's #main) also fires popstate; it is not a Back to another screen.
    if (location.pathname + location.search === shown) return;
    cameBack = true;
    backY = scrollPositions.get(location.pathname + location.search) || 0;
  });
  let pending = false;
  addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; scrollPositions.set(location.pathname + location.search, scrollY); });
  }, { passive: true });
}
// Content often loads after the route changes, so retry until the page is tall enough (up to 1.5 s).
function restoreScroll(y) {
  const until = Date.now() + 1500;
  const step = () => {
    scrollTo(0, y);
    if (Math.abs(scrollY - y) > 2 && Date.now() < until) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function Shell({ children }) {
  const { path } = useLocation();
  const bare = FULLSCREEN.includes(path) || /^\/learn\/(path|bank)\/[^/]+\/[^/]+$/.test(path);
  const first = useRef(true);

  // Forward navigation starts the new screen at the top and focuses its heading (see usePage).
  // Back and Forward return to where the learner was on that screen, without moving focus.
  useEffect(() => {
    shown = location.pathname + location.search;
    if (first.current) { first.current = false; return; }
    moves++;
    if (cameBack) {
      cameBack = false;
      restoreScroll(backY);
    } else {
      requestHeadingFocus();
      scrollTo(0, 0);
    }
  }, [path]);

  // Sticky side columns on wide screens only stick when they fit the window; a taller column
  // scrolls with the page so none of it is ever out of reach.
  useEffect(() => {
    const fit = () => document.querySelectorAll('.lx-sticky').forEach((el) => el.classList.toggle('lx-nostick', el.offsetHeight > innerHeight - 64));
    const timers = [setTimeout(fit, 300), setTimeout(fit, 1200)];
    addEventListener('resize', fit);
    return () => { timers.forEach(clearTimeout); removeEventListener('resize', fit); };
  }, [path]);

  return (
    <>
      <a class="lx-skip" href="#main">Skip to content</a>
      <Starfield />
      <div class={`lx-app ${bare ? 'bare' : ''}`}>
        {!bare && <nav class="lx-nav" aria-label="Main">
          <a class="lx-brand" href="/" aria-label="Lexiverse home">
            <img src="/favicon.svg" alt="" width="36" height="36" />
            <span>lexi<b>verse</b></span>
          </a>
          <ul>
            {TABS.map(({ href, label, Icon }) => (
              <li key={href}>
                <a href={href} aria-current={isActive(href, path) ? 'page' : undefined}>
                  <Icon />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>}
        <main id="main" tabIndex={-1}>
          <OfflineBanner />
          {children}
        </main>
      </div>
      <Toasts />
    </>
  );
}
