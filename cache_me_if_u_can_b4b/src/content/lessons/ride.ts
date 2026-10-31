import type { Lesson } from '../../engine/types';
import { PERSONA } from './lesson1';

// Practice ride booking. The steps follow the common shape of ride-hailing and bike-taxi apps
// (location, pickup, drop-off, ride type, fare, payment, confirm, meet the driver). No real
// app, brand, driver or map is involved; the Guide's "Practice form 3" shows the same flow.
const digits = (s: string) => s.replace(/[-\s]/g, '');

export const LESSON_RIDE: Lesson = {
  id: 'ride',
  title: {
    en: 'Book a ride',
    ur: 'رائیڈ بُک کریں', // TODO(UR-review)
  },
  persona: PERSONA,
  ready: [
    { id: 'ready_internet', audio: 'ride_ready_internet', text: {
      en: 'Phone with internet',
      ur: 'انٹرنیٹ والا فون', // TODO(UR-review)
    } },
    { id: 'ready_location', audio: 'ride_ready_location', text: {
      en: 'Phone location switched on',
      ur: 'فون کی لوکیشن آن', // TODO(UR-review)
    } },
    { id: 'ready_cash', audio: 'ride_ready_cash', text: {
      en: 'Cash or a mobile wallet',
      ur: 'نقد رقم یا موبائل والٹ', // TODO(UR-review)
    } },
  ],
  steps: [
    {
      id: 'ready',
      kind: 'info',
      label: {
        en: 'Before you start',
        ur: 'شروع کرنے سے پہلے', // TODO(UR-review)
      },
      asks: {
        en: 'Most ride apps work the same way. Keep these near you.',
        ur: 'زیادہ تر رائیڈ ایپس ایک ہی طرح کام کرتی ہیں۔ یہ چیزیں اپنے پاس رکھیں۔', // TODO(UR-review)
      },
      audio: { asks: 'ride_ready_asks' },
    },
    {
      id: 'location',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Location',
        ur: 'لوکیشن', // TODO(UR-review)
      },
      asks: {
        en: 'The app asks: may it use your location?',
        ur: 'ایپ پوچھتی ہے: کیا وہ آپ کی لوکیشن استعمال کر سکتی ہے؟', // TODO(UR-review)
      },
      where: {
        en: 'A box pops up the first time you open the app.',
        ur: 'ایپ پہلی بار کھولنے پر ایک خانہ سامنے آتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'While using the app is enough. It lets the driver find you.',
        ur: '"ایپ استعمال کرتے وقت" کافی ہے۔ اس سے ڈرائیور آپ کو ڈھونڈ لیتا ہے۔', // TODO(UR-review)
      },
      choices: [
        { id: 'while_using', correct: true, label: {
          en: 'Allow while using the app',
          ur: 'ایپ استعمال کرتے وقت اجازت دیں', // TODO(UR-review)
        } },
        { id: 'deny', label: {
          en: "Don't allow",
          ur: 'اجازت نہ دیں', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'The map would not know where you are, and you would type your pickup by hand.',
          ur: 'نقشے کو آپ کی جگہ معلوم نہیں ہو گی، اور پک اپ ہاتھ سے لکھنا پڑے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Pick "Allow while using the app".',
          ur: '"ایپ استعمال کرتے وقت اجازت دیں" چنیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'ride_location_asks', where: 'ride_location_where', format: 'ride_location_format', ifUnsure: 'ride_location_unsure' },
    },
    {
      id: 'pickup',
      kind: 'field',
      fieldKind: 'text',
      label: {
        en: 'Pickup point',
        ur: 'پک اپ کی جگہ', // TODO(UR-review)
      },
      asks: {
        en: 'Where should the driver meet you? Move the pin or type the place.',
        ur: 'ڈرائیور آپ سے کہاں ملے؟ پن کو ہلائیں یا جگہ کا نام لکھیں۔', // TODO(UR-review)
      },
      where: {
        en: 'It is the first box on the booking screen. For practice, type: Gulshan Chowrangi.',
        ur: 'یہ بُکنگ اسکرین کا پہلا خانہ ہے۔ مشق کے لیے لکھیں: Gulshan Chowrangi', // TODO(UR-review)
      },
      format: {
        en: 'A well-known place near you works best, such as a shop, a mosque or a chowk.',
        ur: 'آپ کے قریب کوئی مشہور جگہ بہتر رہتی ہے، جیسے دکان، مسجد یا چوک۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'The pin should sit where you stand, not on the main road far away.',
        ur: 'پن وہاں ہو جہاں آپ کھڑے ہیں، دور بڑی سڑک پر نہیں۔', // TODO(UR-review)
      },
      example: 'Gulshan Chowrangi',
      expected: (v) => /gulshan/i.test(v),
      oops: {
        consequence: {
          en: 'The driver would go to the wrong place and you would wait.',
          ur: 'ڈرائیور غلط جگہ چلا جائے گا اور آپ کو انتظار کرنا پڑے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Type the place shown in grey: Gulshan Chowrangi.',
          ur: 'سرمئی رنگ میں لکھی جگہ لکھیں: Gulshan Chowrangi', // TODO(UR-review)
        },
      },
      audio: { asks: 'ride_pickup_asks', where: 'ride_pickup_where', format: 'ride_pickup_format', ifUnsure: 'ride_pickup_unsure' },
    },
    {
      id: 'drop',
      kind: 'field',
      fieldKind: 'text',
      label: {
        en: 'Drop-off point',
        ur: 'ڈراپ آف کی جگہ', // TODO(UR-review)
      },
      asks: {
        en: 'Where do you want to go? Type the place and pick it from the list.',
        ur: 'آپ کہاں جانا چاہتے ہیں؟ جگہ لکھیں اور فہرست میں سے چنیں۔', // TODO(UR-review)
      },
      where: {
        en: 'It is the second box, under the pickup. For practice, type: Dolmen Mall Clifton.',
        ur: 'یہ دوسرا خانہ ہے، پک اپ کے نیچے۔ مشق کے لیے لکھیں: Dolmen Mall Clifton', // TODO(UR-review)
      },
      format: {
        en: 'Start typing, then tap the right place in the list that appears.',
        ur: 'لکھنا شروع کریں، پھر ظاہر ہونے والی فہرست میں صحیح جگہ پر ٹیپ کریں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Check the area name in the list. Two places can share one name.',
        ur: 'فہرست میں علاقے کا نام دیکھیں۔ دو جگہوں کا نام ایک جیسا ہو سکتا ہے۔', // TODO(UR-review)
      },
      example: 'Dolmen Mall Clifton',
      expected: (v) => /clifton|dolmen/i.test(v),
      oops: {
        consequence: {
          en: 'The fare would be worked out for the wrong trip.',
          ur: 'کرایہ غلط سفر کے حساب سے بنے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Type the place shown in grey: Dolmen Mall Clifton.',
          ur: 'سرمئی رنگ میں لکھی جگہ لکھیں: Dolmen Mall Clifton', // TODO(UR-review)
        },
      },
      audio: { asks: 'ride_drop_asks', where: 'ride_drop_where', format: 'ride_drop_format', ifUnsure: 'ride_drop_unsure' },
    },
    {
      id: 'ride_type',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Ride type',
        ur: 'رائیڈ کی قسم', // TODO(UR-review)
      },
      asks: {
        en: 'You are alone with a small bag. Pick the cheapest ride.',
        ur: 'آپ اکیلے ہیں اور ایک چھوٹا بیگ ہے۔ سب سے سستی رائیڈ چنیں۔', // TODO(UR-review)
      },
      where: {
        en: 'Each ride type is a card with its price on the right.',
        ur: 'ہر رائیڈ ایک کارڈ ہے جس پر اس کا کرایہ لکھا ہوتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one card.',
        ur: 'ایک کارڈ پر ٹیپ کریں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Compare the prices. A bigger car costs more.',
        ur: 'کرائے ملا کر دیکھیں۔ بڑی گاڑی کا کرایہ زیادہ ہوتا ہے۔', // TODO(UR-review)
      },
      choices: [
        { id: 'bike', correct: true, label: {
          en: 'Bike, Rs 180',
          ur: 'بائیک، 180 روپے', // TODO(UR-review)
        } },
        { id: 'auto', label: {
          en: 'Auto, Rs 260',
          ur: 'رکشہ، 260 روپے', // TODO(UR-review)
        } },
        { id: 'car', label: {
          en: 'Car, Rs 450',
          ur: 'گاڑی، 450 روپے', // TODO(UR-review)
        } },
        { id: 'premium', label: {
          en: 'Premium car, Rs 520',
          ur: 'پریمیم گاڑی، 520 روپے', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'You would pay more than you need to.',
          ur: 'آپ ضرورت سے زیادہ کرایہ دیں گے۔', // TODO(UR-review)
        },
        fix: {
          en: 'Pick the card with the lowest price.',
          ur: 'سب سے کم کرائے والا کارڈ چنیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'ride_ride_type_asks', where: 'ride_ride_type_where', format: 'ride_ride_type_format', ifUnsure: 'ride_ride_type_unsure' },
    },
    {
      id: 'fare',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Fare',
        ur: 'کرایہ', // TODO(UR-review)
      },
      asks: {
        en: 'The fare shows "Surge pricing". Many people want a ride now. What can you do?',
        ur: 'کرائے پر "سرج پرائسنگ" لکھا ہے۔ ابھی بہت لوگ رائیڈ مانگ رہے ہیں۔ آپ کیا کر سکتے ہیں؟', // TODO(UR-review)
      },
      where: {
        en: 'A small yellow tag sits next to the price.',
        ur: 'قیمت کے ساتھ ایک چھوٹا پیلا نشان ہوتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Waiting a few minutes often brings the price down. Some apps also let you offer your own fair price.',
        ur: 'چند منٹ رکنے سے اکثر کرایہ کم ہو جاتا ہے۔ کچھ ایپس میں آپ اپنا مناسب کرایہ بھی بتا سکتے ہیں۔', // TODO(UR-review)
      },
      choices: [
        { id: 'wait_offer', correct: true, label: {
          en: 'Wait a few minutes, or offer a fair price',
          ur: 'چند منٹ رکیں، یا مناسب کرایہ بتائیں', // TODO(UR-review)
        } },
        { id: 'accept_any', label: {
          en: 'Accept any price quickly',
          ur: 'جلدی سے کوئی بھی کرایہ مان لیں', // TODO(UR-review)
        } },
        { id: 'pay_driver_more', label: {
          en: 'Plan to pay the driver extra in cash',
          ur: 'ڈرائیور کو الگ سے نقد زیادہ دینے کا سوچیں', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'You could pay much more than the usual fare.',
          ur: 'آپ عام کرائے سے بہت زیادہ دے سکتے ہیں۔', // TODO(UR-review)
        },
        fix: {
          en: 'Wait a little and check again, or offer a fair price.',
          ur: 'تھوڑا رکیں اور دوبارہ دیکھیں، یا مناسب کرایہ بتائیں۔', // TODO(UR-review)
        },
      },
      hiccup: { id: 'unknown_word', when: 'enter' },
      glossary: ['surge', 'fare'],
      audio: { asks: 'ride_fare_asks', where: 'ride_fare_where', format: 'ride_fare_format', ifUnsure: 'ride_fare_unsure' },
    },
    {
      id: 'payment',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Payment',
        ur: 'ادائیگی', // TODO(UR-review)
      },
      asks: {
        en: 'How will you pay? For practice, pick Cash.',
        ur: 'آپ ادائیگی کیسے کریں گے؟ مشق کے لیے "نقد" چنیں۔', // TODO(UR-review)
      },
      where: {
        en: 'A drop-down box called Payment method.',
        ur: 'ادائیگی کا طریقہ نام کا ایک خانہ۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Cash means you pay the driver at the end of the ride. A wallet pays inside the app.',
        ur: 'نقد کا مطلب ہے کہ سفر کے آخر میں ڈرائیور کو رقم دیں۔ والٹ ایپ کے اندر ادا کرتا ہے۔', // TODO(UR-review)
      },
      choices: [
        { id: 'cash', correct: true, label: {
          en: 'Cash',
          ur: 'نقد', // TODO(UR-review)
        } },
        { id: 'wallet', label: {
          en: 'Wallet',
          ur: 'والٹ', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'The app would take the money from a wallet you did not mean to use.',
          ur: 'ایپ ایسے والٹ سے رقم لے لے گی جو آپ استعمال نہیں کرنا چاہتے تھے۔', // TODO(UR-review)
        },
        fix: {
          en: 'Pick Cash.',
          ur: '"نقد" چنیں۔', // TODO(UR-review)
        },
      },
      glossary: ['wallet'],
      audio: { asks: 'ride_payment_asks', where: 'ride_payment_where', format: 'ride_payment_format', ifUnsure: 'ride_payment_unsure' },
    },
    {
      id: 'phone',
      kind: 'field',
      fieldKind: 'phone',
      label: {
        en: 'Mobile number',
        ur: 'موبائل نمبر', // TODO(UR-review)
      },
      asks: {
        en: 'The driver may call you. Type your mobile number.',
        ur: 'ڈرائیور آپ کو فون کر سکتا ہے۔ اپنا موبائل نمبر لکھیں۔', // TODO(UR-review)
      },
      where: {
        en: 'For practice, use the number on the practice card: 0300-1234567.',
        ur: 'مشق کے لیے پریکٹس کارڈ والا نمبر لکھیں: 0300-1234567', // TODO(UR-review)
      },
      format: {
        en: '03XX-XXXXXXX, eleven digits.',
        ur: '03XX-XXXXXXX، گیارہ ہندسے۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Only type your own number. The app never needs a code or PIN here.',
        ur: 'صرف اپنا نمبر لکھیں۔ یہاں ایپ کو کوئی کوڈ یا PIN نہیں چاہیے۔', // TODO(UR-review)
      },
      example: '0300-1234567',
      expected: (v) => digits(v) === digits(PERSONA.phone),
      oops: {
        consequence: {
          en: 'The driver could not reach you if the pickup is hard to find.',
          ur: 'پک اپ ڈھونڈنا مشکل ہو تو ڈرائیور آپ سے رابطہ نہیں کر سکے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Copy the number from the practice card.',
          ur: 'نمبر پریکٹس کارڈ سے دیکھ کر لکھیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'ride_phone_asks', where: 'ride_phone_where', format: 'ride_phone_format', ifUnsure: 'ride_phone_unsure' },
    },
    {
      id: 'session',
      kind: 'info',
      label: {
        en: 'Session',
        ur: 'سیشن', // TODO(UR-review)
      },
      asks: {
        en: 'Your session has expired.',
        ur: 'آپ کا سیشن ختم ہو گیا ہے۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'This happens on real apps. Log in again. Your trip details are still there.',
        ur: 'اصلی ایپس میں ایسا ہوتا ہے۔ دوبارہ لاگ اِن کریں۔ سفر کی تفصیل وہیں رہتی ہے۔', // TODO(UR-review)
      },
      hiccup: { id: 'logged_out', when: 'enter' },
      audio: { asks: 'ride_session_asks', ifUnsure: 'ride_session_unsure' },
    },
    {
      id: 'confirm',
      kind: 'submit',
      label: {
        en: 'Request your ride',
        ur: 'اپنی رائیڈ منگوائیں', // TODO(UR-review)
      },
      asks: {
        en: 'Check the pickup, drop-off and fare, then tap Submit. Real apps call it Request or Confirm.',
        ur: 'پک اپ، ڈراپ آف اور کرایہ چیک کریں، پھر "جمع کرائیں" دبائیں۔ اصلی ایپس میں اسے Request یا Confirm کہتے ہیں۔', // TODO(UR-review)
      },
      hiccup: { id: 'vague_error', when: 'submit_first' },
      audio: { asks: 'ride_confirm_asks' },
    },
    {
      id: 'driver_check',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Meet the driver',
        ur: 'ڈرائیور سے ملیں', // TODO(UR-review)
      },
      asks: {
        en: 'A driver is on the way. The app shows a name, a car number and minutes left. A car stops near you. What do you check first?',
        ur: 'ڈرائیور آ رہا ہے۔ ایپ میں نام، گاڑی کا نمبر اور باقی منٹ لکھے ہیں۔ ایک گاڑی آپ کے پاس رکتی ہے۔ سب سے پہلے کیا دیکھیں؟', // TODO(UR-review)
      },
      where: {
        en: 'The driver card is at the bottom of the app screen.',
        ur: 'ڈرائیور کا کارڈ ایپ اسکرین کے نیچے ہوتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Match the car number and name with the app before you sit. If they differ, do not get in.',
        ur: 'بیٹھنے سے پہلے گاڑی کا نمبر اور نام ایپ سے ملائیں۔ اگر مختلف ہوں تو نہ بیٹھیں۔', // TODO(UR-review)
      },
      glossary: ['eta'],
      choices: [
        { id: 'match', correct: true, label: {
          en: 'Match the car number and name with the app',
          ur: 'گاڑی کا نمبر اور نام ایپ سے ملائیں', // TODO(UR-review)
        } },
        { id: 'get_in', label: {
          en: 'Get in, the car looks fine',
          ur: 'بیٹھ جائیں، گاڑی ٹھیک لگ رہی ہے', // TODO(UR-review)
        } },
        { id: 'share_pin', label: {
          en: 'Give the driver your bank PIN',
          ur: 'ڈرائیور کو اپنا بینک PIN دیں', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'You could get into the wrong car.',
          ur: 'آپ غلط گاڑی میں بیٹھ سکتے ہیں۔', // TODO(UR-review)
        },
        fix: {
          en: 'Match the number and name first. Never share a PIN.',
          ur: 'پہلے نمبر اور نام ملائیں۔ PIN کبھی نہ بتائیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'ride_driver_check_asks', where: 'ride_driver_check_where', format: 'ride_driver_check_format', ifUnsure: 'ride_driver_check_unsure' },
    },
    {
      id: 'safety',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'A call about your ride',
        ur: 'آپ کی رائیڈ کے بارے میں فون', // TODO(UR-review)
      },
      asks: {
        en: 'A caller says "I am from the ride app" and asks for the code sent to your phone. What do you do?',
        ur: 'ایک فون کرنے والا کہتا ہے "میں رائیڈ ایپ سے ہوں" اور آپ کے فون پر آیا کوڈ مانگتا ہے۔ آپ کیا کریں گے؟', // TODO(UR-review)
      },
      where: {
        en: 'This can happen during or after a ride.',
        ur: 'ایسا سفر کے دوران یا بعد میں ہو سکتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Never share a code. A real app never asks for it by phone.',
        ur: 'کوڈ کبھی نہ بتائیں۔ اصلی ایپ فون پر کوڈ نہیں مانگتی۔', // TODO(UR-review)
      },
      hiccup: { id: 'verification_code', when: 'enter' },
      choices: [
        { id: 'refuse', correct: true, label: {
          en: 'Say no and hang up',
          ur: 'انکار کریں اور فون بند کریں', // TODO(UR-review)
        } },
        { id: 'share', label: {
          en: 'Read out the code',
          ur: 'کوڈ پڑھ کر بتا دیں', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'They could take over your account and money.',
          ur: 'وہ آپ کا اکاؤنٹ اور رقم لے سکتے ہیں۔', // TODO(UR-review)
        },
        fix: {
          en: 'Never share a code. Say no and hang up.',
          ur: 'کوڈ کبھی نہ بتائیں۔ انکار کریں اور فون بند کریں۔', // TODO(UR-review)
        },
      },
      glossary: ['otp'],
      audio: { asks: 'ride_safety_asks', where: 'ride_safety_where', format: 'ride_safety_format', ifUnsure: 'ride_safety_unsure' },
    },
  ],
};
