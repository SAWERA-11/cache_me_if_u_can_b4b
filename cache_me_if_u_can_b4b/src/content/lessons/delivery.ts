import type { Lesson } from '../../engine/types';
import { PERSONA } from './lesson1';

// Practice order. The steps follow the common shape of food and grocery delivery apps;
// no real app, shop or rider is involved.
const digits = (s: string) => s.replace(/[-\s]/g, '');

export const LESSON_DELIVERY: Lesson = {
  id: 'delivery',
  title: {
    en: 'Order from a delivery app',
    ur: 'ڈیلیوری ایپ سے آرڈر کریں',
  },
  persona: PERSONA,
  ready: [
    { id: 'ready_internet', audio: 'delivery_ready_internet', text: {
      en: 'Phone with internet',
      ur: 'انٹرنیٹ والا فون',
    } },
    { id: 'ready_address', audio: 'delivery_ready_address', text: {
      en: 'Your house number and street',
      ur: 'آپ کا مکان نمبر اور سڑک',
    } },
    { id: 'ready_cash', audio: 'delivery_ready_cash', text: {
      en: 'Cash, card or mobile wallet',
      ur: 'نقد رقم، کارڈ یا موبائل والٹ',
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
        en: 'Most food and grocery apps work the same way. Keep these near you.',
        ur: 'زیادہ تر کھانے اور سودا سلف کی ایپس ایک ہی طرح کام کرتی ہیں۔ یہ چیزیں اپنے پاس رکھیں۔',
      },
      audio: { asks: 'delivery_ready_asks' },
    },
    {
      id: 'location',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Location',
        ur: 'لوکیشن',
      },
      asks: {
        en: 'The app asks: may it use your location?',
        ur: 'ایپ پوچھتی ہے: کیا وہ آپ کی لوکیشن استعمال کر سکتی ہے؟',
      },
      where: {
        en: 'A box pops up the first time you open the app.',
        ur: 'ایپ پہلی بار کھولنے پر ایک خانہ سامنے آتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔',
      },
      ifUnsure: {
        en: 'While using the app is enough. The rider needs it to find you.',
        ur: '"ایپ استعمال کرتے وقت" کافی ہے۔ رائیڈر کو آپ تک پہنچنے کے لیے اس کی ضرورت ہے۔', // TODO(UR-review)
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
          en: 'The app could not find your area, and you would type it all by hand.',
          ur: 'ایپ آپ کا علاقہ نہیں ڈھونڈ سکے گی، اور سب کچھ ہاتھ سے لکھنا پڑے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Pick Allow while using the app.',
          ur: '"ایپ استعمال کرتے وقت اجازت دیں" چنیں۔', // TODO(UR-review)
        },
      },
      glossary: ['allow_access'],
      audio: { asks: 'delivery_location_asks', where: 'delivery_location_where', format: 'delivery_location_format', ifUnsure: 'delivery_location_unsure' },
    },
    {
      id: 'address',
      kind: 'field',
      fieldKind: 'text',
      label: {
        en: 'Delivery address',
        ur: 'ڈیلیوری کا پتہ',
      },
      asks: {
        en: 'Move the pin to your door, then type the house number and street.',
        ur: 'پن کو اپنے دروازے پر لائیں، پھر مکان نمبر اور گلی لکھیں۔',
      },
      where: {
        en: 'For practice, use: House 12, Street 5, Gulshan.',
        ur: 'مشق کے لیے یہ لکھیں: House 12, Street 5, Gulshan', // TODO(UR-review)
      },
      format: {
        en: 'House number, street, area. A nearby landmark helps.',
        ur: 'مکان نمبر، گلی، علاقہ۔ قریب کی کوئی مشہور جگہ لکھنا مدد کرتا ہے۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'The pin on the map should sit on your house, not the main road.',
        ur: 'نقشے پر پن آپ کے گھر پر ہو، بڑی سڑک پر نہیں۔', // TODO(UR-review)
      },
      example: 'House 12, Street 5, Gulshan',
      expected: (v) => /\b12\b/.test(v) && /\b5\b/.test(v),
      oops: {
        consequence: {
          en: 'The rider would go to the wrong house.',
          ur: 'رائیڈر غلط گھر پہنچ جائے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Type the house number and the street number.',
          ur: 'مکان نمبر اور گلی نمبر لکھیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'delivery_address_asks', where: 'delivery_address_where', format: 'delivery_address_format', ifUnsure: 'delivery_address_unsure' },
    },
    {
      id: 'quantity',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Quantity',
        ur: 'تعداد',
      },
      asks: {
        en: 'Add 2 plates of biryani to the cart.',
        ur: 'ٹوکری میں بریانی کی 2 پلیٹیں ڈالیں۔',
      },
      where: {
        en: 'Next to each item there is a + and a − button.',
        ur: 'ہر چیز کے ساتھ + اور − کا بٹن ہوتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap + to add one. Tap − to remove one.',
        ur: 'ایک بڑھانے کے لیے + دبائیں۔ ایک کم کرنے کے لیے − دبائیں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Look at the number between + and − before you go on.',
        ur: 'آگے بڑھنے سے پہلے + اور − کے درمیان والا نمبر دیکھیں۔', // TODO(UR-review)
      },
      choices: [
        { id: 'q1', label: { en: '1 plate', ur: '1 پلیٹ' } },
        { id: 'q2', correct: true, label: { en: '2 plates', ur: '2 پلیٹیں' } },
        { id: 'q3', label: { en: '3 plates', ur: '3 پلیٹیں' } },
      ],
      oops: {
        consequence: {
          en: 'You would get, and pay for, the wrong amount.',
          ur: 'آپ کو غلط تعداد ملے گی، اور اسی کے پیسے دینے ہوں گے۔', // TODO(UR-review)
        },
        fix: {
          en: 'Use + and − until the number shows 2.',
          ur: '+ اور − سے نمبر 2 کریں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'delivery_quantity_asks', where: 'delivery_quantity_where', format: 'delivery_quantity_format', ifUnsure: 'delivery_quantity_unsure' },
    },
    {
      id: 'total',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Check the cart',
        ur: 'ٹوکری چیک کریں',
      },
      asks: {
        en: 'Food Rs 700, delivery fee Rs 99. What will you pay?',
        ur: 'کھانا 700 روپے، ڈیلیوری فیس 99 روپے۔ آپ کتنے دیں گے؟',
      },
      where: {
        en: 'At the bottom of the cart screen, next to Total.',
        ur: 'ٹوکری والی اسکرین کے نیچے، لفظ Total کے ساتھ۔', // TODO(UR-review)
      },
      format: {
        en: 'The total adds the food and the delivery fee.',
        ur: 'ٹوٹل میں کھانا اور ڈیلیوری فیس دونوں شامل ہوتے ہیں۔', // TODO(UR-review)
      },
      ifUnsure: {
        en: 'Always read the Total before you order.',
        ur: 'آرڈر سے پہلے ہمیشہ ٹوٹل پڑھیں۔', // TODO(UR-review)
      },
      choices: [
        { id: 'rs700', label: { en: 'Rs 700', ur: '700 روپے' } },
        { id: 'rs799', correct: true, label: { en: 'Rs 799', ur: '799 روپے' } },
        { id: 'rs99', label: { en: 'Rs 99', ur: '99 روپے' } },
      ],
      oops: {
        consequence: {
          en: 'You would not have the right money ready.',
          ur: 'آپ کے پاس صحیح رقم تیار نہیں ہوگی۔', // TODO(UR-review)
        },
        fix: {
          en: 'Add the food and the delivery fee: 700 + 99.',
          ur: 'کھانا اور ڈیلیوری فیس جمع کریں: 700 + 99۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'delivery_total_asks', where: 'delivery_total_where', format: 'delivery_total_format', ifUnsure: 'delivery_total_unsure' },
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
        en: 'Your number, so the rider can call you.',
        ur: 'آپ کا نمبر، تاکہ رائیڈر آپ کو فون کر سکے۔',
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
        en: 'Use a phone you will keep with you until the food comes.',
        ur: 'وہ فون استعمال کریں جو کھانا آنے تک آپ کے پاس رہے گا۔', // TODO(UR-review)
      },
      example: '0300-1234567',
      expected: (v, p) => digits(v) === digits(p.phone),
      oops: {
        consequence: {
          en: 'The rider would call a different phone.',
          ur: 'رائیڈر کسی اور فون پر کال کرے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Copy the number from the practice card, one digit at a time.',
          ur: 'مشق کارڈ سے نمبر ایک ایک ہندسہ کر کے لکھیں۔',
        },
      },
      audio: { asks: 'delivery_phone_asks', where: 'delivery_phone_where', format: 'delivery_phone_format', ifUnsure: 'delivery_phone_unsure' },
    },
    {
      id: 'payment',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Payment',
        ur: 'ادائیگی',
      },
      asks: {
        en: 'For this practice, pay with cash when the food arrives.',
        ur: 'اس مشق میں، کھانا آنے پر نقد ادائیگی کریں۔',
      },
      where: {
        en: 'On the checkout screen, under Payment method.',
        ur: 'چیک آؤٹ اسکرین پر، Payment method کے نیچے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔',
      },
      ifUnsure: {
        en: 'Cash on delivery is the simplest. Keep change ready.',
        ur: 'کیش آن ڈیلیوری سب سے آسان ہے۔ کھلے پیسے تیار رکھیں۔', // TODO(UR-review)
      },
      choices: [
        { id: 'cod', correct: true, label: {
          en: 'Cash on delivery',
          ur: 'کیش آن ڈیلیوری', // TODO(UR-review)
        } },
        { id: 'card', label: {
          en: 'Credit or debit card',
          ur: 'کریڈٹ یا ڈیبٹ کارڈ', // TODO(UR-review)
        } },
        { id: 'wallet', label: {
          en: 'Mobile wallet',
          ur: 'موبائل والٹ', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'That works too, but this practice uses cash.',
          ur: 'یہ بھی چلتا ہے، لیکن اس مشق میں نقد استعمال ہوتا ہے۔', // TODO(UR-review)
        },
        fix: {
          en: 'Pick Cash on delivery.',
          ur: '"کیش آن ڈیلیوری" چنیں۔', // TODO(UR-review)
        },
      },
      glossary: ['wallet'],
      audio: { asks: 'delivery_payment_asks', where: 'delivery_payment_where', format: 'delivery_payment_format', ifUnsure: 'delivery_payment_unsure' },
    },
    {
      id: 'place_order',
      kind: 'submit',
      label: {
        en: 'Place your order',
        ur: 'اپنا آرڈر دیں',
      },
      asks: {
        en: 'Check the address, number and total, then tap Submit. Real apps call it Place order.',
        ur: 'پتہ، نمبر اور ٹوٹل چیک کریں، پھر "جمع کرائیں" دبائیں۔ اصلی ایپس میں اسے Place order کہتے ہیں۔',
      },
      hiccup: { id: 'vague_error', when: 'submit_first' },
      audio: { asks: 'delivery_place_order_asks' },
    },
    {
      id: 'track',
      kind: 'info',
      label: {
        en: 'Track the rider',
        ur: 'رائیڈر کو دیکھیں',
      },
      asks: {
        en: 'Order placed. The app now shows the rider on a map and the minutes left.',
        ur: 'آرڈر ہو گیا۔ اب ایپ نقشے پر رائیڈر اور باقی منٹ دکھاتی ہے۔',
      },
      audio: { asks: 'delivery_track_asks' },
    },
    {
      id: 'rider',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Contact the rider',
        ur: 'رائیڈر سے رابطہ',
      },
      asks: {
        en: 'The rider cannot find your house. What do you do?',
        ur: 'رائیڈر کو آپ کا گھر نہیں مل رہا۔ آپ کیا کریں گے؟',
      },
      where: {
        en: 'On the order screen there is a Call and a Chat button.',
        ur: 'آرڈر والی اسکرین پر Call اور Chat کا بٹن ہوتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔',
      },
      ifUnsure: {
        en: 'Tell the rider a landmark, like a mosque, shop or school.',
        ur: 'رائیڈر کو کوئی نشانی بتائیں، جیسے مسجد، دکان یا اسکول۔', // TODO(UR-review)
      },
      choices: [
        { id: 'call', correct: true, label: {
          en: 'Tap Call or Chat and tell a landmark',
          ur: 'Call یا Chat دبائیں اور کوئی نشانی بتائیں', // TODO(UR-review)
        } },
        { id: 'cancel', label: {
          en: 'Cancel the order',
          ur: 'آرڈر منسوخ کریں', // TODO(UR-review)
        } },
        { id: 'wait', label: {
          en: 'Wait and do nothing',
          ur: 'انتظار کریں اور کچھ نہ کریں', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'The food might be late, or not come at all.',
          ur: 'کھانا دیر سے آ سکتا ہے، یا بالکل نہیں آئے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Use the Call or Chat button on the order screen.',
          ur: 'آرڈر والی اسکرین پر Call یا Chat کا بٹن استعمال کریں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'delivery_rider_asks', where: 'delivery_rider_where', format: 'delivery_rider_format', ifUnsure: 'delivery_rider_unsure' },
    },
    {
      id: 'safety',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Stay safe',
        ur: 'محفوظ رہیں',
      },
      asks: {
        en: 'Someone on the phone asks for your card PIN to "confirm" the order.',
        ur: 'فون پر کوئی آرڈر "کنفرم" کرنے کے لیے آپ کے کارڈ کا PIN مانگتا ہے۔',
      },
      where: {
        en: 'This can be a call or a chat message.',
        ur: 'یہ کال یا چیٹ میسج ہو سکتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔',
      },
      ifUnsure: {
        en: 'Riders never need your PIN or password.',
        ur: 'رائیڈر کو کبھی آپ کے PIN یا پاس ورڈ کی ضرورت نہیں ہوتی۔', // TODO(UR-review)
      },
      choices: [
        { id: 'refuse', correct: true, label: {
          en: 'Say no and hang up',
          ur: 'انکار کریں اور فون بند کریں', // TODO(UR-review)
        } },
        { id: 'share', label: {
          en: 'Tell them the PIN',
          ur: 'انہیں PIN بتا دیں', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'They could take money from your account.',
          ur: 'وہ آپ کے اکاؤنٹ سے پیسے نکال سکتے ہیں۔', // TODO(UR-review)
        },
        fix: {
          en: 'Never share your PIN. Say no and hang up.',
          ur: 'اپنا PIN کبھی نہ بتائیں۔ انکار کریں اور فون بند کریں۔', // TODO(UR-review)
        },
      },
      glossary: ['pin'],
      audio: { asks: 'delivery_safety_asks', where: 'delivery_safety_where', format: 'delivery_safety_format', ifUnsure: 'delivery_safety_unsure' },
    },
    {
      id: 'receive',
      kind: 'field',
      fieldKind: 'choice',
      label: {
        en: 'Receive the order',
        ur: 'آرڈر وصول کریں',
      },
      asks: {
        en: 'The rider is at your door. What do you do?',
        ur: 'رائیڈر آپ کے دروازے پر ہے۔ آپ کیا کریں گے؟',
      },
      where: {
        en: 'The total is on the order screen and on the bill.',
        ur: 'ٹوٹل آرڈر والی اسکرین اور بل پر لکھا ہوتا ہے۔', // TODO(UR-review)
      },
      format: {
        en: 'Tap one answer.',
        ur: 'ایک جواب پر ٹیپ کریں۔',
      },
      ifUnsure: {
        en: 'If something is missing, use Help in the app, not the rider.',
        ur: 'اگر کچھ کم ہو تو ایپ میں Help استعمال کریں، رائیڈر سے نہیں۔', // TODO(UR-review)
      },
      choices: [
        { id: 'check_pay', correct: true, label: {
          en: 'Check the items, then pay Rs 799',
          ur: 'چیزیں چیک کریں، پھر 799 روپے دیں', // TODO(UR-review)
        } },
        { id: 'pay_extra', label: {
          en: 'Pay whatever the rider asks',
          ur: 'رائیڈر جتنا مانگے، دے دیں', // TODO(UR-review)
        } },
        { id: 'pay_700', label: {
          en: 'Pay Rs 700',
          ur: '700 روپے دیں', // TODO(UR-review)
        } },
      ],
      oops: {
        consequence: {
          en: 'You might pay the wrong amount or miss a missing item.',
          ur: 'آپ غلط رقم دے سکتے ہیں یا کم چیز کا پتہ نہیں چلے گا۔', // TODO(UR-review)
        },
        fix: {
          en: 'Check the bag, then pay the total shown in the app.',
          ur: 'تھیلا چیک کریں، پھر ایپ میں لکھا ٹوٹل دیں۔', // TODO(UR-review)
        },
      },
      audio: { asks: 'delivery_receive_asks', where: 'delivery_receive_where', format: 'delivery_receive_format', ifUnsure: 'delivery_receive_unsure' },
    },
  ],
};
