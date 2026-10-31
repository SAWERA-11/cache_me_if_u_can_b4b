// TODO: Savera supplies GUIDE_TEXT and GLOSSARY from ../content.
// English placeholders intentionally apply to both languages until reviewed Urdu arrives.
const kinds = {
  name: { title: 'Name', asks: 'This box asks for a name.', audio: 'guide_name' },
  dob: { title: 'Date of birth', asks: 'This box asks for a birth date.', format: 'Check the date order shown on the page.', audio: 'guide_dob' },
  id_number: { title: 'ID number', asks: 'This box asks for an identity number.', audio: 'guide_id' },
  phone: { title: 'Phone', asks: 'This box asks for a phone number.', audio: 'guide_phone' },
  email: { title: 'Email', asks: 'This box asks for an email address.', audio: 'guide_email' },
  address: { title: 'Address', asks: 'This box asks for an address.', audio: 'guide_address' },
  choice: { title: 'Choose an option', asks: 'Open the list and choose an option.', audio: 'guide_choice' },
  file: { title: 'Attach a file', asks: 'This box asks for a file from this device.', audio: 'guide_file' },
  checkbox: { title: 'Checkbox', asks: 'Read the statement before ticking this box.', audio: 'guide_checkbox' },
  generic: { title: 'A form box', asks: 'Read the label beside this box.', audio: 'guide_generic' },
};
export function buildDictionary(lang: 'ur' | 'en') {
  return {
    lang, placeholder: true,
    ui: { listen: 'Listen', helper: 'Helper', check: 'Check', hide: 'Hide', missing: 'Boxes still empty', allgood: 'No empty required boxes found. This does not check correctness.', mapTitle: 'Form map', boxes: 'boxes', required: 'required', needFile: 'A file is requested', mapAudio: 'guide_map' },
    safety: { title: 'Keep this private', body: 'This is a private box. The Guide does not inspect it. Never share a password, PIN, card detail or verification code.', audio: 'guide_safety' },
    kinds,
    glossary: [{ id: 'domicile', pattern: 'domicile' }],
  };
}
