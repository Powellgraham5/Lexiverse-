import { usePage } from '../../app/usePage.js';
import { Placeholder } from '../../components/Placeholder.jsx';

export default function Words() {
  usePage('My Words');
  return <Placeholder title="My Words" phase={4}>Your saved words and lists, ready for review.</Placeholder>;
}
