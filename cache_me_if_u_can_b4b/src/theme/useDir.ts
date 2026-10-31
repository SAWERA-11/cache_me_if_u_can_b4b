import { useApp } from './wire';

// Manual right-to-left (no I18nManager). This is the only place that names physical sides.
export function useDir() {
  const language = useApp((s) => s.language);
  const rtl = language === 'ur';
  return {
    rtl,
    row: (rtl ? 'row-reverse' : 'row') as 'row' | 'row-reverse',
    align: (rtl ? 'right' : 'left') as 'left' | 'right',
    startSide: (rtl ? 'right' : 'left') as 'left' | 'right',
    endSide: (rtl ? 'left' : 'right') as 'left' | 'right',
    alignStart: (rtl ? 'flex-end' : 'flex-start') as 'flex-start' | 'flex-end',
  };
}
