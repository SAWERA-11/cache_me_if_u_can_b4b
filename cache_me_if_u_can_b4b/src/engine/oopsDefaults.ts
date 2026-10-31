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

const fixes: Record<FieldKind, string> = {
  name: 'Copy the name as it appears on the practice card.',
  dob: 'Use the day-month-year shape shown in the example.',
  id_number: 'Check the number on the back of the practice card and the example format.',
  phone: 'Check the phone number on the practice card and copy the example format.',
  choice: 'Read each option and choose the one that matches the practice card.',
  text: 'Read what this box asks for, then check the example.',
  file: 'Choose a clear photo with all four corners visible.',
  code: 'Copy the code from the practice message into this box.',
};

export function defaultOops(fieldKind: FieldKind = 'text'): { consequence: Bi; fix: Bi } {
  const consequence = defaults[fieldKind];
  return {
    consequence,
    fix: { ur: '', en: fixes[fieldKind] }, // TODO(UR-review)
  };
}
