import { usePage } from '../../app/usePage.js';
import { Placeholder } from '../../components/Placeholder.jsx';

export default function Today() {
  usePage('Today');
  return <Placeholder title="Today" phase={1}>Your word of the day, its orbit of related words and the daily challenge.</Placeholder>;
}
