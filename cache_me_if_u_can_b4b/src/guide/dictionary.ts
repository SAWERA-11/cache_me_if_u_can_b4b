import { GLOSSARY, GUIDE_TEXT } from '../content';

export function buildDictionary(lang: 'ur' | 'en') {
  return { lang, placeholder: false, ...GUIDE_TEXT[lang],
    glossary: GLOSSARY.map(({ id, pattern }) => ({ id, pattern })) };
}
