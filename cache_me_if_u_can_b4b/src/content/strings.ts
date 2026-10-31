import type { Bi } from '../engine/types';

// Audio for a key, when it exists, has the id `ui_<key>` (see content/audio-script.csv).
export const STRINGS: Record<string, Bi> = {
  // Common actions
  start: {
    en: 'Start',
    ur: 'شروع کریں', // TODO(UR-review)
  },
  listen: {
    en: 'Listen',
    ur: 'سنیں', // TODO(UR-review)
  },
  stuck: {
    en: 'I need help',
    ur: 'مجھے مدد چاہیے', // TODO(UR-review)
  },
  helper: {
    en: 'Helper',
    ur: 'مددگار', // TODO(UR-review)
  },
  practice_banner: {
    en: 'PRACTICE, nothing is real',
    ur: 'مشق، یہاں کچھ بھی اصلی نہیں', // TODO(UR-review)
  },
  next: {
    en: 'Next',
    ur: 'آگے', // TODO(UR-review)
  },
  back: {
    en: 'Back',
    ur: 'پیچھے', // TODO(UR-review)
  },
  undo: {
    en: 'Undo',
    ur: 'واپس لیں', // TODO(UR-review)
  },
  try_again: {
    en: 'Try again',
    ur: 'دوبارہ کوشش کریں', // TODO(UR-review)
  },
  got_it: {
    en: 'Got it',
    ur: 'ٹھیک ہے', // TODO(UR-review)
  },
  take_a_moment: {
    en: 'Take a moment. There is no hurry.',
    ur: 'آرام سے۔ کوئی جلدی نہیں ہے۔', // TODO(UR-review)
  },
  yes: {
    en: 'Yes',
    ur: 'ہاں', // TODO(UR-review)
  },
  no: {
    en: 'No',
    ur: 'نہیں', // TODO(UR-review)
  },
  continue_card: {
    en: 'Continue where you left off',
    ur: 'جہاں چھوڑا تھا، وہیں سے جاری رکھیں', // TODO(UR-review)
  },
  welcome_back: {
    en: 'Welcome back',
    ur: 'دوبارہ خوش آمدید', // TODO(UR-review)
  },

  // Consent
  consent_title: {
    en: 'Before we begin',
    ur: 'شروع کرنے سے پہلے', // TODO(UR-review)
  },
  consent_line1: {
    en: 'This is a practice app. Nothing you type is sent anywhere.',
    ur: 'یہ مشق کی ایپ ہے۔ آپ جو کچھ لکھیں گے وہ کہیں نہیں بھیجا جاتا۔', // TODO(UR-review)
  },
  consent_line2: {
    en: 'The person in the lessons is made up. Use their details, not yours.',
    ur: 'اسباق میں دیا گیا شخص فرضی ہے۔ اسی کی معلومات استعمال کریں، اپنی نہیں۔', // TODO(UR-review)
  },
  consent_line3: {
    en: 'You can stop at any time. Your progress stays on this phone.',
    ur: 'آپ کسی بھی وقت رک سکتے ہیں۔ آپ کی پیش رفت اسی فون پر رہتی ہے۔', // TODO(UR-review)
  },

  // Home
  home_title: {
    en: 'Mashq',
    ur: 'مشق',
  },
  lessons: {
    en: 'Lessons',
    ur: 'اسباق', // TODO(UR-review)
  },
  find_help: {
    en: 'Find help',
    ur: 'مدد تلاش کریں', // TODO(UR-review)
  },
  guide_me: {
    en: 'Guide me on a form',
    ur: 'فارم پر میری رہنمائی کریں', // TODO(UR-review)
  },
  guide_on_badge: {
    en: 'Guide on',
    ur: 'رہنما آن ہے', // TODO(UR-review)
  },
  settings: {
    en: 'Settings',
    ur: 'ترتیبات', // TODO(UR-review)
  },

  // Step screen
  step_of: {
    en: '{n} of {total}',
    ur: '{total} میں سے {n}', // TODO(UR-review)
  },
  layer_asks: {
    en: 'What it asks',
    ur: 'یہ کیا پوچھ رہا ہے', // TODO(UR-review)
  },
  layer_where: {
    en: 'Where it is',
    ur: 'یہ کہاں ہے', // TODO(UR-review)
  },
  layer_format: {
    en: 'How to write it',
    ur: 'کیسے لکھیں', // TODO(UR-review)
  },
  layer_unsure: {
    en: 'If you are unsure',
    ur: 'اگر یقین نہ ہو', // TODO(UR-review)
  },
  oops_title: {
    en: 'If this were a real form',
    ur: 'اگر یہ اصلی فارم ہوتا', // TODO(UR-review)
  },
  oops_fix: {
    en: 'How to fix it',
    ur: 'اسے ٹھیک کرنے کا طریقہ', // TODO(UR-review)
  },
  sms_banner: {
    en: 'Practice SMS: your code is {code}',
    ur: 'مشق کا SMS: آپ کا کوڈ {code} ہے', // TODO(UR-review)
  },
  session_expired: {
    en: 'Your session has expired',
    ur: 'آپ کا سیشن ختم ہو گیا ہے', // TODO(UR-review)
  },
  log_in_again: {
    en: 'Log in again',
    ur: 'دوبارہ لاگ اِن کریں', // TODO(UR-review)
  },
  vague_error_banner: {
    en: 'Something went wrong. Please check the form.',
    ur: 'کچھ مسئلہ ہوا۔ براہِ کرم فارم چیک کریں۔', // TODO(UR-review)
  },

  // Review and submit
  review_title: {
    en: 'Check your answers',
    ur: 'اپنے جوابات چیک کریں', // TODO(UR-review)
  },
  read_aloud: {
    en: 'Read aloud',
    ur: 'بلند آواز سے پڑھیں', // TODO(UR-review)
  },
  submit: {
    en: 'Submit',
    ur: 'جمع کرائیں', // TODO(UR-review)
  },
  receipt_title: {
    en: 'Practice receipt',
    ur: 'مشق کی رسید', // TODO(UR-review)
  },
  receipt_save: {
    en: 'Save the confirmation number',
    ur: 'تصدیقی نمبر محفوظ کریں', // TODO(UR-review)
  },

  // Result
  result_title: {
    en: 'You finished the lesson',
    ur: 'آپ نے سبق مکمل کر لیا', // TODO(UR-review)
  },
  rung_0: {
    en: 'With the guide beside me',
    ur: 'رہنما ساتھ ہو تو', // TODO(UR-review)
  },
  rung_1: {
    en: 'With a little help',
    ur: 'تھوڑی سی مدد کے ساتھ', // TODO(UR-review)
  },
  rung_2: {
    en: 'On my own',
    ur: 'خود سے', // TODO(UR-review)
  },
  comfort_q: {
    en: 'How do you feel about this form now?',
    ur: 'اب یہ فارم بھرنے کے بارے میں آپ کیسا محسوس کرتے ہیں؟', // TODO(UR-review)
  },
  comfort_ok: {
    en: 'Comfortable',
    ur: 'مطمئن', // TODO(UR-review)
  },
  comfort_unsure: {
    en: 'A bit unsure',
    ur: 'تھوڑی سی الجھن ہے', // TODO(UR-review)
  },
  comfort_notyet: {
    en: 'Not yet',
    ur: 'ابھی نہیں', // TODO(UR-review)
  },
  next_lesson: {
    en: 'Next lesson',
    ur: 'اگلا سبق', // TODO(UR-review)
  },
  practise_again: {
    en: 'Practise again',
    ur: 'دوبارہ مشق کریں', // TODO(UR-review)
  },

  // Sharing
  fridge_card: {
    en: 'Fridge card',
    ur: 'فریج کارڈ', // TODO(UR-review)
  },
  share_whatsapp: {
    en: 'Share on WhatsApp',
    ur: 'واٹس ایپ پر بھیجیں', // TODO(UR-review)
  },
  wa_training_wheels: {
    en: 'I practised filling a form on Mashq today. I did it myself.',
    ur: 'آج میں نے مشق ایپ پر فارم بھرنے کی مشق کی۔ یہ کام میں نے خود کیا۔', // TODO(UR-review)
  },
  wa_share_app: {
    en: 'Mashq lets you practise online forms safely. Nothing is real, so a mistake cannot hurt.',
    ur: 'مشق ایپ پر آپ آن لائن فارم بھرنے کی محفوظ مشق کر سکتے ہیں۔ یہاں کچھ اصلی نہیں، اس لیے غلطی سے کوئی نقصان نہیں ہوتا۔', // TODO(UR-review)
  },

  // Videos
  find_video_title: {
    en: 'Find a video',
    ur: 'ویڈیو تلاش کریں', // TODO(UR-review)
  },
  checked_by_team: {
    en: 'Checked by our team',
    ur: 'ہماری ٹیم نے دیکھی ہوئی', // TODO(UR-review)
  },
  from_youtube: {
    en: 'From YouTube, not checked by us',
    ur: 'یوٹیوب سے، ہم نے نہیں دیکھی', // TODO(UR-review)
  },
  video_helped_q: {
    en: 'Did this video help?',
    ur: 'کیا اس ویڈیو سے مدد ملی؟', // TODO(UR-review)
  },
  video_banner: {
    en: 'Videos are for learning. Never type a code or PIN because a video asks you to.',
    ur: 'ویڈیو سیکھنے کے لیے ہیں۔ کسی ویڈیو کے کہنے پر کبھی کوڈ یا پن نہ لکھیں۔', // TODO(UR-review)
  },

  // Helper and jargon
  helper_title: {
    en: 'Helper',
    ur: 'مددگار', // TODO(UR-review)
  },
  helper_unsure: {
    en: 'I am not sure about that one. Try one of these questions, or ask someone you trust.',
    ur: 'اس بارے میں مجھے یقین نہیں۔ ان میں سے کوئی سوال آزمائیں، یا کسی بھروسے والے شخص سے پوچھیں۔', // TODO(UR-review)
  },
  secret_warning: {
    en: 'Please do not type a code, PIN or password here. The helper never needs them.',
    ur: 'براہِ کرم یہاں کوئی کوڈ، پن یا پاس ورڈ نہ لکھیں۔ مددگار کو ان کی کبھی ضرورت نہیں ہوتی۔', // TODO(UR-review)
  },
  jargon_title: {
    en: 'What this word means',
    ur: 'اس لفظ کا مطلب', // TODO(UR-review)
  },
  chip_word: {
    en: 'A word I do not know',
    ur: 'ایک لفظ سمجھ نہیں آیا', // TODO(UR-review)
  },
  chip_box: {
    en: 'What goes in this box',
    ur: 'اس خانے میں کیا لکھیں', // TODO(UR-review)
  },
  chip_error: {
    en: 'I see a message',
    ur: 'ایک پیغام آیا ہے', // TODO(UR-review)
  },
  chip_logged_out: {
    en: 'It logged me out',
    ur: 'لاگ آؤٹ ہو گیا ہے', // TODO(UR-review)
  },
  chip_safe: {
    en: 'Is this safe?',
    ur: 'کیا یہ محفوظ ہے؟', // TODO(UR-review)
  },

  // Settings
  settings_text_size: {
    en: 'Text size',
    ur: 'لکھائی کا سائز', // TODO(UR-review)
  },
  settings_audio_speed: {
    en: 'Voice speed',
    ur: 'آواز کی رفتار', // TODO(UR-review)
  },
  settings_language: {
    en: 'Language',
    ur: 'زبان', // TODO(UR-review)
  },
  settings_reset: {
    en: 'Start fresh',
    ur: 'نئے سرے سے شروع کریں', // TODO(UR-review)
  },
  settings_share_progress: {
    en: 'Share progress with family',
    ur: 'گھر والوں کو پیش رفت بھیجیں', // TODO(UR-review)
  },
  settings_about: {
    en: 'About Mashq',
    ur: 'مشق کے بارے میں', // TODO(UR-review)
  },

  // Strengths (result screen)
  strength_unaided_recovery: {
    en: 'Today you recovered from a logout without any hint.',
    ur: 'آج آپ نے لاگ آؤٹ کے بعد بغیر کسی اشارے کے خود کام سنبھال لیا۔', // TODO(UR-review)
  },
  strength_fewer_hints: {
    en: 'You needed fewer hints than last time.',
    ur: 'اس بار آپ کو پچھلی بار سے کم اشارے چاہیے تھے۔', // TODO(UR-review)
  },
  strength_careful_check: {
    en: 'You read the number back before confirming. That is what careful people do.',
    ur: 'آپ نے تصدیق سے پہلے نمبر دوبارہ پڑھا۔ محتاط لوگ یہی کرتے ہیں۔', // TODO(UR-review)
  },
  strength_default: {
    en: 'You kept going and finished. That is what matters.',
    ur: 'آپ چلتے رہے اور کام مکمل کیا۔ یہی سب سے اہم ہے۔', // TODO(UR-review)
  },
};
