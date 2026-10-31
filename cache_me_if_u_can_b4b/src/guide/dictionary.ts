import { GUIDE_TEXT, GLOSSARY } from '../content';
import type { Lang } from '../engine/types';

export function buildDictionary(lang: Lang) {
  return {
    ...GUIDE_TEXT[lang],
    lang,
    placeholder: false,
    glossary: GLOSSARY.map(({ id, pattern }) => ({ id, pattern })),
  };
}
