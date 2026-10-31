import type { Bi } from '../engine/types';

// The Teach moment reuses each hiccup's `happened` (the neighbour's problem) and `habit`
// (the right advice), so only these shared lines are new.
// TODO(UR-review): new copy; needs the same native review as the main catalog.
export const TEACH_STRINGS: Record<string, Bi> = {
  teach_title: { en: 'Help a neighbour', ur: 'پڑوسی کی مدد کریں' },
  teach_q: {
    en: 'A neighbour is stuck on a form. What would you tell them?',
    ur: 'ایک پڑوسی فارم میں پھنس گئے ہیں۔ آپ انہیں کیا کہیں گے؟',
  },
  teach_wrong_1: {
    en: 'Close it and ask someone to fill it in for you.',
    ur: 'اسے بند کر دیں اور کسی سے کہیں کہ وہ بھر دے۔',
  },
  teach_wrong_2: {
    en: 'Type anything and press submit.',
    ur: 'کچھ بھی لکھ کر جمع کرا دیں۔',
  },
  teach_right: {
    en: 'Yes, that is the calm way. You could teach this to anyone.',
    ur: 'جی ہاں، یہی پُرسکون طریقہ ہے۔ آپ یہ کسی کو بھی سکھا سکتے ہیں۔',
  },
  teach_gentle: {
    en: 'That might work, but here is a calmer way:',
    ur: 'یہ بھی چل سکتا ہے، لیکن ایک زیادہ پُرسکون طریقہ یہ ہے:',
  },
};
