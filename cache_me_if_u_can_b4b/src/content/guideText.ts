// The Guide only explains each box. It never fills anything in and never reads what is typed.

export type GuideStrings = {
  ui: { listen: string; helper: string; check: string; hide: string; missing: string; allgood: string;
        mapTitle: string; boxes: string; required: string; needFile: string; mapAudio: string };
  safety: { title: string; body: string; audio: string };
  kinds: Record<'name'|'dob'|'id_number'|'phone'|'email'|'address'|'choice'|'file'|'checkbox'|'generic',
                { title: string; asks: string; format?: string; audio: string }>;
};

const en: GuideStrings = {
  ui: {
    listen: 'Listen',
    helper: 'Help',
    check: 'Check',
    hide: 'Hide',
    missing: 'Empty boxes',
    allgood: 'Everything looks filled',
    mapTitle: 'Form map',
    boxes: 'boxes',
    required: 'required',
    needFile: 'a photo is needed',
    mapAudio: 'guide_map',
  },
  safety: {
    title: 'Stop for a moment',
    body: 'Do not share this code or PIN with anyone who calls you, even if they sound official.',
    audio: 'guide_safety',
  },
  kinds: {
    name: { title: 'Name', asks: 'This box wants the name exactly as on the ID card.', format: 'Copy it letter by letter', audio: 'kind_name' },
    dob: { title: 'Date of birth', asks: 'This box wants the date you were born.', format: '07-03-1958', audio: 'kind_dob' },
    id_number: { title: 'ID card number', asks: 'This box wants the 13-digit number on the ID card.', format: 'digits only unless the form shows dashes', audio: 'kind_id_number' },
    phone: { title: 'Mobile number', asks: 'This box wants your mobile number.', format: '0300-1234567', audio: 'kind_phone' },
    email: { title: 'Email', asks: 'This box wants an email address, if you have one.', format: 'name@example.com', audio: 'kind_email' },
    address: { title: 'Address', asks: 'This box wants where you live: house, street, area and city.', format: 'Copy it from the back of the ID card', audio: 'kind_address' },
    choice: { title: 'Choice', asks: 'This box wants you to pick one answer from a list.', format: 'Tap one answer', audio: 'kind_choice' },
    file: { title: 'Photo or file', asks: 'This box wants a photo or a scanned paper.', format: 'Bright, flat, all four corners visible', audio: 'kind_file' },
    checkbox: { title: 'Tick box', asks: 'This box wants a tick to say you agree or confirm.', format: 'Read the line next to it first', audio: 'kind_checkbox' },
    generic: { title: 'Box', asks: 'Read the words above this box. They say what it wants.', audio: 'kind_generic' },
  },
};

const ur: GuideStrings = {
  ui: {
    listen: 'سنیں', // TODO(UR-review)
    helper: 'مدد', // TODO(UR-review)
    check: 'چیک کریں', // TODO(UR-review)
    hide: 'چھپائیں', // TODO(UR-review)
    missing: 'خالی خانے', // TODO(UR-review)
    allgood: 'سب خانے بھرے ہوئے لگتے ہیں', // TODO(UR-review)
    mapTitle: 'فارم کا نقشہ', // TODO(UR-review)
    boxes: 'خانے', // TODO(UR-review)
    required: 'ضروری', // TODO(UR-review)
    needFile: 'تصویر درکار ہے', // TODO(UR-review)
    mapAudio: 'guide_map',
  },
  safety: {
    title: 'ایک لمحے کے لیے رکیں', // TODO(UR-review)
    body: 'یہ کوڈ یا پن کسی ایسے شخص کو نہ بتائیں جو آپ کو فون کرے، چاہے وہ سرکاری ہی کیوں نہ لگے۔', // TODO(UR-review)
    audio: 'guide_safety',
  },
  kinds: {
    name: { title: 'نام', asks: 'اس خانے میں نام ویسے ہی لکھیں جیسا شناختی کارڈ پر ہے۔', format: 'ایک ایک حرف کر کے لکھیں', audio: 'kind_name' }, // TODO(UR-review)
    dob: { title: 'تاریخِ پیدائش', asks: 'اس خانے میں آپ کی پیدائش کی تاریخ لکھنی ہے۔', format: '07-03-1958', audio: 'kind_dob' }, // TODO(UR-review)
    id_number: { title: 'شناختی کارڈ نمبر', asks: 'اس خانے میں شناختی کارڈ کا 13 ہندسوں والا نمبر لکھنا ہے۔', format: 'صرف ہندسے، جب تک فارم ڈیش نہ دکھائے', audio: 'kind_id_number' }, // TODO(UR-review)
    phone: { title: 'موبائل نمبر', asks: 'اس خانے میں آپ کا موبائل نمبر لکھنا ہے۔', format: '0300-1234567', audio: 'kind_phone' }, // TODO(UR-review)
    email: { title: 'ای میل', asks: 'اگر آپ کا ای میل ہے تو اس خانے میں لکھیں۔', format: 'name@example.com', audio: 'kind_email' }, // TODO(UR-review)
    address: { title: 'پتہ', asks: 'اس خانے میں آپ کا پتہ لکھنا ہے: مکان، گلی، علاقہ اور شہر۔', format: 'شناختی کارڈ کی پچھلی طرف سے دیکھ کر لکھیں', audio: 'kind_address' }, // TODO(UR-review)
    choice: { title: 'انتخاب', asks: 'اس خانے میں فہرست سے ایک جواب چننا ہے۔', format: 'ایک جواب پر ٹیپ کریں', audio: 'kind_choice' }, // TODO(UR-review)
    file: { title: 'تصویر یا فائل', asks: 'اس خانے میں کوئی تصویر یا اسکین کیا ہوا کاغذ لگانا ہے۔', format: 'روشن، سیدھی، چاروں کونے نظر آئیں', audio: 'kind_file' }, // TODO(UR-review)
    checkbox: { title: 'ٹِک والا خانہ', asks: 'اس خانے پر ٹِک لگا کر بتانا ہے کہ آپ متفق ہیں۔', format: 'پہلے ساتھ لکھی بات پڑھ لیں', audio: 'kind_checkbox' }, // TODO(UR-review)
    generic: { title: 'خانہ', asks: 'اس خانے کے اوپر لکھے الفاظ پڑھیں۔ وہ بتاتے ہیں کہ کیا لکھنا ہے۔', audio: 'kind_generic' }, // TODO(UR-review)
  },
};

export const GUIDE_TEXT: { ur: GuideStrings; en: GuideStrings } = { ur, en };

// Spoken line for the form map (audio id guide_map). Not part of GuideStrings.
export const GUIDE_MAP_LINE = {
  en: 'This is the form map. It shows how many boxes the form has and which ones are still empty.',
  ur: 'یہ فارم کا نقشہ ہے۔ اس میں دکھایا گیا ہے کہ فارم میں کتنے خانے ہیں اور کون سے ابھی خالی ہیں۔', // TODO(UR-review)
};
