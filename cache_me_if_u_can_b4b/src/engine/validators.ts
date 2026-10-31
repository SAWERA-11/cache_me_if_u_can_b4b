const NAME_LETTER = /[A-Za-z\u0600-\u06FF]/;
const DOB = /^(\d{2})-(\d{2})-(\d{4})$/;
const ID = /^\d{5}-?\d{7}-?\d$/;
const PHONE = /^03\d{2}-?\d{7}$/;

export function isName(s: string): boolean {
  const value = s.trim();
  return value.length >= 2 && NAME_LETTER.test(value);
}

export function isDob(s: string): boolean {
  const match = DOB.exec(s.trim());
  if (!match) {
    return false;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  return day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2026;
}

export function isId(s: string): boolean {
  return ID.test(s.trim());
}

export function isPhone(s: string): boolean {
  return PHONE.test(s.trim());
}
