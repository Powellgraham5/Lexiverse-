import { useEffect, useRef } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { TodayIcon, SearchIcon, WordsIcon, LearnIcon, MeIcon } from './icons.jsx';
import { Starfield } from '../components/Starfield.jsx';
import { OfflineBanner } from '../components/OfflineBanner.jsx';
import { Toasts } from '../components/toast.jsx';
import { requestHeadingFocus } from './usePage.js';
import './shell.css';

const TABS = [
  { href: '/', label: 'Today', Icon: TodayIcon },
  { href: '/search', label: 'Search', Icon: SearchIcon },
  { href: '/words', label: 'Words', Icon: WordsIcon },
  { href: '/learn', label: 'Learn', Icon: LearnIcon },
  { href: '/me', label: 'Me', Icon: MeIcon }
];

const isActive = (href, path) => (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'));

// Focused flows fill the screen without the tab bar.
const FULLSCREEN = ['/welcome', '/challenge'];

export function Shell({ children }) {
  const { path } = useLocation();
  const bare = FULLSCREEN.includes(path);
  const first = useRef(true);

  // After in-app navigation the new screen focuses its heading (see usePage) and the page starts at the top.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    requestHeadingFocus();
    scrollTo(0, 0);
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
        <main id="main">
          <OfflineBanner />
          {children}
        </main>
      </div>
      <Toasts />
    </>
  );
}
