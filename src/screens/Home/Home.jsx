import { useEffect } from 'preact/hooks';
import { useLocation, lazy } from 'preact-iso';
import { loadProfile } from '../../lib/profile.js';
import { homeFor } from '../../lib/home.js';
import Today from '../Today/Today.jsx';

export { homeFor };

// The subject homes load on demand, so the word-of-the-day home stays light.
const SubjectHome = lazy(() => import('./SubjectHome.jsx'));

export default function Home() {
  const { route } = useLocation();
  const profile = loadProfile();
  useEffect(() => { if (!profile?.done) route('/welcome', true); }, []);
  const home = homeFor(profile);
  if (home.kind !== 'today') return <SubjectHome kind={home.kind} id={home.id} />;
  return <Today />;
}
