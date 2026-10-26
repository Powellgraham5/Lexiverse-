// Line icons shared across the app. All are decorative: the label sits next to them.
const Icon = ({ size = 22, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" {...rest}>{children}</svg>
);

export const TodayIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="3" /><ellipse cx="12" cy="12" rx="10" ry="4" /></Icon>;
export const SearchIcon = (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>;
export const WordsIcon = (p) => <Icon {...p}><path d="M6 3h12v18l-6-4-6 4z" /></Icon>;
export const LearnIcon = (p) => <Icon {...p}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5" /></Icon>;
export const MeIcon = (p) => <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>;
export const OfflineIcon = (p) => <Icon {...p}><path d="M2 8.8a15 15 0 0 1 4.2-2.6M9.5 5.2A15 15 0 0 1 22 8.8M5 12.5a10 10 0 0 1 3.5-2.1M15.5 10.4A10 10 0 0 1 19 12.5M8.5 16a5 5 0 0 1 7 0M12 20h.01M3 3l18 18" /></Icon>;
export const CheckIcon = (p) => <Icon {...p}><path d="M20 6 9 17l-5-5" /></Icon>;
export const AlertIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></Icon>;
export const CloseIcon = (p) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12" /></Icon>;
export const SpeakerIcon = (p) => <Icon {...p}><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /></Icon>;
export const ChevronIcon = (p) => <Icon {...p}><path d="m9 6 6 6-6 6" /></Icon>;
export const BackIcon = (p) => <Icon {...p}><path d="m15 6-6 6 6 6" /></Icon>;
export const MicIcon = (p) => <Icon {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></Icon>;
export const TranslateIcon = (p) => <Icon {...p}><path d="M4 5h8M8 3v2M5 9c1.5 3 4 5 7 6M11 5c-1 4-3.5 7-7 9" /><path d="m13 21 4-9 4 9M14.5 18h5" /></Icon>;
export const CardsIcon = (p) => <Icon {...p}><rect x="3" y="7" width="14" height="14" rx="2" /><path d="M7 3h12a2 2 0 0 1 2 2v12" /></Icon>;
export const FlameIcon = ({ size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-5 5-5 8-1-1-2-2-2-4-2 2-2 5-2 8 0 4 3 7 7 7z" />
  </svg>
);
