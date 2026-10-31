import type { KBEntry } from '../engine/types';

// Variants marked in docs/interviews.md come from our parent conversations.
export const KB: KBEntry[] = [
  // ---------- words (8) ----------
  {
    id: 'what_is_otp',
    group: 'words',
    variants: ['what is otp', 'OTP kya hai', 'otp kia hota hai', 'او ٹی پی کیا ہے', 'one time password', 'verify otp'],
    answer: {
      en: 'An OTP is a short number sent to your phone. It shows the site that it is really you. It works only once.',
      ur: 'او ٹی پی ایک چھوٹا نمبر ہے جو آپ کے فون پر آتا ہے۔ اس سے ویب سائٹ کو پتا چلتا ہے کہ یہ آپ ہی ہیں۔ یہ صرف ایک بار کام کرتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Type it only on the site you started. Never tell it to anyone who calls.',
      ur: 'اسے صرف اسی ویب سائٹ پر لکھیں جہاں آپ نے کام شروع کیا۔ فون کرنے والے کو کبھی نہ بتائیں۔', // TODO(UR-review)
    },
    audio: 'kb_what_is_otp',
    chips: ['caller_asks_code', 'what_is_verification_code'],
  },
  {
    id: 'what_is_verification_code',
    group: 'words',
    variants: ['verification code', 'code kya hai', 'tasdeeqi code', 'تصدیقی کوڈ کیا ہے', 'confirmation code', 'code aaya hai'],
    answer: {
      en: 'A verification code is a short number the site sends you. It checks that the phone is yours. It is the same idea as an OTP.',
      ur: 'تصدیقی کوڈ ایک چھوٹا نمبر ہے جو ویب سائٹ آپ کو بھیجتی ہے۔ اس سے پتا چلتا ہے کہ فون آپ کا ہے۔ یہ او ٹی پی والی ہی بات ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Copy the code from the message into the box on the same site.',
      ur: 'پیغام سے کوڈ دیکھ کر اسی ویب سائٹ کے خانے میں لکھیں۔', // TODO(UR-review)
    },
    audio: 'kb_what_is_verification_code',
    chips: ['what_is_otp', 'caller_asks_code'],
  },
  {
    id: 'what_is_domicile',
    group: 'words',
    variants: ['domicile', 'domicile kya hai', 'domisile', 'ڈومیسائل کیا ہے', 'what is domicile', 'domical'],
    answer: {
      en: 'Domicile means the province you officially belong to. It is written on a paper called a domicile certificate.',
      ur: 'ڈومیسائل کا مطلب ہے وہ صوبہ جس سے آپ سرکاری طور پر تعلق رکھتے ہیں۔ یہ ڈومیسائل سرٹیفکیٹ نامی کاغذ پر لکھا ہوتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Look at your domicile paper and pick the same province in the list.',
      ur: 'اپنا ڈومیسائل کا کاغذ دیکھیں اور فہرست میں وہی صوبہ چنیں۔', // TODO(UR-review)
    },
    audio: 'kb_what_is_domicile',
    chips: ['choice_lists'],
  },
  {
    id: 'what_is_account_title',
    group: 'words',
    variants: ['account title', 'account title kya hai', 'اکاؤنٹ ٹائٹل', 'account ka naam', 'title of account'],
    answer: {
      en: 'Account title is the name of the person the bank account belongs to. It is printed on the cheque book or bank paper.',
      ur: 'اکاؤنٹ ٹائٹل اس شخص کا نام ہے جس کا بینک اکاؤنٹ ہے۔ یہ چیک بک یا بینک کے کاغذ پر چھپا ہوتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Copy the name exactly as it is printed on the bank paper.',
      ur: 'نام بالکل ویسے ہی لکھیں جیسا بینک کے کاغذ پر چھپا ہے۔', // TODO(UR-review)
    },
    audio: 'kb_what_is_account_title',
  },
  {
    id: 'what_is_session',
    group: 'words',
    variants: ['what is session', 'session kya hai', 'سیشن کیا ہے', 'session ka matlab', 'session expired meaning'],
    answer: {
      en: 'A session is one visit to a site. After some quiet time, the site closes the visit to keep it safe.',
      ur: 'سیشن کسی ویب سائٹ پر ایک وقت کا کام ہے۔ کچھ دیر کچھ نہ ہو تو حفاظت کے لیے ویب سائٹ اسے بند کر دیتی ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Log in again. Keep your ID card ready so the second time is quicker.',
      ur: 'دوبارہ لاگ اِن کریں۔ شناختی کارڈ پاس رکھیں تاکہ دوسری بار جلدی ہو۔', // TODO(UR-review)
    },
    audio: 'kb_what_is_session',
    chips: ['session_expired', 'lost_answers'],
  },
  {
    id: 'what_is_upload',
    group: 'words',
    variants: ['what is upload', 'upload kya hai', 'upload kaise karein', 'اپ لوڈ کیا ہے', 'upload photo', 'aplod'],
    answer: {
      en: 'Upload means sending a photo or file from your phone to the site. You pick the photo and the site receives a copy.',
      ur: 'اپ لوڈ کا مطلب ہے اپنے فون سے تصویر یا فائل ویب سائٹ پر بھیجنا۔ آپ تصویر چنتے ہیں اور ویب سائٹ کو اس کی کاپی مل جاتی ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Tap the upload button, then pick the photo from your gallery.',
      ur: 'اپ لوڈ کے بٹن پر ٹیپ کریں، پھر گیلری سے تصویر چنیں۔', // TODO(UR-review)
    },
    audio: 'kb_what_is_upload',
    chips: ['photo_requirements', 'file_too_large'],
  },
  {
    id: 'what_is_link',
    group: 'words',
    variants: ['what is a link', 'link kya hai', 'لنک کیا ہے', 'blue words', 'link par click'],
    answer: {
      en: 'A link is a word or line you tap to open another page. It is often blue or underlined.',
      ur: 'لنک ایک لفظ یا لائن ہے جس پر ٹیپ کرنے سے دوسرا صفحہ کھلتا ہے۔ یہ اکثر نیلا یا نیچے لکیر والا ہوتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Only tap links on a site you opened yourself, not links sent by strangers.',
      ur: 'صرف اسی ویب سائٹ کے لنک پر ٹیپ کریں جو آپ نے خود کھولی ہو، اجنبیوں کے بھیجے لنک پر نہیں۔', // TODO(UR-review)
    },
    audio: 'kb_what_is_link',
    chips: ['message_with_link'],
  },
  {
    id: 'what_is_captcha',
    group: 'words',
    variants: ['captcha', 'captcha kya hai', 'کیپچا', 'i am not a robot', 'tedhe huroof', 'puzzle on form'],
    answer: {
      en: 'A captcha is a small puzzle. It checks that a real person is using the site. It may show bent letters or ask you to tick a box.',
      ur: 'کیپچا ایک چھوٹی سی پہیلی ہے۔ یہ دیکھتی ہے کہ ویب سائٹ کوئی اصلی انسان استعمال کر رہا ہے۔ اس میں ٹیڑھے حروف ہو سکتے ہیں یا ایک خانے پر ٹِک لگانی ہوتی ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Type the letters you see. If they are hard to read, tap the refresh arrow for new ones.',
      ur: 'جو حروف نظر آئیں وہ لکھیں۔ اگر پڑھنا مشکل ہو تو نئے حروف کے لیے گول تیر پر ٹیپ کریں۔', // TODO(UR-review)
    },
    audio: 'kb_what_is_captcha',
  },

  // ---------- fields (10) ----------
  {
    id: 'date_format',
    group: 'fields',
    variants: ['how to write date', 'date kaise likhein', 'تاریخ کیسے لکھیں', 'date of birth format', 'dd-mm-yyyy', 'tareekh paidaish'],
    answer: {
      en: 'Most forms want the day first, then the month, then the year. Look at the grey example in the box for the exact shape.',
      ur: 'اکثر فارم پہلے دن، پھر مہینہ، پھر سال مانگتے ہیں۔ صحیح شکل کے لیے خانے میں لکھی سرمئی مثال دیکھیں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Copy the shape of the grey example, for example 07-03-1958.',
      ur: 'سرمئی مثال کی شکل میں لکھیے، جیسے 07-03-1958۔', // TODO(UR-review)
    },
    audio: 'kb_date_format',
    chips: ['wrong_format'],
  },
  {
    id: 'id_number_format',
    group: 'fields',
    variants: ['id card number', 'cnic number kaise likhein', 'شناختی کارڈ نمبر', 'dash lagana hai', 'id number format', '13 digit'],
    answer: {
      en: 'The ID card number has 13 digits. Some forms want dashes and some do not. The grey example shows which.',
      ur: 'شناختی کارڈ نمبر میں 13 ہندسے ہوتے ہیں۔ کچھ فارم ڈیش مانگتے ہیں اور کچھ نہیں۔ سرمئی مثال سے پتا چلتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Copy the number from the card one digit at a time, then read it back.',
      ur: 'کارڈ سے نمبر ایک ایک ہندسہ کر کے لکھیں، پھر دوبارہ پڑھ لیں۔', // TODO(UR-review)
    },
    audio: 'kb_id_number_format',
  },
  {
    id: 'phone_number',
    group: 'fields',
    variants: ['phone number', 'mobile number kaise likhein', 'موبائل نمبر', '03 se shuru', 'phone format', 'number with +92'],
    answer: {
      en: 'Write your mobile number starting with 03. It has 11 digits. If the form already shows +92, leave out the first 0.',
      ur: 'اپنا موبائل نمبر 03 سے شروع کر کے لکھیں۔ اس میں 11 ہندسے ہوتے ہیں۔ اگر فارم میں پہلے سے +92 لکھا ہو تو شروع کا 0 نہ لکھیں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Copy the shape of the grey example in the box.',
      ur: 'خانے میں لکھی سرمئی مثال کی شکل میں لکھیے۔', // TODO(UR-review)
    },
    audio: 'kb_phone_number',
  },
  {
    id: 'name_as_on_id',
    group: 'fields',
    variants: ['name as on cnic', 'naam kaise likhein', 'نام کیسے لکھیں', 'full name', 'spelling of name', 'naam card jaisa'],
    answer: {
      en: 'Write the name exactly as it is on the ID card. The same spelling and the same order.',
      ur: 'نام بالکل ویسے ہی لکھیں جیسا شناختی کارڈ پر ہے۔ وہی ہجے اور وہی ترتیب۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Hold the card next to the phone and copy it letter by letter.',
      ur: 'کارڈ فون کے ساتھ رکھیں اور ایک ایک حرف کر کے لکھیں۔', // TODO(UR-review)
    },
    audio: 'kb_name_as_on_id',
  },
  {
    id: 'address_parts',
    group: 'fields',
    variants: ['address kaise likhein', 'پتہ کیسے لکھیں', 'address lines', 'house number street', 'pata', 'address format'],
    answer: {
      en: 'An address usually has the house number, street, area and city. Some forms give a separate box for each part.',
      ur: 'پتے میں عام طور پر مکان نمبر، گلی، علاقہ اور شہر ہوتا ہے۔ کچھ فارموں میں ہر حصے کا الگ خانہ ہوتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Copy the address from the back of your ID card, one part per box.',
      ur: 'شناختی کارڈ کی پچھلی طرف سے پتہ دیکھیں اور ہر خانے میں ایک حصہ لکھیں۔', // TODO(UR-review)
    },
    audio: 'kb_address_parts',
  },
  {
    id: 'choice_lists',
    group: 'fields',
    variants: ['dropdown', 'list se chunna', 'فہرست سے چنیں', 'select option', 'arrow wala box', 'choose from list'],
    answer: {
      en: 'Some boxes have a small arrow. Tapping it opens a list. You pick one answer from the list.',
      ur: 'کچھ خانوں میں ایک چھوٹا تیر ہوتا ہے۔ اس پر ٹیپ کرنے سے فہرست کھلتی ہے۔ آپ فہرست سے ایک جواب چنتے ہیں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Tap the arrow, scroll slowly, and tap your answer.',
      ur: 'تیر پر ٹیپ کریں، آہستہ سے اسکرول کریں، اور اپنے جواب پر ٹیپ کریں۔', // TODO(UR-review)
    },
    audio: 'kb_choice_lists',
  },
  {
    id: 'photo_requirements',
    group: 'fields',
    variants: ['photo kaisi ho', 'تصویر کیسی ہو', 'photo requirements', 'picture size', 'photo upload rules', 'tasveer'],
    answer: {
      en: 'Forms want a bright, sharp photo. The paper should be flat and all four corners should show.',
      ur: 'فارم روشن اور صاف تصویر مانگتے ہیں۔ کاغذ سیدھا ہو اور چاروں کونے نظر آئیں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Take the photo near a window in daylight, holding the phone straight above.',
      ur: 'دن کی روشنی میں کھڑکی کے پاس، فون کو سیدھا اوپر رکھ کر تصویر لیں۔', // TODO(UR-review)
    },
    audio: 'kb_photo_requirements',
    chips: ['photo_unclear', 'file_too_large'],
  },
  {
    id: 'required_optional',
    group: 'fields',
    variants: ['star wala box', 'required field', 'ضروری خانہ', 'optional kya hai', 'red star', 'zaroori hai'],
    answer: {
      en: 'A small star next to a box usually means it is required. Boxes marked optional can be left empty.',
      ur: 'خانے کے ساتھ چھوٹا سا ستارہ عام طور پر بتاتا ہے کہ یہ ضروری ہے۔ جن خانوں پر اختیاری لکھا ہو، انہیں خالی چھوڑا جا سکتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Fill the starred boxes first. Leave the optional ones if you are unsure.',
      ur: 'پہلے ستارے والے خانے بھریں۔ اگر یقین نہ ہو تو اختیاری خانے چھوڑ دیں۔', // TODO(UR-review)
    },
    audio: 'kb_required_optional',
  },
  {
    id: 'if_unsure',
    group: 'fields',
    variants: ['not sure what to write', 'samajh nahi aa raha', 'سمجھ نہیں آ رہا', 'kya likhun', 'confused', 'pata nahi'],
    answer: {
      en: 'That is normal. Read the words above the box once more. They usually say what the box wants.',
      ur: 'یہ بالکل عام بات ہے۔ خانے کے اوپر لکھے الفاظ ایک بار پھر پڑھیں۔ عام طور پر وہ بتاتے ہیں کہ خانہ کیا مانگ رہا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Tap the question mark next to any word you do not know.',
      ur: 'جو لفظ سمجھ نہ آئے اس کے ساتھ والے سوالیہ نشان پر ٹیپ کریں۔', // TODO(UR-review)
    },
    audio: 'kb_if_unsure',
    chips: ['where_to_find', 'okay_to_ask'],
  },
  {
    id: 'where_to_find',
    group: 'fields',
    variants: ['where do i find this', 'yeh kahan milega', 'یہ کہاں ملے گا', 'where is this number', 'kahan likha hai'],
    answer: {
      en: 'Most answers are on your ID card, front or back. Others are on a bill or a bank paper.',
      ur: 'زیادہ تر جواب آپ کے شناختی کارڈ پر ہوتے ہیں، آگے یا پیچھے۔ کچھ کسی بل یا بینک کے کاغذ پر ہوتے ہیں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Turn the ID card over and look for the same word as the box.',
      ur: 'شناختی کارڈ پلٹیں اور خانے والا لفظ ڈھونڈیں۔', // TODO(UR-review)
    },
    audio: 'kb_where_to_find',
  },

  // ---------- errors (8) ----------
  {
    id: 'red_message',
    group: 'errors',
    variants: ['red message', 'laal likha aa gaya', 'سرخ پیغام', 'error aa gaya', 'error message', 'ghalti aa gayi'],
    answer: {
      en: 'A red message is the form pointing to a box that needs a change. Nothing is broken.',
      ur: 'سرخ پیغام کا مطلب ہے کہ فارم کسی خانے کی طرف اشارہ کر رہا ہے جس میں تبدیلی چاہیے۔ کچھ خراب نہیں ہوا۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Read the red words slowly, then look at the box just above or below them.',
      ur: 'سرخ الفاظ آہستہ سے پڑھیں، پھر ان کے بالکل اوپر یا نیچے والا خانہ دیکھیں۔', // TODO(UR-review)
    },
    audio: 'kb_red_message',
    chips: ['field_highlighted', 'did_i_break_it'],
  },
  {
    id: 'wrong_format',
    group: 'errors',
    variants: ['invalid format', 'format galat', 'غلط فارمیٹ', 'not accepted', 'invalid', 'qubool nahi'],
    answer: {
      en: 'The box wants the answer in a certain shape. The words are fine; only the shape needs to match.',
      ur: 'خانہ جواب ایک خاص شکل میں چاہتا ہے۔ جواب ٹھیک ہے، بس شکل ملانی ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Copy the shape of the grey example, including dashes or slashes.',
      ur: 'سرمئی مثال کی شکل میں لکھیے، ڈیش یا ترچھی لکیر سمیت۔', // TODO(UR-review)
    },
    audio: 'kb_wrong_format',
    chips: ['date_format'],
  },
  {
    id: 'field_highlighted',
    group: 'errors',
    variants: ['box turned red', 'khana laal ho gaya', 'خانہ لال ہو گیا', 'highlighted box', 'box border red'],
    answer: {
      en: 'A coloured border shows which box the form wants you to look at again.',
      ur: 'رنگین کنارہ بتاتا ہے کہ فارم کس خانے کو دوبارہ دیکھنے کا کہہ رہا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Tap that box, read its label again, and check the answer against your card.',
      ur: 'اس خانے پر ٹیپ کریں، اس کا نام دوبارہ پڑھیں، اور جواب کارڈ سے ملا لیں۔', // TODO(UR-review)
    },
    audio: 'kb_field_highlighted',
  },
  {
    id: 'will_not_submit',
    group: 'errors',
    variants: ['form not submitting', 'submit nahi ho raha', 'جمع نہیں ہو رہا', 'button not working', 'aagay nahi ja raha'],
    answer: {
      en: 'Usually one box is still empty or needs a change. The form waits until every required box is ready.',
      ur: 'عام طور پر کوئی ایک خانہ ابھی خالی ہوتا ہے یا اس میں تبدیلی چاہیے۔ فارم تب تک انتظار کرتا ہے جب تک ہر ضروری خانہ تیار نہ ہو۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Scroll up slowly from the top and look for an empty or coloured box.',
      ur: 'اوپر سے آہستہ آہستہ نیچے اسکرول کریں اور خالی یا رنگین خانہ ڈھونڈیں۔', // TODO(UR-review)
    },
    audio: 'kb_will_not_submit',
    chips: ['required_optional', 'red_message'],
  },
  {
    id: 'page_stuck',
    group: 'errors',
    variants: ['page stuck', 'loading ho raha hai', 'صفحہ رک گیا', 'circle ghoom raha hai', 'page not opening', 'hang ho gaya'],
    answer: {
      en: 'Sometimes the site is slow. The spinning circle means it is still working.',
      ur: 'کبھی کبھی ویب سائٹ آہستہ چلتی ہے۔ گھومتا دائرہ بتاتا ہے کہ کام ابھی جاری ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Wait one minute without tapping. If it is still stuck, check your internet and try again.',
      ur: 'ایک منٹ بغیر ٹیپ کیے انتظار کریں۔ اگر پھر بھی رکا ہو تو انٹرنیٹ دیکھیں اور دوبارہ کوشش کریں۔', // TODO(UR-review)
    },
    audio: 'kb_page_stuck',
    chips: ['try_later'],
  },
  {
    id: 'file_too_large',
    group: 'errors',
    variants: ['file too large', 'file bari hai', 'فائل بڑی ہے', 'size limit', 'photo size zyada', 'max size'],
    answer: {
      en: 'The form has a size limit for photos. A photo from a phone camera can be bigger than that.',
      ur: 'فارم میں تصویر کے سائز کی ایک حد ہوتی ہے۔ فون کیمرے کی تصویر اس سے بڑی ہو سکتی ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Take a screenshot of the photo and upload the screenshot instead. It is usually smaller.',
      ur: 'تصویر کا اسکرین شاٹ لیں اور وہ اپ لوڈ کریں۔ وہ عام طور پر چھوٹا ہوتا ہے۔', // TODO(UR-review)
    },
    audio: 'kb_file_too_large',
  },
  {
    id: 'photo_unclear',
    group: 'errors',
    variants: ['photo rejected', 'photo saaf nahi', 'تصویر صاف نہیں', 'blurry photo', 'photo not accepted', 'dhundli tasveer'],
    answer: {
      en: 'The form could not read the photo. This often happens with dim light or a shaky hand.',
      ur: 'فارم تصویر پڑھ نہیں سکا۔ اکثر کم روشنی یا ہلتے ہاتھ کی وجہ سے ایسا ہوتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Retake it in daylight, flat on a table, with all four corners visible.',
      ur: 'دن کی روشنی میں، میز پر سیدھا رکھ کر، چاروں کونے دکھاتے ہوئے دوبارہ تصویر لیں۔', // TODO(UR-review)
    },
    audio: 'kb_photo_unclear',
    chips: ['photo_requirements'],
  },
  {
    id: 'try_later',
    group: 'errors',
    variants: ['try again later', 'baad mein koshish', 'بعد میں کوشش کریں', 'service unavailable', 'server busy', 'system down'],
    answer: {
      en: 'This message is about the site, not about you. Many people are using it at the same time.',
      ur: 'یہ پیغام ویب سائٹ کے بارے میں ہے، آپ کے بارے میں نہیں۔ بہت سے لوگ ایک ہی وقت میں اسے استعمال کر رہے ہیں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Write down where you stopped and try again in an hour.',
      ur: 'لکھ لیں کہ کہاں رکے تھے اور ایک گھنٹے بعد دوبارہ کوشش کریں۔', // TODO(UR-review)
    },
    audio: 'kb_try_later',
  },

  // ---------- logged_out (4) ----------
  {
    id: 'session_expired',
    group: 'logged_out',
    variants: ['session expired', 'session khatam', 'سیشن ختم ہو گیا', 'logged out', 'bahar nikal diya', 'dobara login'],
    answer: {
      en: 'The site closed the visit after some quiet time. This is a safety step and happens to everyone.',
      ur: 'کچھ دیر کام نہ ہونے پر ویب سائٹ نے کام بند کر دیا۔ یہ حفاظت کے لیے ہے اور سب کے ساتھ ہوتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Log in again and fill the boxes from your card. The second time is faster.',
      ur: 'دوبارہ لاگ اِن کریں اور کارڈ سے دیکھ کر خانے بھریں۔ دوسری بار جلدی ہوتا ہے۔', // TODO(UR-review)
    },
    audio: 'kb_session_expired',
    chips: ['lost_answers', 'forgot_password'],
  },
  {
    id: 'forgot_password',
    group: 'logged_out',
    variants: ['forgot password', 'password bhool gaya', 'پاس ورڈ بھول گیا', 'password yaad nahi', 'reset password'],
    answer: {
      en: 'Most sites have a link that says Forgot password. It sends a new way to log in to your own phone or email.',
      ur: 'زیادہ تر ویب سائٹوں پر "پاس ورڈ بھول گئے" کا لنک ہوتا ہے۔ یہ لاگ اِن کا نیا طریقہ آپ کے اپنے فون یا ای میل پر بھیجتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Tap Forgot password under the login box and follow the steps on the screen.',
      ur: 'لاگ اِن خانے کے نیچے "پاس ورڈ بھول گئے" پر ٹیپ کریں اور اسکرین پر دیے گئے مراحل پر عمل کریں۔', // TODO(UR-review)
    },
    audio: 'kb_forgot_password',
  },
  {
    id: 'locked_account',
    group: 'logged_out',
    variants: ['account locked', 'account band ho gaya', 'اکاؤنٹ بند ہو گیا', 'too many attempts', 'blocked after tries'],
    answer: {
      en: 'After a few wrong tries, some sites pause the account for a while. This protects it. Your account is still there.',
      ur: 'چند غلط کوششوں کے بعد کچھ ویب سائٹیں اکاؤنٹ کو کچھ دیر کے لیے روک دیتی ہیں۔ یہ حفاظت کے لیے ہے۔ آپ کا اکاؤنٹ موجود ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Wait the time shown on the screen, then use Forgot password.',
      ur: 'اسکرین پر لکھا وقت انتظار کریں، پھر "پاس ورڈ بھول گئے" استعمال کریں۔', // TODO(UR-review)
    },
    audio: 'kb_locked_account',
    chips: ['forgot_password'],
  },
  {
    id: 'lost_answers',
    group: 'logged_out',
    variants: ['lost my answers', 'sab mit gaya', 'سب مٹ گیا', 'form empty again', 'dobara bharna parega', 'data gone'],
    answer: {
      en: 'Some real forms do not keep answers after a logout. It feels annoying, but nothing is wrong.',
      ur: 'کچھ اصلی فارم لاگ آؤٹ کے بعد جوابات نہیں رکھتے۔ یہ پریشان کن لگتا ہے، مگر کچھ غلط نہیں ہوا۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Before you start a form, write your answers on paper. Then refilling is quick.',
      ur: 'فارم شروع کرنے سے پہلے اپنے جوابات کاغذ پر لکھ لیں۔ پھر دوبارہ بھرنا جلدی ہو جاتا ہے۔', // TODO(UR-review)
    },
    audio: 'kb_lost_answers',
  },

  // ---------- safety (6) ----------
  {
    id: 'caller_asks_code',
    group: 'safety',
    variants: ['someone called for code', 'call pe code manga', 'کال پر کوڈ مانگا', 'bank wale ne code manga', 'should i tell the code', 'otp batana hai'],
    answer: {
      en: 'Real banks and offices never ask for your code on a call. The code is only for the site you are using. Hang up and call the official number on your card.',
      ur: 'اصلی بینک اور دفاتر کبھی فون پر آپ کا کوڈ نہیں مانگتے۔ کوڈ صرف اسی ویب سائٹ کے لیے ہے جو آپ استعمال کر رہے ہیں۔ فون بند کریں اور اپنے کارڈ پر لکھے سرکاری نمبر پر فون کریں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'End the call politely, then dial the number on your card yourself.',
      ur: 'آرام سے کال ختم کریں، پھر کارڈ پر لکھا نمبر خود ملائیں۔', // TODO(UR-review)
    },
    audio: 'kb_caller_asks_code',
    chips: ['already_shared', 'check_if_real'],
  },
  {
    id: 'message_with_link',
    group: 'safety',
    variants: ['message with link', 'sms mein link', 'پیغام میں لنک', 'should i click link', 'link aaya hai', 'unknown link'],
    answer: {
      en: 'A link in a message from an unknown number can open a fake page. You do not need to tap it. Hang up and call the official number on your card.',
      ur: 'انجان نمبر سے آئے پیغام کا لنک نقلی صفحہ کھول سکتا ہے۔ آپ کو اس پر ٹیپ کرنے کی ضرورت نہیں۔ فون بند کریں اور اپنے کارڈ پر لکھے سرکاری نمبر پر فون کریں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Leave the link alone. Open the official app or call the number on your card instead.',
      ur: 'لنک کو مت چھیڑیں۔ اس کے بجائے سرکاری ایپ کھولیں یا کارڈ پر لکھا نمبر ملائیں۔', // TODO(UR-review)
    },
    audio: 'kb_message_with_link',
    chips: ['check_if_real'],
  },
  {
    id: 'prize_message',
    group: 'safety',
    variants: ['i won a prize', 'inaam nikla hai', 'انعام نکلا ہے', 'lucky draw message', 'won 50,000 rupees but need to pay a tax fee first', 'jeet gaye'],
    answer: {
      en: 'A prize message for something you never entered is a trick. Real prizes do not ask for codes or fees. Hang up and call the official number on your card.',
      ur: 'ایسے انعام کا پیغام جس میں آپ نے حصہ ہی نہیں لیا، ایک چال ہے۔ اصلی انعام کوڈ یا فیس نہیں مانگتے۔ فون بند کریں اور اپنے کارڈ پر لکھے سرکاری نمبر پر فون کریں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Do not reply. You can delete the message.',
      ur: 'جواب نہ دیں۔ آپ پیغام مٹا سکتے ہیں۔', // TODO(UR-review)
    },
    audio: 'kb_prize_message',
  },
  {
    id: 'account_blocked',
    group: 'safety',
    variants: ['account will be blocked', 'account band ho jayega', 'اکاؤنٹ بند ہو جائے گا', 'sim card will be blocked in 24 hours press 1 and verify cnic', 'urgent verify', 'jaldi karein warna'],
    answer: {
      en: 'Messages that rush you are a common trick. Real offices give you time and never ask for a code. Hang up and call the official number on your card.',
      ur: 'جلدی کروانے والے پیغامات ایک عام چال ہیں۔ اصلی دفاتر وقت دیتے ہیں اور کبھی کوڈ نہیں مانگتے۔ فون بند کریں اور اپنے کارڈ پر لکھے سرکاری نمبر پر فون کریں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Take a moment. Ask someone you trust before doing anything.',
      ur: 'ذرا رکیں۔ کچھ بھی کرنے سے پہلے کسی بھروسے والے شخص سے پوچھیں۔', // TODO(UR-review)
    },
    audio: 'kb_account_blocked',
    chips: ['check_if_real'],
  },
  {
    id: 'check_if_real',
    group: 'safety',
    variants: ['is this real', 'kya yeh asli hai', 'کیا یہ اصلی ہے', 'how to check', 'check if it was real', 'sach hai ya jhoot'],
    answer: {
      en: 'Do not use the number in the message or call. Use the number printed on your card or bill. Hang up and call the official number on your card.',
      ur: 'پیغام یا کال والا نمبر استعمال نہ کریں۔ اپنے کارڈ یا بل پر چھپا نمبر استعمال کریں۔ فون بند کریں اور اپنے کارڈ پر لکھے سرکاری نمبر پر فون کریں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Find the number on the back of your bank card or bill and call it yourself.',
      ur: 'بینک کارڈ یا بل کی پچھلی طرف نمبر ڈھونڈیں اور خود فون کریں۔', // TODO(UR-review)
    },
    audio: 'kb_check_if_real',
  },
  {
    id: 'already_shared',
    group: 'safety',
    variants: ['i already told the code', 'code bata diya', 'کوڈ بتا دیا', 'i shared my pin', 'ghalti se bata diya', 'what now'],
    answer: {
      en: 'It is good that you are asking. Acting quickly helps, and the bank can often stop it. Hang up and call the official number on your card.',
      ur: 'اچھا کیا کہ آپ پوچھ رہے ہیں۔ جلدی قدم اٹھانے سے مدد ملتی ہے، اور بینک اکثر اسے روک سکتا ہے۔ فون بند کریں اور اپنے کارڈ پر لکھے سرکاری نمبر پر فون کریں۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Call the number on your card now and say a code was shared. Then tell someone you trust.',
      ur: 'ابھی کارڈ پر لکھے نمبر پر فون کریں اور بتائیں کہ کوڈ بتا دیا گیا تھا۔ پھر کسی بھروسے والے شخص کو بتائیں۔', // TODO(UR-review)
    },
    audio: 'kb_already_shared',
  },

  // ---------- reassurance (4) ----------
  {
    id: 'did_i_break_it',
    group: 'reassurance',
    variants: ['did i break it', 'kuch kharab to nahi hua', 'کچھ خراب تو نہیں ہوا', 'tap the wrong option and money will transfer out', 'ghalat daba diya', 'ruin the phone setup'],
    answer: {
      en: 'No. A form cannot be broken by a wrong tap. At most, it asks you to change a box.',
      ur: 'نہیں۔ غلط ٹیپ سے فارم خراب نہیں ہوتا۔ زیادہ سے زیادہ وہ کسی خانے میں تبدیلی کا کہتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Read what is on the screen now, slowly, and do the next small step.',
      ur: 'اسکرین پر جو لکھا ہے آہستہ سے پڑھیں، اور اگلا چھوٹا قدم اٹھائیں۔', // TODO(UR-review)
    },
    audio: 'kb_did_i_break_it',
  },
  {
    id: 'can_i_undo',
    group: 'reassurance',
    variants: ['can i undo', 'wapas kar sakte hain', 'واپس کر سکتے ہیں', 'go back', 'change answer', 'peeche jana'],
    answer: {
      en: 'Yes, until you press Submit you can change any answer. Many forms also have a Back link.',
      ur: 'جی ہاں، "جمع کرائیں" دبانے سے پہلے آپ کوئی بھی جواب بدل سکتے ہیں۔ بہت سے فارموں میں "واپس" کا لنک بھی ہوتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: "Use the form's own Back link, or tap the box and type again.",
      ur: 'فارم کا اپنا "واپس" لنک استعمال کریں، یا خانے پر ٹیپ کر کے دوبارہ لکھیں۔', // TODO(UR-review)
    },
    audio: 'kb_can_i_undo',
  },
  {
    id: 'okay_to_ask',
    group: 'reassurance',
    variants: ['is it okay to ask', 'poochna theek hai', 'پوچھنا ٹھیک ہے', 'feel silly', 'sharam aati hai', 'bar bar poochna'],
    answer: {
      en: 'Yes. Everyone learns by asking. Asking is what careful people do.',
      ur: 'جی ہاں۔ ہر کوئی پوچھ کر ہی سیکھتا ہے۔ پوچھنا سمجھداری کی بات ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Ask someone to sit beside you while you tap, so you still do it yourself.',
      ur: 'کسی سے کہیں کہ آپ کے ساتھ بیٹھے، اور ٹیپ آپ خود کریں۔', // TODO(UR-review)
    },
    audio: 'kb_okay_to_ask',
  },
  {
    id: 'can_i_try_again',
    group: 'reassurance',
    variants: ['can i try again', 'dobara kar sakte hain', 'دوبارہ کر سکتے ہیں', 'start over', 'phir se', 'one more time'],
    answer: {
      en: 'Yes, as many times as you like. Practice is how it becomes easy.',
      ur: 'جی ہاں، جتنی بار آپ چاہیں۔ مشق سے ہی یہ آسان ہوتا ہے۔', // TODO(UR-review)
    },
    tryNext: {
      en: 'Tap Practise again at the end of the lesson.',
      ur: 'سبق کے آخر میں "دوبارہ مشق کریں" پر ٹیپ کریں۔', // TODO(UR-review)
    },
    audio: 'kb_can_i_try_again',
  },
];
