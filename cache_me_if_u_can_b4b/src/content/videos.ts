import type { VideoItem } from '../engine/types';

// Curated list chosen by Savera. Titles are copied exactly from YouTube; minutes are the real length
// (checked 31 Oct 2026). Topic tags are single words (English, Urdu and Roman Urdu) because the
// search in src/video/api.ts matches one query word against the title and tags.
// TODO(content): confirm each video has been watched fully and nobody in it asks for a PIN or code.
// Left out for running over 4 minutes: Mc6h9ROxhOk (5.2 min), M85Rku0rxOA (13.6 min).

const SCAM = ['scam', 'fraud', 'dhoka', 'دھوکا', 'فراڈ'];
const MESSAGE = ['message', 'sms', 'call', 'پیغام', 'میسج', 'کال'];
const OTP = ['otp', 'code', 'کوڈ', 'tasdeeq', 'تصدیق'];
const PHOTO = ['photo', 'picture', 'tasveer', 'تصویر', 'فوٹو', 'size'];
const FORM = ['form', 'فارم', 'upload', 'اپلوڈ'];
const LOGIN = ['login', 'password', 'لاگ', 'پاسورڈ'];

export const VIDEOS: VideoItem[] = [
  // Scam calls and messages
  { id: 'tpr0-v7CILY', title: 'How to Report Scam Calls & SMSs | PTA', topic: [...SCAM, ...MESSAGE], minutes: 0.7 },
  { id: 'pNZTkNp7Pd4', title: 'E-Challan Scam Alert | How to Verify Real Message', topic: [...SCAM, ...MESSAGE], minutes: 1.3 },
  { id: '2Dr4gPnYrFc', title: 'Protect Yourself Against Scam Calls & SMSs | PTA', topic: [...SCAM, ...MESSAGE], minutes: 0.5 },

  // OTP
  { id: 'uQsODznuJHM', title: 'What is OTP Code | Otp code kya hota hai', topic: OTP, minutes: 2.3 },
  { id: '2hhRIs4vhRU', title: 'What is otp code in jazzcash | OTP kya hota hai pakistan | OTP explain | How to secure it', topic: OTP, minutes: 2.8 },
  { id: 'PCs4Kzu6KHo', title: 'Otp kya hai', topic: OTP, minutes: 0.8 },
  { id: 'nane7oVxqbE', title: 'Cyber Awareness | OTP Verification | SMS Scam | Online Frauds | Scam Alert | India Daily Digital', topic: [...OTP, ...SCAM], minutes: 1.1 },
  { id: 'H1QmXSw6f5s', title: 'Online Frauds Se Bachne Ke Tips 🛡️ Card-OTP Scams Exposed | Bajaj Finance Fraud Awareness', topic: [...OTP, ...SCAM], minutes: 0.7 },

  // Photos for forms
  { id: 'bBSjOG9lFVI', title: 'Photo Ka Size 50KB Kaise Kare (Online Form Ke Liye) | 100% Working Trick', topic: [...PHOTO, ...FORM], minutes: 3.4 },
  { id: 'xt01IND6iG4', title: 'how to resize photo in mobile 100kb | photo ka size kaise kam kare mobile se #shorts #photoresize', topic: [...PHOTO, ...FORM], minutes: 0.6 },
  { id: 'm5rlMtYan_U', title: 'photo signature ka size kaise kam kare mobile se | how to reduce photo size in kb |', topic: [...PHOTO, ...FORM], minutes: 1 },

  // Passwords
  { id: 'X5UoTB_gH9Y', title: 'मजबूत पासवर्ड कैसे बनाएं? How To Create A Strong Password? | Saksham  Senior Shorts w/ @bizarrepree', topic: LOGIN, minutes: 1 },
];
