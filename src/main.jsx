import { render } from 'preact';
import { LocationProvider, Router, Route, lazy, ErrorBoundary } from 'preact-iso';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/unbounded/wght.css';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import './styles/base.css';
import { SettingsProvider } from './app/settings-context.jsx';
import { Shell } from './app/Shell.jsx';
import { Crash } from './app/Crash.jsx';
import { registerServiceWorker } from './app/sw.js';
import Today from './screens/Today/Today.jsx';
import Home from './screens/Home/Home.jsx';

// Today loads with the app; every other screen is split into its own chunk.
const Search = lazy(() => import('./screens/Search/Search.jsx'));
const Words = lazy(() => import('./screens/Words/Words.jsx'));
const ListDetail = lazy(() => import('./screens/Words/ListDetail.jsx'));
const Progress = lazy(() => import('./screens/Progress/Progress.jsx'));
const Paths = lazy(() => import('./screens/Paths/Paths.jsx'));
const PathDetail = lazy(() => import('./screens/Paths/PathDetail.jsx'));
const Lesson = lazy(() => import('./screens/Paths/Lesson.jsx'));
const PracticeTest = lazy(() => import('./screens/Paths/PracticeTest.jsx'));
const Bank = lazy(() => import('./screens/Bank/Bank.jsx'));
const BankSession = lazy(() => import('./screens/Bank/BankSession.jsx'));
const Formats = lazy(() => import('./screens/Paths/Formats.jsx'));
const Note = lazy(() => import('./screens/Words/NoteEditor.jsx'));
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
const Certificate = lazy(() => import('./screens/Certificate/Certificate.jsx'));
const Mock = lazy(() => import('./screens/Mock/Mock.jsx'));
const Help = lazy(() => import('./screens/Help/Help.jsx'));
const NotFound = lazy(() => import('./screens/NotFound/NotFound.jsx'));

// A screen that shows one item (a word, a lesson, a subject) starts fresh when the item changes,
// so it never shows the previous item's details, sound or focus while the new one loads.
const keyed = (C, ...names) => (props) => <C key={names.map((n) => props.params?.[n]).join('/')} {...props} />;
const WordRoute = keyed(Word, 'word');
const ShareRoute = keyed(Share, 'word');
const LessonRoute = keyed(Lesson, 'id', 'lesson');
const PathRoute = keyed(PathDetail, 'id');
const BankRoute = keyed(BankSession, 'subject');
const ListRoute = keyed(ListDetail, 'id');
const CertRoute = keyed(Certificate, 'id');

function App() {
  return (
    <SettingsProvider>
      <LocationProvider>
        <ErrorBoundary>
          <Shell>
            <Crash>
            <Router>
              <Route path="/" component={Home} />
              <Route path="/today" component={Today} />
              <Route path="/search" component={Search} />
              <Route path="/words" component={Words} />
              <Route path="/words/list/:id" component={ListRoute} />
              <Route path="/progress" component={Progress} />
              <Route path="/learn" component={Learn} />
              <Route path="/learn/flashcards" component={Flashcards} />
              <Route path="/learn/quiz" component={Quiz} />
              <Route path="/learn/spell" component={Spell} />
              <Route path="/learn/match" component={Match} />
              <Route path="/learn/setup" component={Setup} />
              <Route path="/learn/paths" component={Paths} />
              <Route path="/learn/bank/jamb" component={Bank} />
              <Route path="/learn/bank/jamb/:subject" component={BankRoute} />
              <Route path="/learn/path/:id" component={PathRoute} />
              <Route path="/learn/path/:id/test" component={PracticeTest} />
              <Route path="/learn/path/:id/:lesson" component={LessonRoute} />
              <Route path="/learn/formats" component={Formats} />
              <Route path="/words/note/:id" component={Note} />
              <Route path="/me" component={Me} />
              <Route path="/help" component={Help} />
              <Route path="/learn/mock" component={Mock} />
              <Route path="/certificate/:id" component={CertRoute} />
              <Route path="/welcome" component={Onboarding} />
              <Route path="/challenge" component={Challenge} />
              <Route path="/word/:word" component={WordRoute} />
              <Route path="/translate" component={Translator} />
              <Route path="/share/:word" component={ShareRoute} />
              <Route default component={NotFound} />
            </Router>
            </Crash>
          </Shell>
        </ErrorBoundary>
      </LocationProvider>
    </SettingsProvider>
  );
}

render(<App />, document.getElementById('app'));
registerServiceWorker();
