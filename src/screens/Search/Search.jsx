import { usePage } from '../../app/usePage.js';
import { Placeholder } from '../../components/Placeholder.jsx';

export default function Search() {
  usePage('Search');
  return <Placeholder title="Search" phase={1}>Search by word, meaning, pattern, rhymes or letters.</Placeholder>;
}
