import type { Bi } from '../engine/types';

// Urdu reviewed and approved by a native speaker (Savera), 31 Oct 2026.
export const INTEGRATION_STRINGS: Record<string, Bi> = {
  change_answer: { en: 'Change this answer', ur: 'یہ جواب بدلیں' },
  save_and_leave: { en: 'Pause and return home', ur: 'رکیں اور ہوم پر جائیں' },
  handled_surprises: { en: 'You handled {n} surprises', ur: 'آپ نے {n} اچانک صورت حال سنبھالیں' },
  practice_form_1: { en: 'Practice form 1', ur: 'مشق کا فارم ۱' },
  practice_form_2: { en: 'Practice form 2', ur: 'مشق کا فارم ۲' },
  practice_form_3: { en: 'Practice form 3', ur: 'مشق کا فارم ۳' }, // TODO(UR-review): button for Maaz's ride practice form
  reload: { en: 'Reload', ur: 'دوبارہ کھولیں' },
  close_and_clear: { en: 'Close and clear', ur: 'بند کریں اور صاف کریں' },
  try_it_now: { en: 'Try it now', ur: 'اب مشق کریں' },
  video_topic_otp: { en: 'Verification codes', ur: 'تصدیقی کوڈ' },
  video_topic_photo: { en: 'Uploading a photo', ur: 'تصویر اپ لوڈ کرنا' },
  video_topic_login: { en: 'Logging in', ur: 'لاگ ان کرنا' },
  video_topic_safety: { en: 'Safer messages', ur: 'حفاظتی پیغامات' },
};
