import type { Bi, Hiccup, HiccupId } from '../engine/types';

export const HICCUPS: Record<HiccupId, Hiccup> = {
  vague_error: {
    id: 'vague_error',
    audio: 'h_vague_error',
    happened: {
      en: 'The form did not go through and showed a short message.',
      ur: 'فارم آگے نہیں گیا اور ایک چھوٹا سا پیغام دکھایا۔', // TODO(UR-review)
    },
    habit: {
      en: 'Read the red words. They point to the box to fix.',
      ur: 'سرخ الفاظ پڑھیں۔ وہ بتاتے ہیں کہ کون سا خانہ ٹھیک کرنا ہے۔', // TODO(UR-review)
    },
  },
  wrong_format: {
    id: 'wrong_format',
    audio: 'h_wrong_format',
    happened: {
      en: 'The date box did not accept this shape.',
      ur: 'تاریخ والے خانے نے یہ شکل قبول نہیں کی۔', // TODO(UR-review)
    },
    habit: {
      en: 'Copy the shape of the grey example.',
      ur: 'سرمئی مثال کی شکل میں لکھیں۔', // TODO(UR-review)
    },
  },
  unknown_word: {
    id: 'unknown_word',
    audio: 'h_unknown_word',
    happened: {
      en: 'The form used a word it does not explain.',
      ur: 'فارم نے ایک ایسا لفظ لکھا جس کا مطلب نہیں بتایا۔', // TODO(UR-review)
    },
    habit: {
      en: 'Tap the question mark to see what a word means.',
      ur: 'کسی لفظ کا مطلب دیکھنے کے لیے سوالیہ نشان پر ٹیپ کریں۔', // TODO(UR-review)
    },
  },
  find_answer: {
    id: 'find_answer',
    audio: 'h_find_answer',
    happened: {
      en: 'This box asks for something that is not on the screen.',
      ur: 'یہ خانہ ایسی چیز پوچھ رہا ہے جو اسکرین پر نہیں ہے۔', // TODO(UR-review)
    },
    habit: {
      en: 'The answer is often on the back of the card. Tap Where it is.',
      ur: 'جواب اکثر کارڈ کی پچھلی طرف ہوتا ہے۔ "یہ کہاں ہے" پر ٹیپ کریں۔', // TODO(UR-review)
    },
  },
  logged_out: {
    id: 'logged_out',
    audio: 'h_logged_out',
    happened: {
      en: 'The form closed the session and asked to log in again.',
      ur: 'فارم نے سیشن بند کر دیا اور دوبارہ لاگ اِن کرنے کو کہا۔', // TODO(UR-review)
    },
    habit: {
      en: 'Real forms can lose your answers. Keep your details ready and log in again. The second time is faster.',
      ur: 'اصلی فارم آپ کے جوابات کھو سکتے ہیں۔ اپنی معلومات تیار رکھیں اور دوبارہ لاگ اِن کریں۔ دوسری بار کام جلدی ہوتا ہے۔', // TODO(UR-review)
    },
  },
  upload_rejected: {
    id: 'upload_rejected',
    audio: 'h_upload_rejected',
    happened: {
      en: 'The form did not accept this photo.',
      ur: 'فارم نے یہ تصویر قبول نہیں کی۔', // TODO(UR-review)
    },
    habit: {
      en: 'Retake the photo in daylight, flat, with all four corners visible.',
      ur: 'دن کی روشنی میں، سیدھا رکھ کر، چاروں کونے دکھاتے ہوئے دوبارہ تصویر لیں۔', // TODO(UR-review)
    },
  },
  verification_code: {
    id: 'verification_code',
    audio: 'h_verification_code',
    happened: {
      en: 'A code arrived by SMS.',
      ur: 'SMS کے ذریعے ایک کوڈ آیا ہے۔', // TODO(UR-review)
    },
    habit: {
      en: 'Type the code only on the site you started. Nobody who calls you should ever ask for it.',
      ur: 'کوڈ صرف اسی ویب سائٹ پر لکھیں جہاں آپ نے کام شروع کیا تھا۔ فون کرنے والا کوئی بھی شخص یہ کوڈ کبھی نہ مانگے۔', // TODO(UR-review)
    },
  },
  back_fear: {
    id: 'back_fear',
    audio: 'h_back_fear',
    happened: {
      en: 'An earlier box needs a change.',
      ur: 'پچھلے کسی خانے میں تبدیلی کرنی ہے۔', // TODO(UR-review)
    },
    habit: {
      en: "Use the form's own Back link when there is one. Your practice answers are saved.",
      ur: 'اگر فارم میں اپنا "واپس" کا بٹن ہو تو وہی استعمال کریں۔ آپ کے مشق والے جوابات محفوظ ہیں۔', // TODO(UR-review)
    },
  },
};

// Audio ids: safety_1 .. safety_6, in this order.
export const SAFETY_LINES: Bi[] = [
  {
    en: 'Never share a code that comes by SMS, with anyone.',
    ur: 'SMS سے آنے والا کوڈ کبھی کسی کو نہ بتائیں۔', // TODO(UR-review)
  },
  {
    en: 'If a call feels wrong, hang up and call the official number on your card.',
    ur: 'اگر کوئی کال عجیب لگے تو فون بند کریں اور اپنے کارڈ پر لکھے سرکاری نمبر پر خود فون کریں۔', // TODO(UR-review)
  },
  {
    en: 'A message about a prize you never entered is a trick. You can simply delete it.',
    ur: 'ایسے انعام کا پیغام جس میں آپ نے حصہ ہی نہیں لیا، ایک چال ہے۔ آپ اسے بس مٹا سکتے ہیں۔', // TODO(UR-review)
  },
  {
    en: 'Banks do not ask for your PIN. Not by phone, and not by message.',
    ur: 'بینک آپ کا پن کوڈ نہیں مانگتے۔ نہ فون پر، نہ پیغام میں۔', // TODO(UR-review)
  },
  {
    en: 'You can always ask someone you trust before you tap.',
    ur: 'ٹیپ کرنے سے پہلے آپ ہمیشہ کسی بھروسے والے شخص سے پوچھ سکتے ہیں۔', // TODO(UR-review)
  },
  {
    en: 'It is okay to stop and come back later.',
    ur: 'رک جانا اور بعد میں واپس آنا بالکل ٹھیک ہے۔', // TODO(UR-review)
  },
];
