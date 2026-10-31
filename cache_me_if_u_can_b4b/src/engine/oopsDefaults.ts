import type { Bi, FieldKind } from './types';

const defaults: Record<FieldKind, Bi> = {
  name: { ur: '', en: 'The name would not match the practice record.' },
  dob: { ur: '', en: 'The date would be rejected because its format is unclear.' },
  id_number: { ur: '', en: 'The identity number would not be accepted.' },
  phone: { ur: '', en: 'The service could not use this phone number.' },
  choice: { ur: '', en: 'That choice would take you to the wrong option.' },
  text: { ur: '', en: 'The text would not be accepted in this box.' },
  file: { ur: '', en: 'The file would not be accepted by the service.' },
  code: { ur: '', en: 'The code would not verify this step.' },
};

export function defaultOops(fieldKind: FieldKind = 'text'): { consequence: Bi; fix: Bi } {
  const consequence = defaults[fieldKind];
  return {
    consequence,
    fix: { ur: '', en: 'Pause, check the example, and try the box again.' },
  };
}
