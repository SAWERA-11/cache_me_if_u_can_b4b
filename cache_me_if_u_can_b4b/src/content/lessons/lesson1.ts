import type { Lesson, Persona } from '../../engine/types';

// Fictional Practice Person. Not a real person, not a real ID number.
const PERSONA: Persona = {
  name: 'Bashir Ahmed',
  father: 'Nazir Ahmed',
  dobWords: '7 March 1958',
  dob: '07-03-1958',
  idNumber: '42101-1234567-1',
  phone: '0300-1234567',
  city: 'Karachi',
  domicile: 'Sindh',
};

const digits = (s: string) => s.replace(/[-\s]/g, '');

export const LESSON1: Lesson = {
  id: 'lesson1',
  title: {
    en: 'Apply for a service card',
    ur: 'سروس کارڈ کے لیے درخواست دیں',
  },
  persona: PERSONA,
  ready: [
    { id: 'ready_1', audio: 'ready_1', text: {
      en: 'Your ID card',
      ur: 'آپ کا شناختی کارڈ',
    } },
    { id: 'ready_2', audio: 'ready_2', text: {
      en: 'Your phone number',
      ur: 'آپ کا فون نمبر',
    } },
    { id: 'ready_3', audio: 'ready_3', text: {
      en: 'A clear photo',
      ur: 'ایک صاف تصویر',
    } },
  ],
  steps: [
    {
      id: 'ready',
      kind: 'info',
      label: {
        en: 'Before you start',
        ur: 'شروع کرنے سے پہلے',
      },
      asks: {
        en: 'Keep these three things near you.',
        ur: 'یہ تین چیزیں اپنے پاس رکھیں۔',
      },
      audio: { asks: 'ready_asks' },
    },
    {
      id: 'name',
      kind: 'field',
      fieldKind: 'name',
      label: {
        en: 'Full name',
        ur: 'پورا نام',
      },
      asks: {
        en: 'Your full name as written on the ID card.',
        ur: 'آپ کا پورا نام، جیسا شناختی کارڈ پر لکھا ہے۔',
      },
      where: {
        en: 'On the front of the ID card.',
        ur: 'شناختی کارڈ کے سامنے والے حصے پر۔', // TODO(UR-review)
      },
      format: {
        en: 'Copy it exactly.',
        ur: 'بالکل ویسے ہی لکھیں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Ask the helper.',
        ur: 'مددگار سے پوچھیں۔', // TODO(UR-review)
      },
      example: 'Bashir Ahmed',
      expected: (v, p) => v.trim() === p.name,
      oops: {
        consequence: {
          en: 'The name would not match the ID card.',
          ur: 'نام شناختی کارڈ سے نہیں ملے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Copy the name from the card, letter by letter.',
          ur: 'کارڈ سے نام ایک ایک حرف کر کے لکھیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'name_asks', where: 'name_where', format: 'name_format', ifUnsure: 'name_unsure' },
    },
    {
      id: 'father',
      kind: 'field',
      fieldKind: 'name',
      label: {
        en: "Father's name",
        ur: 'والد کا نام',
      },
      asks: {
        en: "Your father's name as written on the ID card.",
        ur: 'آپ کے والد کا نام، جیسا شناختی کارڈ پر لکھا ہے۔',
      },
      where: {
        en: 'On the front of the ID card, under your name.',
        ur: 'شناختی کارڈ کے سامنے والے حصے پر، آپ کے نام کے نیچے۔', // TODO(UR-review)
      },
      format: {
        en: 'Copy it exactly.',
        ur: 'بالکل ویسے ہی لکھیں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Look at the card again, or ask the helper.',
        ur: 'کارڈ دوبارہ دیکھیں، یا مددگار سے پوچھیں۔', // TODO(UR-review)
      },
      example: 'Nazir Ahmed',
      expected: (v, p) => v.trim() === p.father,
      oops: {
        consequence: {
          en: 'The name would not match the ID card.',
          ur: 'نام شناختی کارڈ سے نہیں ملے گا۔', // TODO(UR-review)
        },
        fix: {
          en: "Copy the father's name from the card, letter by letter.",
          ur: 'کارڈ سے والد کا نام ایک ایک حرف کر کے لکھیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'father_asks', where: 'father_where', format: 'father_format', ifUnsure: 'father_unsure' },
    },
    {
      id: 'dob',
      kind: 'field',
      fieldKind: 'dob',
      label: {
        en: 'Date of birth',
        ur: 'تاریخِ پیدائش',
      },
      asks: {
        en: 'Your date of birth.',
        ur: 'آپ کی تاریخِ پیدائش۔', // TODO(UR-review)
      },
      where: {
        en: 'On the front of the ID card.',
        ur: 'شناختی کارڈ کے سامنے والے حصے پر۔', // TODO(UR-review)
      },
      format: {
        en: 'Day-month-year, for example 07-03-1958.',
        ur: 'دن، مہینہ، سال۔ مثال کے طور پر 07-03-1958۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Look at the grey example and copy its shape.',
        ur: 'سرمئی مثال دیکھیں اور اسی شکل میں لکھیں۔', // TODO(UR-review)
      },
      example: '07-03-1958',
      expected: (v, p) => v.trim() === p.dob,
      oops: {
        consequence: {
          en: 'The form would not accept this date.',
          ur: 'فارم یہ تاریخ قبول نہیں کرے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Copy the shape of the grey example.',
          ur: 'سرمئی مثال کی شکل میں لکھیں۔', // TODO(UR-review)
        },
      },
      hiccup: { id: 'wrong_format', when: 'wrong' },
      audio: { asks: 'dob_asks', where: 'dob_where', format: 'dob_format', ifUnsure: 'dob_unsure' },
    },
    {
      id: 'id',
      kind: 'field',
      fieldKind: 'id_number',
      label: {
        en: 'ID card number',
        ur: 'شناختی کارڈ نمبر',
      },
      asks: {
        en: 'Your 13-digit ID card number.',
        ur: 'آپ کا 13 ہندسوں والا شناختی کارڈ نمبر۔',
      },
      where: {
        en: 'On the back of the ID card. Tap Where it is.',
        ur: 'شناختی کارڈ کی پچھلی طرف۔ "یہ کہاں ہے" پر ٹیپ کریں۔', // TODO(UR-review)
      },
      format: {
        en: 'Thirteen digits. The dashes are fine.',
        ur: 'تیرہ ہندسے۔ ڈیش لگانا ٹھیک ہے۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Copy the number one digit at a time.',
        ur: 'نمبر ایک ایک ہندسہ کر کے لکھیں۔', // TODO(UR-review)
      },
      example: '42101-1234567-1',
      expected: (v, p) => digits(v) === digits(p.idNumber),
      oops: {
        consequence: {
          en: 'The form would not find this number.',
          ur: 'فارم کو یہ نمبر نہیں ملے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Copy the number from the card, one digit at a time.',
          ur: 'کارڈ سے نمبر ایک ایک ہندسہ کر کے لکھیں۔', // TODO(UR-review)
        },
      },
      hiccup: { id: 'find_answer', when: 'enter' },
      audio: { asks: 'id_asks', where: 'id_where', format: 'id_format', ifUnsure: 'id_unsure' },
    },
    {
      id: 'phone',
      kind: 'field',
      fieldKind: 'phone',
      label: {
        en: 'Mobile number',
        ur: 'موبائل نمبر',
      },
      asks: {
        en: 'Your mobile phone number.',
        ur: 'آپ کا موبائل فون نمبر۔',
      },
      where: {
        en: 'For practice, use the number on the practice card.',
        ur: 'مشق کے لیے، مشق کارڈ پر لکھا نمبر استعمال کریں۔', // TODO(UR-review)
      },
      format: {
        en: '03XX-XXXXXXX',
        ur: '03XX-XXXXXXX',
      },
      ifUnsure: {
        en: 'Copy the shape of the grey example.',
        ur: 'سرمئی مثال کی شکل میں لکھیں۔', // TODO(UR-review)
      },
      example: '0300-1234567',
      expected: (v, p) => digits(v) === digits(p.phone),
      oops: {
        consequence: {
          en: 'The code would go to a different phone.',
          ur: 'کوڈ کسی اور فون پر چلا جائے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Copy the number from the practice card, one digit at a time.',
          ur: 'مشق کارڈ سے نمبر ایک ایک ہندسہ کر کے لکھیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'phone_asks', where: 'phone_where', format: 'phone_format', ifUnsure: 'phone_unsure' },
    },
    {
      id: 'city',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'City',
        ur: 'شہر',
      },
      asks: {
        en: 'Pick the city on the card.',
        ur: 'کارڈ پر لکھا شہر چنیں۔',
      },
      where: {
        en: 'In the address on the back of the ID card.',
        ur: 'شناختی کارڈ کی پچھلی طرف، پتے میں۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Read the address on the card again.',
        ur: 'کارڈ پر لکھا پتہ دوبارہ پڑھیں۔', // TODO(UR-review)
      },
      choices: [
        { id: 'karachi', correct: true, label: {
          en: 'Karachi',
          ur: 'کراچی',
        } },
        { id: 'lahore', label: {
          en: 'Lahore',
          ur: 'لاہور',
        } },
        { id: 'islamabad', label: {
          en: 'Islamabad',
          ur: 'اسلام آباد',
        } },
      ],
      oops: {
        consequence: {
          en: 'The card would be sent to a different city.',
          ur: 'کارڈ کسی اور شہر بھیج دیا جائے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Pick the city written on the card.',
          ur: 'کارڈ پر لکھا شہر چنیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'city_asks', where: 'city_where', format: 'city_format', ifUnsure: 'city_unsure' },
    },
    {
      id: 'domicile',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Domicile',
        ur: 'ڈومیسائل',
      },
      asks: {
        en: 'Pick your Domicile province.',
        ur: 'اپنا ڈومیسائل والا صوبہ چنیں۔',
      },
      where: {
        en: 'On the practice card, next to the word Domicile.',
        ur: 'مشق کارڈ پر، لفظ ڈومیسائل کے ساتھ۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Tap the question mark to see what Domicile means.',
        ur: 'ڈومیسائل کا مطلب دیکھنے کے لیے سوالیہ نشان پر ٹیپ کریں۔', // TODO(UR-review)
      },
      choices: [
        { id: 'sindh', correct: true, label: {
          en: 'Sindh',
          ur: 'سندھ',
        } },
        { id: 'punjab', label: {
          en: 'Punjab',
          ur: 'پنجاب',
        } },
        { id: 'kp', label: {
          en: 'KP',
          ur: 'خیبر پختونخوا', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'The form would list a different province.',
          ur: 'فارم میں کوئی اور صوبہ لکھا جائے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Pick the province written next to Domicile on the card.',
          ur: 'کارڈ پر ڈومیسائل کے ساتھ لکھا صوبہ چنیں۔', // TODO(UR-review)
        },
      },
      glossary: ['domicile'],
      hiccup: { id: 'unknown_word', when: 'enter' },
      audio: { asks: 'domicile_asks', where: 'domicile_where', format: 'domicile_format', ifUnsure: 'domicile_unsure' },
    },
    {
      id: 'session',
      kind: 'info',
      label: {
        en: 'Session',
        ur: 'سیشن',
      },
      asks: {
        en: 'Your session has expired.',
        ur: 'آپ کا سیشن ختم ہو گیا ہے۔',
      },
      ifUnsure: {
        en: 'This happens on real forms. Log in again and carry on.',
        ur: 'اصلی فارموں پر ایسا ہوتا ہے۔ دوبارہ لاگ اِن کریں اور آگے بڑھیں۔', // TODO(UR-review)
      },
      hiccup: { id: 'logged_out', when: 'enter' },
      audio: { asks: 'session_asks', ifUnsure: 'session_unsure' },
    },
    {
      id: 'photo',
      kind: 'field',
      fieldKind: 'file',
      label: {
        en: 'Photo',
        ur: 'تصویر',
      },
      asks: {
        en: 'Pick the best photo for the form.',
        ur: 'فارم کے لیے سب سے اچھی تصویر چنیں۔',
      },
      where: {
        en: 'Look at the three photos below.',
        ur: 'نیچے دی گئی تین تصویریں دیکھیں۔', // TODO(UR-review)
      },
      format: {
        en: 'Bright, sharp, all four corners visible.',
        ur: 'روشن، صاف، اور چاروں کونے نظر آئیں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Pick the one you can see most easily.',
        ur: 'وہ تصویر چنیں جو سب سے آسانی سے نظر آئے۔', // TODO(UR-review)
      },
      // photo1 is shown first and is deliberately NOT correct.
      choices: [
        { id: 'photo1', label: {
          en: 'Too dark',
          ur: 'بہت اندھیری', // TODO(UR-review)
        } },
        { id: 'photo2', label: {
          en: 'Blurry',
          ur: 'دھندلی', // TODO(UR-review)
        } },
        { id: 'photo3', correct: true, label: {
          en: 'Clear',
          ur: 'صاف', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'The form would not accept this photo.',
          ur: 'فارم یہ تصویر قبول نہیں کرے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Pick a bright, sharp photo.',
          ur: 'روشن اور صاف تصویر چنیں۔', // TODO(UR-review)
        },
      },
      hiccup: { id: 'upload_rejected', when: 'wrong' },
      audio: { asks: 'photo_asks', where: 'photo_where', format: 'photo_format', ifUnsure: 'photo_unsure' },
    },
    {
      id: 'otp',
      kind: 'field',
      fieldKind: 'code',
      label: {
        en: 'Verification code',
        ur: 'تصدیقی کوڈ',
      },
      asks: {
        en: 'Type the code from the practice SMS.',
        ur: 'مشق والے SMS میں آیا کوڈ لکھیں۔',
      },
      where: {
        en: 'In the message at the top of the screen.',
        ur: 'اسکرین کے اوپر والے پیغام میں۔', // TODO(UR-review)
      },
      format: {
        en: 'Six digits.',
        ur: 'چھ ہندسے۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Type the code only here. Never tell it to anyone who calls you.',
        ur: 'کوڈ صرف یہاں لکھیں۔ فون کرنے والے کسی شخص کو کبھی نہ بتائیں۔', // TODO(UR-review)
      },
      example: '482913', // the practice SMS code
      expected: (v) => v.trim() === '482913',
      oops: {
        consequence: {
          en: 'The form would not accept this code.',
          ur: 'فارم یہ کوڈ قبول نہیں کرے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Read the code in the message again and copy it.',
          ur: 'پیغام میں کوڈ دوبارہ پڑھیں اور ویسے ہی لکھیں۔', // TODO(UR-review)
        },
      },
      glossary: ['otp'],
      hiccup: { id: 'verification_code', when: 'enter' },
      audio: { asks: 'otp_asks', where: 'otp_where', format: 'otp_format', ifUnsure: 'otp_unsure' },
    },
    {
      id: 'review',
      kind: 'review',
      label: {
        en: 'Check your answers',
        ur: 'اپنے جوابات چیک کریں',
      },
      asks: {
        en: 'Read each answer once more, slowly.',
        ur: 'ہر جواب ایک بار پھر آرام سے پڑھیں۔',
      },
      audio: { asks: 'review_asks' },
    },
    {
      id: 'submit',
      kind: 'submit',
      label: {
        en: 'Submit',
        ur: 'جمع کرائیں',
      },
      asks: {
        en: 'When everything looks right, tap Submit.',
        ur: 'جب سب کچھ ٹھیک لگے تو "جمع کرائیں" پر ٹیپ کریں۔',
      },
      hiccup: { id: 'vague_error', when: 'submit_first' },
      audio: { asks: 'submit_asks' },
    },
  ],
};
