import type { GlossaryTerm } from '../engine/types';

// Patterns are matched case-insensitive against English and Urdu spellings.
// The first entries are words from our parent conversations (docs/interviews.md).
// "Verify OTP" and "Software Update" from the conversations are covered by `otp` and `update` below.
export const GLOSSARY: GlossaryTerm[] = [
  {
    id: 'storage_full',
    audio: 'g_storage_full',
    pattern: '\\bstorage( (is )?full)?\\b|اسٹوریج|سٹوریج',
    term: { en: 'Storage full', ur: 'اسٹوریج بھر گئی' },
    plain: {
      en: 'Your phone has no space left for new photos or apps.',
      ur: 'آپ کے فون میں نئی تصویروں یا ایپس کے لیے جگہ نہیں بچی۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a full cupboard. To put something in, you first take something out.',
      ur: 'بھری ہوئی الماری جیسا۔ کچھ رکھنے کے لیے پہلے کچھ نکالنا پڑتا ہے۔', // TODO(UR-review)
    },
  },
  {
    id: 'sync',
    audio: 'g_sync',
    pattern: '\\bsync(ing|ed)?\\b|سنک|سنکنگ',
    term: { en: 'Sync', ur: 'سنک' },
    plain: {
      en: 'Keeping the same copy of your things on the phone and in your account.',
      ur: 'اپنی چیزوں کی ایک جیسی کاپی فون پر اور اپنے اکاؤنٹ میں رکھنا۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like two copies of a family album that always match, one at home and one with a relative.',
      ur: 'خاندانی البم کی دو کاپیوں جیسا جو ہمیشہ ایک جیسی رہیں، ایک گھر میں اور ایک کسی رشتہ دار کے پاس۔', // TODO(UR-review)
    },
  },
  {
    id: 'cloud',
    audio: 'g_cloud',
    pattern: '\\bcloud\\b|کلاؤڈ',
    term: { en: 'Cloud', ur: 'کلاؤڈ' },
    plain: {
      en: 'Space on the internet where a spare copy of your photos or files is kept.',
      ur: 'انٹرنیٹ پر ایک جگہ جہاں آپ کی تصویروں یا فائلوں کی ایک اضافی کاپی رکھی جاتی ہے۔', // TODO(UR-review)
    },
    analogy: {
      en: "Like keeping a spare copy of your papers safe at a relative's house.",
      ur: 'جیسے اپنے کاغذات کی ایک اضافی کاپی کسی رشتہ دار کے گھر محفوظ رکھنا۔', // TODO(UR-review)
    },
  },
  {
    id: 'menu',
    audio: 'g_menu',
    pattern: '\\bmenu\\b|\\bthree dots\\b|\\bhamburger\\b|مینیو|مینو',
    term: { en: 'Menu (three dots or three lines)', ur: 'مینیو (تین نقطے یا تین لکیریں)' },
    plain: {
      en: 'A small button with three dots or three lines. Tapping it shows more options.',
      ur: 'تین نقطوں یا تین لکیروں والا چھوٹا بٹن۔ اس پر ٹیپ کرنے سے مزید اختیارات نظر آتے ہیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a drawer. The extra things are inside; you open it to see them.',
      ur: 'دراز جیسا۔ باقی چیزیں اندر ہوتی ہیں، دیکھنے کے لیے اسے کھولنا پڑتا ہے۔', // TODO(UR-review)
    },
  },
  {
    id: 'cache',
    audio: 'g_cache',
    pattern: '\\b(clear )?cache\\b|کیشے',
    term: { en: 'Cache', ur: 'کیشے' },
    plain: {
      en: 'Small spare copies an app keeps so it opens faster. Clearing it does not delete your photos.',
      ur: 'چھوٹی اضافی کاپیاں جو ایپ جلدی کھلنے کے لیے رکھتی ہے۔ اسے صاف کرنے سے آپ کی تصویریں نہیں مٹتیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like scrap paper on a desk. Throwing it away does not touch your important papers.',
      ur: 'میز پر پڑے رف کاغذ جیسا۔ اسے پھینکنے سے آپ کے ضروری کاغذات کو کچھ نہیں ہوتا۔', // TODO(UR-review)
    },
  },
  {
    id: 'allow_access',
    audio: 'g_allow_access',
    pattern: '\\ballow access\\b|\\bpermissions?\\b|اجازت',
    term: { en: 'Allow access', ur: 'اجازت دیں' },
    plain: {
      en: 'The phone asking if an app may use something, like the camera, contacts or location.',
      ur: 'فون پوچھ رہا ہے کہ کیا یہ ایپ کوئی چیز استعمال کر سکتی ہے، جیسے کیمرہ، رابطے یا مقام۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a guest asking to enter a room. If they do not need that room, you can say no.',
      ur: 'جیسے مہمان کسی کمرے میں جانے کی اجازت مانگے۔ اگر اسے اس کمرے کی ضرورت نہیں تو آپ منع کر سکتے ہیں۔', // TODO(UR-review)
    },
  },
  {
    id: 'settings',
    audio: 'g_settings',
    pattern: '\\bsettings?\\b|\\bgear icon\\b|سیٹنگز|سیٹنگ|ترتیبات',
    term: { en: 'Settings (gear icon)', ur: 'سیٹنگز (پہیے کا نشان)' },
    plain: {
      en: 'The place where you change how the phone works. Its sign is a small wheel with teeth.',
      ur: 'وہ جگہ جہاں فون کے کام کرنے کا طریقہ بدلا جاتا ہے۔ اس کا نشان دانتوں والا چھوٹا پہیہ ہے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the knobs on a radio. They change how it works, not what is stored in it.',
      ur: 'ریڈیو کے بٹنوں جیسا۔ یہ اس کے کام کرنے کا طریقہ بدلتے ہیں، اس میں رکھی چیزیں نہیں۔', // TODO(UR-review)
    },
  },
  {
    id: 'otp',
    audio: 'g_otp',
    pattern: '\\bOTP\\b|او ٹی پی',
    term: { en: 'OTP', ur: 'او ٹی پی' },
    plain: {
      en: 'A short number sent to your phone to show it is really you.',
      ur: 'ایک چھوٹا سا نمبر جو آپ کے فون پر آتا ہے تاکہ پتا چلے کہ یہ واقعی آپ ہیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'It is like the key to your locker. The bank never asks you to hand it over.',
      ur: 'یہ آپ کے لاکر کی چابی جیسا ہے۔ بینک کبھی آپ سے یہ چابی نہیں مانگتا۔', // TODO(UR-review)
    },
  },
  {
    id: 'pin',
    audio: 'g_pin',
    pattern: '\\bPIN\\b|پن کوڈ|پِن',
    term: { en: 'PIN', ur: 'پن کوڈ' },
    plain: {
      en: 'A secret number that only you know, for your card or account.',
      ur: 'ایک خفیہ نمبر جو صرف آپ جانتے ہیں، آپ کے کارڈ یا اکاؤنٹ کے لیے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the number on a cupboard lock. You keep it in your head, not on paper.',
      ur: 'الماری کے تالے کے نمبر جیسا۔ اسے یاد رکھیں، کاغذ پر نہ لکھیں۔', // TODO(UR-review)
    },
  },
  {
    id: 'cnic',
    audio: 'g_cnic',
    pattern: '\\bCNIC\\b|شناختی کارڈ|\\bID card\\b',
    term: { en: 'CNIC', ur: 'شناختی کارڈ' },
    plain: {
      en: 'Your national identity card, and the 13-digit number on it.',
      ur: 'آپ کا قومی شناختی کارڈ، اور اس پر لکھا 13 ہندسوں کا نمبر۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the name plate on your door. It tells people who you are.',
      ur: 'دروازے پر لگی نام کی تختی جیسا۔ یہ بتاتا ہے کہ آپ کون ہیں۔', // TODO(UR-review)
    },
  },
  {
    id: 'domicile',
    audio: 'g_domicile',
    pattern: '\\bdomicile\\b|ڈومیسائل|ڈومیسال',
    term: { en: 'Domicile', ur: 'ڈومیسائل' },
    plain: {
      en: 'A paper that says which province you officially belong to.',
      ur: 'ایک کاغذ جو بتاتا ہے کہ آپ سرکاری طور پر کس صوبے سے ہیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like saying which town your family is from, but written on an official paper.',
      ur: 'جیسے بتانا کہ آپ کا خاندان کس شہر سے ہے، مگر سرکاری کاغذ پر لکھا ہوا۔', // TODO(UR-review)
    },
  },
  {
    id: 'account_title',
    audio: 'g_account_title',
    pattern: '\\baccount title\\b|اکاؤنٹ ٹائٹل|اکاؤنٹ کا نام',
    term: { en: 'Account title', ur: 'اکاؤنٹ ٹائٹل' },
    plain: {
      en: 'The name of the person the bank account belongs to.',
      ur: 'اس شخص کا نام جس کا بینک اکاؤنٹ ہے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the name on an envelope. It shows who the letter is for.',
      ur: 'لفافے پر لکھے نام جیسا۔ اس سے پتا چلتا ہے کہ خط کس کے لیے ہے۔', // TODO(UR-review)
    },
  },
  {
    id: 'beneficiary',
    audio: 'g_beneficiary',
    pattern: '\\bbeneficiary\\b|بینیفیشری|وصول کنندہ',
    term: { en: 'Beneficiary', ur: 'وصول کنندہ' },
    plain: {
      en: 'The person who receives the money.',
      ur: 'وہ شخص جسے پیسے ملتے ہیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the person you hand a gift to.',
      ur: 'اس شخص کی طرح جسے آپ تحفہ دیتے ہیں۔', // TODO(UR-review)
    },
  },
  {
    id: 'verification_code',
    audio: 'g_verification_code',
    pattern: '\\bverification code\\b|تصدیقی کوڈ',
    term: { en: 'Verification code', ur: 'تصدیقی کوڈ' },
    plain: {
      en: 'A short number the site sends to your phone to check it is really you.',
      ur: 'ایک چھوٹا نمبر جو ویب سائٹ آپ کے فون پر بھیجتی ہے تاکہ پتا چلے کہ یہ آپ ہی ہیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a secret word at the gate. Only you and the gatekeeper should know it.',
      ur: 'دروازے پر بولے جانے والے خفیہ لفظ جیسا۔ اسے صرف آپ اور چوکیدار جانیں۔', // TODO(UR-review)
    },
  },
  {
    id: 'session_expired',
    audio: 'g_session_expired',
    pattern: '\\bsession (has )?expired\\b|سیشن ختم',
    term: { en: 'Session expired', ur: 'سیشن ختم' },
    plain: {
      en: 'The site closed your visit because some time passed.',
      ur: 'کچھ وقت گزرنے کی وجہ سے ویب سائٹ نے آپ کا کام بند کر دیا۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a shop closing its door at lunchtime. You knock again and go back in.',
      ur: 'جیسے دکان دوپہر کو دروازہ بند کر دے۔ آپ دوبارہ دستک دے کر اندر جا سکتے ہیں۔', // TODO(UR-review)
    },
  },
  {
    id: 'captcha',
    audio: 'g_captcha',
    pattern: '\\bcaptcha\\b|کیپچا',
    term: { en: 'CAPTCHA', ur: 'کیپچا' },
    plain: {
      en: 'A small puzzle that checks a real person is using the site.',
      ur: 'ایک چھوٹی سی پہیلی جو دیکھتی ہے کہ ویب سائٹ کوئی اصلی انسان استعمال کر رہا ہے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a guard asking you a simple question at the gate.',
      ur: 'جیسے دروازے پر چوکیدار آپ سے ایک آسان سا سوال پوچھے۔', // TODO(UR-review)
    },
  },
  {
    id: 'upload',
    audio: 'g_upload',
    pattern: '\\bupload(ed|ing)?\\b|اپ لوڈ',
    term: { en: 'Upload', ur: 'اپ لوڈ' },
    plain: {
      en: 'Sending a photo or file from your phone to the site.',
      ur: 'اپنے فون سے کوئی تصویر یا فائل ویب سائٹ پر بھیجنا۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like handing a photocopy across the counter.',
      ur: 'جیسے کاؤنٹر پر فوٹو کاپی دے دینا۔', // TODO(UR-review)
    },
  },
  {
    id: 'download',
    audio: 'g_download',
    pattern: '\\bdownload(ed|ing)?\\b|ڈاؤن لوڈ',
    term: { en: 'Download', ur: 'ڈاؤن لوڈ' },
    plain: {
      en: 'Bringing a file from the site onto your phone.',
      ur: 'ویب سائٹ سے کوئی فائل اپنے فون میں لانا۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like taking a copy of a paper home with you.',
      ur: 'جیسے کسی کاغذ کی کاپی گھر لے جانا۔', // TODO(UR-review)
    },
  },
  {
    id: 'attachment',
    audio: 'g_attachment',
    pattern: '\\battach(ment|ments|ed)?\\b|اٹیچمنٹ|منسلک',
    term: { en: 'Attachment', ur: 'منسلک فائل' },
    plain: {
      en: 'A file sent along with a message.',
      ur: 'وہ فائل جو کسی پیغام کے ساتھ بھیجی جائے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a photo tucked inside a letter.',
      ur: 'جیسے خط کے اندر رکھی ہوئی تصویر۔', // TODO(UR-review)
    },
  },
  {
    id: 'link',
    audio: 'g_link',
    pattern: '\\blinks?\\b|لنک',
    term: { en: 'Link', ur: 'لنک' },
    plain: {
      en: 'Coloured words you tap to open another page.',
      ur: 'رنگین الفاظ جن پر ٹیپ کرنے سے دوسرا صفحہ کھلتا ہے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a door from one room into another.',
      ur: 'ایک کمرے سے دوسرے کمرے کے دروازے جیسا۔', // TODO(UR-review)
    },
  },
  {
    id: 'password',
    audio: 'g_password',
    pattern: '\\bpass ?word\\b|پاس ورڈ',
    term: { en: 'Password', ur: 'پاس ورڈ' },
    plain: {
      en: 'A secret word you type to open your account.',
      ur: 'ایک خفیہ لفظ جو اپنا اکاؤنٹ کھولنے کے لیے لکھا جاتا ہے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the key to your front door. You do not give copies to strangers.',
      ur: 'گھر کے دروازے کی چابی جیسا۔ اس کی کاپی اجنبیوں کو نہیں دی جاتی۔', // TODO(UR-review)
    },
  },
  {
    id: 'username',
    audio: 'g_username',
    pattern: '\\buser ?name\\b|یوزر نیم|صارف نام',
    term: { en: 'Username', ur: 'یوزر نیم' },
    plain: {
      en: 'The name the site knows you by.',
      ur: 'وہ نام جس سے ویب سائٹ آپ کو پہچانتی ہے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like your name in the register at the clinic.',
      ur: 'جیسے کلینک کے رجسٹر میں لکھا آپ کا نام۔', // TODO(UR-review)
    },
  },
  {
    id: 'submit',
    audio: 'g_submit',
    pattern: '\\bsubmit\\b|سبمٹ|جمع کرائیں',
    term: { en: 'Submit', ur: 'جمع کرائیں' },
    plain: {
      en: 'Sending the finished form.',
      ur: 'مکمل فارم بھیج دینا۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like handing your form in at the counter.',
      ur: 'جیسے کاؤنٹر پر اپنا فارم جمع کرانا۔', // TODO(UR-review)
    },
  },
  {
    id: 'confirm',
    audio: 'g_confirm',
    pattern: '\\bconfirm\\b|کنفرم|تصدیق کریں',
    term: { en: 'Confirm', ur: 'تصدیق کریں' },
    plain: {
      en: 'Saying yes, this is correct.',
      ur: 'یہ کہنا کہ ہاں، یہ ٹھیک ہے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like nodding when the shopkeeper reads your order back to you.',
      ur: 'جیسے دکاندار آپ کا آرڈر دہرائے اور آپ ہاں میں سر ہلائیں۔', // TODO(UR-review)
    },
  },
  {
    id: 'terms_and_conditions',
    audio: 'g_terms_and_conditions',
    pattern: '\\bterms (and|&) conditions\\b|شرائط و ضوابط',
    term: { en: 'Terms and conditions', ur: 'شرائط و ضوابط' },
    plain: {
      en: 'The rules of the site, written out.',
      ur: 'ویب سائٹ کے لکھے ہوئے اصول۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the rules printed on the back of a bus ticket.',
      ur: 'جیسے بس کے ٹکٹ کی پچھلی طرف چھپے اصول۔', // TODO(UR-review)
    },
  },
  {
    id: 'kyc',
    audio: 'g_kyc',
    pattern: '\\bKYC\\b|کے وائی سی',
    term: { en: 'KYC', ur: 'کے وائی سی' },
    plain: {
      en: 'The site checking who you are, using your ID card.',
      ur: 'ویب سائٹ کا آپ کے شناختی کارڈ سے یہ دیکھنا کہ آپ کون ہیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a bank clerk looking at your ID card before opening an account.',
      ur: 'جیسے بینک کا کلرک اکاؤنٹ کھولنے سے پہلے آپ کا شناختی کارڈ دیکھے۔', // TODO(UR-review)
    },
  },
  {
    id: 'wallet',
    audio: 'g_wallet',
    pattern: '\\bwallet\\b|والٹ',
    term: { en: 'Wallet', ur: 'موبائل والٹ' },
    plain: {
      en: 'An account on your phone that holds money.',
      ur: 'آپ کے فون میں ایک اکاؤنٹ جس میں پیسے رکھے جاتے ہیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a purse, but inside your phone.',
      ur: 'بٹوے جیسا، مگر آپ کے فون کے اندر۔', // TODO(UR-review)
    },
  },
  {
    id: 'transaction_id',
    audio: 'g_transaction_id',
    pattern: '\\btransaction (id|number)\\b|ٹرانزیکشن',
    term: { en: 'Transaction ID', ur: 'ٹرانزیکشن آئی ڈی' },
    plain: {
      en: 'A number that marks one payment or one request.',
      ur: 'ایک نمبر جو ایک ادائیگی یا ایک درخواست کی نشانی ہے۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the token number you get in a queue.',
      ur: 'جیسے قطار میں ملنے والا ٹوکن نمبر۔', // TODO(UR-review)
    },
  },
  {
    id: 'receipt',
    audio: 'g_receipt',
    pattern: '\\breceipt\\b|رسید',
    term: { en: 'Receipt', ur: 'رسید' },
    plain: {
      en: 'Proof that the payment or form went through.',
      ur: 'اس بات کا ثبوت کہ ادائیگی یا فارم پہنچ گیا۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the slip the shopkeeper gives you after you pay.',
      ur: 'جیسے پیسے دینے کے بعد دکاندار کی دی ہوئی پرچی۔', // TODO(UR-review)
    },
  },
  {
    id: 'login',
    audio: 'g_login',
    pattern: '\\blog ?in\\b|\\bsign ?in\\b|لاگ ان|لاگ اِن',
    term: { en: 'Log in', ur: 'لاگ اِن' },
    plain: {
      en: 'Opening your account by typing your name and secret word.',
      ur: 'اپنا نام اور خفیہ لفظ لکھ کر اپنا اکاؤنٹ کھولنا۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like unlocking your door to go inside.',
      ur: 'جیسے اندر جانے کے لیے اپنا دروازہ کھولنا۔', // TODO(UR-review)
    },
  },
  {
    id: 'logout',
    audio: 'g_logout',
    pattern: '\\blog ?out\\b|\\bsign ?out\\b|لاگ آؤٹ',
    term: { en: 'Log out', ur: 'لاگ آؤٹ' },
    plain: {
      en: 'Closing your account when you are done.',
      ur: 'کام ختم ہونے پر اپنا اکاؤنٹ بند کرنا۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like locking the door when you leave.',
      ur: 'جیسے باہر جاتے ہوئے دروازے کو تالا لگانا۔', // TODO(UR-review)
    },
  },
  {
    id: 'profile',
    audio: 'g_profile',
    pattern: '\\bprofile\\b|پروفائل',
    term: { en: 'Profile', ur: 'پروفائل' },
    plain: {
      en: 'The page with your own details on the site.',
      ur: 'ویب سائٹ پر وہ صفحہ جس پر آپ کی اپنی معلومات ہوں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like your own page in a school register.',
      ur: 'جیسے اسکول کے رجسٹر میں آپ کا اپنا صفحہ۔', // TODO(UR-review)
    },
  },
  {
    id: 'install',
    audio: 'g_install',
    pattern: '\\binstall(ed|ing)?\\b|انسٹال',
    term: { en: 'Install', ur: 'انسٹال' },
    plain: {
      en: 'Putting a new app on your phone.',
      ur: 'اپنے فون میں نئی ایپ ڈالنا۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like putting a new tool into your toolbox.',
      ur: 'جیسے اوزاروں کے ڈبے میں نیا اوزار رکھنا۔', // TODO(UR-review)
    },
  },
  {
    id: 'update',
    audio: 'g_update',
    pattern: '\\bupdate[sd]?\\b|اپ ڈیٹ',
    term: { en: 'Update', ur: 'اپ ڈیٹ' },
    plain: {
      en: 'A newer version of an app.',
      ur: 'کسی ایپ کا نیا ورژن۔', // TODO(UR-review)
    },
    analogy: {
      en: "Like today's newspaper replacing yesterday's.",
      ur: 'جیسے آج کا اخبار کل کے اخبار کی جگہ لے لیتا ہے۔', // TODO(UR-review)
    },
  },
  {
    id: 'notification',
    audio: 'g_notification',
    pattern: '\\bnotifications?\\b|نوٹیفکیشن|اطلاع',
    term: { en: 'Notification', ur: 'اطلاع' },
    plain: {
      en: 'A small message at the top of your screen.',
      ur: 'آپ کی اسکرین کے اوپر آنے والا چھوٹا سا پیغام۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like a doorbell telling you someone is there.',
      ur: 'جیسے دروازے کی گھنٹی بتاتی ہے کہ کوئی آیا ہے۔', // TODO(UR-review)
    },
  },
  {
    id: 'screenshot',
    audio: 'g_screenshot',
    pattern: '\\bscreen ?shots?\\b|اسکرین شاٹ|سکرین شاٹ',
    term: { en: 'Screenshot', ur: 'اسکرین شاٹ' },
    plain: {
      en: 'A picture of what is on your screen.',
      ur: 'آپ کی اسکرین پر جو کچھ ہے اس کی تصویر۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like taking a photo of a paper to show someone later.',
      ur: 'جیسے کسی کاغذ کی تصویر لینا تاکہ بعد میں کسی کو دکھا سکیں۔', // TODO(UR-review)
    },
  },
  {
    id: 'inbox',
    audio: 'g_inbox',
    pattern: '\\binbox\\b|ان باکس',
    term: { en: 'Inbox', ur: 'ان باکس' },
    plain: {
      en: 'The place where your messages arrive.',
      ur: 'وہ جگہ جہاں آپ کے پیغامات آتے ہیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like the letterbox at your gate.',
      ur: 'جیسے آپ کے گیٹ پر لگا لیٹر باکس۔', // TODO(UR-review)
    },
  },
  {
    id: 'spam',
    audio: 'g_spam',
    pattern: '\\bspam\\b|اسپیم|سپیم',
    term: { en: 'Spam', ur: 'اسپیم' },
    plain: {
      en: 'Unwanted messages, often adverts or tricks.',
      ur: 'غیر ضروری پیغامات، اکثر اشتہار یا چالیں۔', // TODO(UR-review)
    },
    analogy: {
      en: 'Like leaflets pushed under your door that you never asked for.',
      ur: 'جیسے دروازے کے نیچے سے ڈالے گئے پرچے جو آپ نے کبھی نہیں مانگے۔', // TODO(UR-review)
    },
  },

  // Ride booking words (for the practice ride form in the Guide).
  {
    id: 'pickup',
    audio: 'g_pickup',
    pattern: '\\bpick[- ]?up\\b|پک اپ',
    term: { en: 'Pickup', ur: 'پک اپ (لینے کی جگہ)' },
    plain: {
      en: 'The place where the car comes to collect you.',
      ur: 'وہ جگہ جہاں گاڑی آپ کو لینے آتی ہے۔',
    },
    analogy: {
      en: 'Like asking a rickshaw driver to wait at your gate.',
      ur: 'جیسے رکشے والے سے کہنا کہ آپ کے گیٹ پر انتظار کرے۔',
    },
  },
  {
    id: 'dropoff',
    audio: 'g_dropoff',
    pattern: '\\bdrop[- ]?off\\b|ڈراپ آف|ڈراپ',
    term: { en: 'Drop-off', ur: 'ڈراپ آف (اترنے کی جگہ)' },
    plain: {
      en: 'The place where you want to get out.',
      ur: 'وہ جگہ جہاں آپ اترنا چاہتے ہیں۔',
    },
    analogy: {
      en: 'Like telling the bus conductor your stop.',
      ur: 'جیسے بس کنڈکٹر کو اپنا اسٹاپ بتانا۔',
    },
  },
  {
    id: 'fare',
    audio: 'g_fare',
    pattern: '\\bfares?\\b|کرایہ',
    term: { en: 'Fare', ur: 'کرایہ' },
    plain: {
      en: 'The money you pay for the ride.',
      ur: 'سواری کے لیے دی جانے والی رقم۔',
    },
    analogy: {
      en: 'Like the rickshaw fare you agree on before you sit down.',
      ur: 'جیسے بیٹھنے سے پہلے رکشے کا طے کیا ہوا کرایہ۔',
    },
  },
  {
    id: 'eta',
    audio: 'g_eta',
    pattern: '\\bETA\\b|ای ٹی اے|پہنچنے کا وقت',
    term: { en: 'ETA', ur: 'پہنچنے کا وقت (ETA)' },
    plain: {
      en: 'The time the car is expected to reach you or your stop.',
      ur: 'وہ وقت جب گاڑی کے آپ تک یا آپ کی منزل تک پہنچنے کی امید ہے۔',
    },
    analogy: {
      en: 'Like a relative phoning to say they will arrive in ten minutes.',
      ur: 'جیسے کوئی رشتہ دار فون پر بتائے کہ وہ دس منٹ میں پہنچ جائیں گے۔',
    },
  },
  {
    id: 'surge',
    audio: 'g_surge',
    pattern: '\\bsurge( pricing)?\\b|سرج',
    term: { en: 'Surge', ur: 'سرج (بڑھا ہوا کرایہ)' },
    plain: {
      en: 'The fare goes up for a while because many people want a ride at the same time. Waiting a little can bring it down.',
      ur: 'کچھ دیر کے لیے کرایہ بڑھ جاتا ہے کیونکہ ایک ہی وقت میں بہت سے لوگ سواری چاہتے ہیں۔ تھوڑا انتظار کرنے سے یہ کم ہو سکتا ہے۔',
    },
    analogy: {
      en: 'Like vegetables costing more on Chand Raat, when everyone is buying.',
      ur: 'جیسے چاند رات کو سبزی مہنگی ہو جاتی ہے، جب سب خرید رہے ہوتے ہیں۔',
    },
  },
];
