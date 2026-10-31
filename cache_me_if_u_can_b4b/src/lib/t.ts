import { useCallback } from 'react';
import { STRINGS } from '../content';
import { useApp } from '../store/useApp';
import type { Lang } from '../engine/types';

export function tr(key: string, lang: Lang): string {
  const value = STRINGS[key];
  return value?.[lang] ?? key;
}

export function useT(): (key: string) => string {
  const language = useApp((state) => state.language);
  return useCallback((key: string) => tr(key, language), [language]);
}
