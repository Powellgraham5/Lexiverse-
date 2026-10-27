import { render } from 'preact';
import { LocationProvider, Router, Route, lazy, ErrorBoundary } from 'preact-iso';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/unbounded/wght.css';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import './styles/base.css';
import { SettingsProvider } from './app/settings-context.jsx';
import { Shell } from './app/Shell.jsx';
import { registerServiceWorker } from './app/sw.js';
import Today from './screens/Today/Today.jsx';

// Today loads with the app; every other screen is split into its own chunk.
const Search = lazy(() => import('./screens/Search/Search.jsx'));
const Words = lazy(() => import('./screens/Words/Words.jsx'));
const ListDetail = lazy(() => import('./screens/Words/ListDetail.jsx'));
const Progress = lazy(() => import('./screens/Progress/Progress.jsx'));
const Paths = lazy(() => import('./screens/Paths/Paths.jsx'));
const PathDetail = lazy(() => import('./screens/Paths/PathDetail.jsx'));
const Lesson = lazy(() => import('./screens/Paths/Lesson.jsx'));
const Learn = lazy(() => import('./screens/Learn/Learn.jsx'));
const Flashcards = lazy(() => import('./screens/Learn/Flashcards.jsx'));
const Quiz = lazy(() => import('./screens/Learn/Quiz.jsx'));
const Spell = lazy(() => import('./screens/Learn/Spell.jsx'));
const Match = lazy(() => import('./screens/Learn/Match.jsx'));
const Setup = lazy(() => import('./screens/Learn/Setup.jsx'));
const Me = lazy(() => import('./screens/Me/Me.jsx'));
const Onboarding = lazy(() => import('./screens/Onboarding/Onboarding.jsx'));
const Challenge = lazy(() => import('./screens/Challenge/Challenge.jsx'));
const Word = lazy(() => import('./screens/Word/Word.jsx'));
const Translator = lazy(() => import('./screens/Translator/Translator.jsx'));
const Share = lazy(() => import('./screens/Share/Share.jsx'));
const NotFound = lazy(() => import('./screens/NotFound/NotFound.jsx'));

function App() {
  return (
    <SettingsProvider>
      <LocationProvider>
        <ErrorBoundary>
          <Shell>
            <Router>
              <Route path="/" component={Today} />
              <Route path="/search" component={Search} />
              <Route path="/words" component={Words} />
              <Route path="/words/list/:id" component={ListDetail} />
              <Route path="/progress" component={Progress} />
              <Route path="/learn" component={Learn} />
              <Route path="/learn/flashcards" component={Flashcards} />
              <Route path="/learn/quiz" component={Quiz} />
              <Route path="/learn/spell" component={Spell} />
              <Route path="/learn/match" component={Match} />
              <Route path="/learn/setup" component={Setup} />
              <Route path="/learn/paths" component={Paths} />
              <Route path="/learn/path/:id" component={PathDetail} />
              <Route path="/learn/path/:id/:lesson" component={Lesson} />
              <Route path="/me" component={Me} />
              <Route path="/welcome" component={Onboarding} />
              <Route path="/challenge" component={Challenge} />
              <Route path="/word/:word" component={Word} />
              <Route path="/translate" component={Translator} />
              <Route path="/share/:word" component={Share} />
              <Route default component={NotFound} />
            </Router>
          </Shell>
        </ErrorBoundary>
      </LocationProvider>
    </SettingsProvider>
  );
}

render(<App />, document.getElementById('app'));
registerServiceWorker();
