import { LearnIcon, PenIcon, CaseIcon, StarIcon, HeartIcon, WordsIcon } from '../../app/icons.jsx';
import './lists.css';

const ICON = { cap: LearnIcon, pen: PenIcon, case: CaseIcon, star: StarIcon, heart: HeartIcon };
export const ICON_LABEL = { cap: 'Graduation cap', pen: 'Pen', case: 'Briefcase', letter: 'First letter', star: 'Star', heart: 'Heart' };

// A list drawn as a small planet with a ring and moon; decorative (the list name is the label).
export function ListPlanet({ list, size = 56 }) {
  const I = list.id === 'saved' ? WordsIcon : ICON[list.icon];
  return (
    <span class="lp-planet" aria-hidden="true" style={{ '--c': list.colour || '#4A2FE0', width: `${size}px`, height: `${size}px` }}>
      <span class="lp-ring" />
      {I ? <I size={Math.round(size * 0.4)} /> : <b>{(list.name || '?')[0].toUpperCase()}</b>}
    </span>
  );
}
