import type { Bi, GlossaryTerm, Hiccup, HiccupId, KBEntry, Lesson, VideoItem } from '../engine/types';

export type GuideStrings = {
  ui: { listen: string; helper: string; check: string; hide: string; missing: string; allgood: string;
        mapTitle: string; boxes: string; required: string; needFile: string; mapAudio: string };
  safety: { title: string; body: string; audio: string };
  kinds: Record<'name'|'dob'|'id_number'|'phone'|'email'|'address'|'choice'|'file'|'checkbox'|'generic',
                { title: string; asks: string; format?: string; audio: string }>;
};

const EMPTY: Bi = { ur: '', en: '' };

export const LESSONS: Record<string, Lesson> = {}; // TODO(content)

const hiccup = (id: HiccupId): Hiccup => ({ id, happened: EMPTY, habit: EMPTY, audio: `h_${id}` });
export const HICCUPS: Record<HiccupId, Hiccup> = { // TODO(content)
  vague_error: hiccup('vague_error'),
  wrong_format: hiccup('wrong_format'),
  unknown_word: hiccup('unknown_word'),
  find_answer: hiccup('find_answer'),
  logged_out: hiccup('logged_out'),
  upload_rejected: hiccup('upload_rejected'),
  verification_code: hiccup('verification_code'),
  back_fear: hiccup('back_fear'),
};

export const GLOSSARY: GlossaryTerm[] = []; // TODO(content)
export const STRINGS: Record<string, Bi> = {}; // TODO(content)
export const KB: KBEntry[] = []; // TODO(content)
export const VIDEOS: VideoItem[] = []; // TODO(content)

const kind = { title: '', asks: '', audio: '' };
const emptyGuide: GuideStrings = { // TODO(content)
  ui: { listen: '', helper: '', check: '', hide: '', missing: '', allgood: '',
        mapTitle: '', boxes: '', required: '', needFile: '', mapAudio: '' },
  safety: { title: '', body: '', audio: '' },
  kinds: { name: kind, dob: kind, id_number: kind, phone: kind, email: kind, address: kind,
           choice: kind, file: kind, checkbox: kind, generic: kind },
};
export const GUIDE_TEXT: { ur: GuideStrings; en: GuideStrings } = { ur: emptyGuide, en: emptyGuide }; // TODO(content)
