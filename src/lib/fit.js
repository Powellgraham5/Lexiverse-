// Font size that fits a word on one line inside a planet of `width` px (display font is about 0.72em per letter).
export const planetFont = (word, width, max = 16) => `min(${max / 16}rem, ${Math.max(9, Math.floor(width / (Math.max(word.length, 6) * 0.72)))}px)`;
