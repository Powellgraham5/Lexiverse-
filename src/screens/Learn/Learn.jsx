import { usePage } from '../../app/usePage.js';
import { Placeholder } from '../../components/Placeholder.jsx';

export default function Learn() {
  usePage('Learn');
  return <Placeholder title="Learn" phase={3}>Flashcards, quizzes, listen and spell, and word match.</Placeholder>;
}
