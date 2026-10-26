import { usePage } from '../../app/usePage.js';
import { Placeholder } from '../../components/Placeholder.jsx';

export default function TranslateSoon() {
  usePage('Translator');
  return <Placeholder title="Translator" phase={2}>Translate words and phrases into Yoruba, Hausa, Igbo, French and more, with a phrasebook that works offline.</Placeholder>;
}
