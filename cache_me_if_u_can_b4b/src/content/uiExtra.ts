import type { Bi } from '../engine/types';

// Labels for the drawn practice ID card and the Guide privacy note (Settings > About).
// The privacy lines mirror the five-line text in docs/guide-tests.md.
// TODO(UR-review): new copy; needs the same native review as the main catalog.
export const UI_EXTRA_STRINGS: Record<string, Bi> = {
  card_title: { en: 'Citizen Services Portal (Practice)', ur: 'شہری خدمات پورٹل (مشق)' },
  flip: { en: 'Flip the card', ur: 'کارڈ پلٹیں' },
  card_name: { en: 'Name', ur: 'نام' },
  card_father: { en: 'Father', ur: 'والد کا نام' },
  card_dob: { en: 'Date of birth', ur: 'تاریخ پیدائش' },
  card_phone: { en: 'Phone', ur: 'فون' },
  card_id: { en: 'ID number', ur: 'شناختی نمبر' },
  guide_privacy_title: { en: 'What the Guide can and cannot see', ur: 'گائیڈ کیا دیکھ سکتا ہے اور کیا نہیں' },
  guide_privacy_1: {
    en: 'The Guide looks at box labels to explain what a form asks for.',
    ur: 'گائیڈ خانوں کے عنوان دیکھ کر بتاتا ہے کہ فارم کیا پوچھ رہا ہے۔',
  },
  guide_privacy_2: {
    en: 'It can check whether an ordinary required box is empty.',
    ur: 'وہ صرف یہ دیکھ سکتا ہے کہ کوئی عام ضروری خانہ خالی تو نہیں۔',
  },
  guide_privacy_3: {
    en: 'It does not read passwords, PINs, card details or verification codes.',
    ur: 'وہ پاس ورڈ، پن، کارڈ کی تفصیل یا تصدیقی کوڈ نہیں پڑھتا۔',
  },
  guide_privacy_4: {
    en: 'It does not send what you type to the app.',
    ur: 'آپ جو لکھتے ہیں وہ ایپ کو نہیں بھیجتا۔',
  },
  guide_privacy_5: {
    en: 'The website itself can still receive information you enter or submit.',
    ur: 'ویب سائٹ آپ کی لکھی ہوئی یا جمع کرائی ہوئی معلومات پھر بھی حاصل کر سکتی ہے۔',
  },
};
