// TODO: wire to real hook. Temporary local fakes for modules owned by Ahmer (store, lib,
// engine, helper, video) and Savera (content). Delete this file and re-point
// src/theme/wire/index.ts at the real modules once they land.
import { useCallback, useMemo, useRef, useState } from 'react';
import { create } from 'zustand';
import type {
  Bi, GlossaryTerm, Hiccup, HiccupId, KBEntry, Lang, LayerName, Lesson, Persona, Runner,
} from './types';

// ---------- store ----------
type AppState = {
  language: Lang; textLevel: 0 | 1 | 2; audioSpeed: 0.8 | 1; consented: boolean; guideOn: boolean;
  shareProgress: boolean;
  results: { lessonId: string; ts: number; score: number; rung: 0 | 1 | 2; strength: string }[];
  struggles: Record<string, number>;
  comfort: { lessonId: string; before?: number; after?: number }[];
  exitedLessonId: string | null; // TODO: Ahmer to expose the real "exited lesson" flag
  set(partial: Partial<Omit<AppState, 'set' | 'addStruggle' | 'reset'>>): void;
  addStruggle(kind: string): void;
  reset(): void;
};
const initial = {
  language: 'ur' as Lang, textLevel: 0 as 0 | 1 | 2, audioSpeed: 1 as 0.8 | 1, consented: false,
  guideOn: false, shareProgress: false, results: [], struggles: {}, comfort: [],
  exitedLessonId: null,
};
export const useApp = create<AppState>((set) => ({
  ...initial,
  set: (partial) => set(partial),
  addStruggle: (kind) =>
    set((s) => ({ struggles: { ...s.struggles, [kind]: (s.struggles[kind] ?? 0) + 1 } })),
  reset: () => set({ ...initial }),
}));

// ---------- strings ----------
const S = (en: string, ur = ''): Bi => ({ en, ur });
export const STRINGS: Record<string, Bi> = {
  start: S('Start'), listen: S('Listen'), stuck: S('I am stuck'), helper: S('Help'),
  practice_banner: S('PRACTICE, nothing is real'), next: S('Next'), back: S('Back'),
  undo: S('Undo'), try_again: S('Try again'), got_it: S('Got it'),
  take_a_moment: S('Take a moment'), yes: S('Yes'), no: S('No'),
  continue_card: S('Continue where you stopped'), welcome_back: S('Welcome back'),
  consent_title: S('Before we begin'),
  consent_line1: S('This is practice. Nothing here is real.'),
  consent_line2: S('You will never be rushed, and nothing is scored.'),
  consent_line3: S('Please do not type your own private details.'),
  home_title: S('What would you like to do?'), lessons: S('Lessons'),
  find_help: S('Find help'), guide_me: S('Guide me on websites'),
  guide_on_badge: S('Guide is on'), settings: S('Settings'),
  step_of: S('{n} of {total}'),
  layer_asks: S('What does it ask?'), layer_where: S('Where do I find it?'),
  layer_format: S('How do I write it?'), layer_unsure: S('If I am not sure'),
  oops_title: S('That is okay. Here is what happens next.'), oops_fix: S('How to put it right'),
  sms_banner: S('A message arrived: your code is {code}'),
  session_expired: S('The page asks you to log in again. This is normal.'),
  log_in_again: S('Log in again'),
  review_title: S('Look over your answers'), read_aloud: S('Read aloud'), submit: S('Submit'),
  receipt_title: S('Your practice receipt'), receipt_save: S('Keep this number safe.'),
  result_title: S('Well done'), rung_0: S('With a lot of help'), rung_1: S('With a little help'),
  rung_2: S('On your own'), comfort_q: S('How do you feel about doing this on your own?'),
  comfort_ok: S('I feel fine'), comfort_unsure: S('A little unsure'), comfort_notyet: S('Not yet'),
  next_lesson: S('Next lesson'), practise_again: S('Practise again'),
  fridge_card: S('Fridge card'), share_whatsapp: S('Share on WhatsApp'),
  wa_training_wheels: S('I am practising online forms with the Mashq app. It is safe and calm.'),
  wa_share_app: S('Try the Mashq app, it teaches online forms step by step.'),
  find_video_title: S('Find a video'), checked_by_team: S('Checked by our team'),
  from_youtube: S('From YouTube'), video_helped_q: S('Did the video help?'),
  video_banner: S('Videos are only a help. Nothing here is real.'),
  helper_title: S('Ask for help'), helper_unsure: S('I am not sure about that. Try asking another way.'),
  secret_warning: S('That looks private. Please do not type codes or numbers here.'),
  jargon_title: S('What this word means'),
  settings_text_size: S('Text size'), settings_audio_speed: S('Audio speed'),
  settings_language: S('Language'), settings_reset: S('Reset my data'),
  settings_share_progress: S('Share my progress'), settings_about: S('Mashq helps you practise online forms safely. It never does the task for you.'),
};

export function useT(): (key: string) => string {
  const language = useApp((s) => s.language);
  return useCallback(
    (key: string) => {
      const e = STRINGS[key];
      if (!e) return key;
      return e[language] || e.en || key;
    },
    [language],
  );
}

// ---------- audio / bus / ltr ----------
export const playClip = (_id?: string, _rate?: number): boolean => false;
export const stopClip = (): void => {};
export const hasClip = (_id?: string): boolean => false;

type BusEvent = 'jargon' | 'helper';
const listeners: Record<BusEvent, Set<(p: unknown) => void>> = { jargon: new Set(), helper: new Set() };
export const uiBus = {
  emit(e: BusEvent, payload: unknown) { listeners[e].forEach((fn) => fn(payload)); },
  on(e: BusEvent, fn: (p: unknown) => void) { listeners[e].add(fn); return () => { listeners[e].delete(fn); }; },
};
export const ltr = (s: string): string => '‪' + s + '‬';

// ---------- content ----------
export const HICCUPS: Record<HiccupId, Hiccup> = (() => {
  const h = (id: HiccupId, happened: string, habit: string): Hiccup =>
    ({ id, happened: S(happened), habit: S(habit), audio: 'hic_' + id });
  return {
    vague_error: h('vague_error', 'The page said there was a problem but did not say where.', 'Read slowly, then check each box one by one.'),
    wrong_format: h('wrong_format', 'The box did not like how the date was written.', 'Look at the grey example under the box.'),
    unknown_word: h('unknown_word', 'A word on the page was new to you.', 'Tap the word to see what it means.'),
    find_answer: h('find_answer', 'The page asked for something you do not remember.', 'Look at your card or ask someone you trust.'),
    logged_out: h('logged_out', 'The page logged you out.', 'Log in again. Nothing is lost.'),
    upload_rejected: h('upload_rejected', 'The page did not accept the photo.', 'Try a clearer photo.'),
    verification_code: h('verification_code', 'A code arrived by message.', 'Type the code only on the page you opened.'),
    back_fear: h('back_fear', 'You wondered if going back would break something.', 'Going back is safe. Your answers stay.'),
  };
})();

export const GLOSSARY: GlossaryTerm[] = [
  { id: 'domicile', term: S('Domicile'), plain: S('The place you officially belong to.'),
    analogy: S('Like the address on your family register.'), audio: 'gl_domicile', pattern: 'domicile' },
];

const PERSONA: Persona = {
  name: 'Sample Person', father: 'Sample Father', dobWords: 'First of January 1980',
  dob: '01-01-1980', idNumber: '1234512345671', phone: '0300-1234567', city: 'Karachi', domicile: 'Sindh',
};
const bi = (en: string): Bi => ({ en, ur: '' });
export const LESSON1: Lesson = {
  id: 'lesson1', title: bi('Citizen Services Portal (Practice)'), persona: PERSONA,
  ready: [
    { id: 'r1', text: bi('Have the practice ID card ready') },
    { id: 'r2', text: bi('Keep your phone nearby for a code') },
  ],
  steps: [
    { id: 'ready', kind: 'info', label: bi('Get ready'), asks: bi('Get ready') },
    { id: 'name', kind: 'field', fieldKind: 'name', label: bi('Your name'), asks: bi('Type your full name.'),
      where: bi('It is on the front of the card.'), format: bi('Letters only.'), ifUnsure: bi('Copy it from the card.'),
      expected: (i, p) => i.trim().toLowerCase() === p.name.toLowerCase() },
    { id: 'dob', kind: 'field', fieldKind: 'dob', label: bi('Date of birth'), asks: bi('Type the day, month and year.'),
      where: bi('The card shows it in words.'), format: bi('DD-MM-YYYY'), example: '01-01-1980',
      expected: (i, p) => i === p.dob },
    { id: 'id', kind: 'field', fieldKind: 'id_number', label: bi('ID number'), asks: bi('Type the 13 digits.'),
      where: bi('It is on the back of the card.'), format: bi('13 digits'),
      expected: (i, p) => i.replace(/-/g, '') === p.idNumber },
    { id: 'phone', kind: 'field', fieldKind: 'phone', label: bi('Phone number'), asks: bi('Type the phone number.'),
      where: bi('It is on the front of the card.'), format: bi('03XX-XXXXXXX'),
      expected: (i, p) => i === p.phone },
    { id: 'code', kind: 'field', fieldKind: 'code', label: bi('Code from the message'), asks: bi('Type the code you received.'),
      example: '482915', expected: (i) => i === '482915' },
    { id: 'photo', kind: 'field', fieldKind: 'file', label: bi('Choose a photo'), asks: bi('Pick the clearest photo.'),
      choices: [{ id: 'p1', label: bi('Photo 1') }, { id: 'p2', label: bi('Photo 2'), correct: true }, { id: 'p3', label: bi('Photo 3') }] },
    { id: 'review', kind: 'review', label: bi('Review'), asks: bi('Review'),
      hiccup: { id: 'vague_error', when: 'submit_first' } },
  ],
};

// ---------- fake runner ----------
export function useRunner(lessonId: string): Runner {
  const lesson = LESSON1; // TODO: wire to real hook (lessonId ignored by fake)
  void lessonId;
  const [stepIndex, setIndex] = useState(0);
  const [input, setInputState] = useState('');
  const [openLayers, setLayers] = useState<Record<LayerName, boolean>>({ asks: false, where: false, format: false, ifUnsure: false });
  const [hiccup, setHiccup] = useState<HiccupId | null>(null);
  const [oops, setOops] = useState<Runner['oops']>(null);
  const [highlightField, setHighlight] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const submitted = useRef(false);
  const step = lesson.steps[stepIndex];

  const advance = (to: number) => {
    setIndex(to); setInputState(''); setOops(null);
    setLayers({ asks: false, where: false, format: false, ifUnsure: false });
  };

  const actions = useMemo<Runner['actions']>(() => ({
    setInput: setInputState,
    submit: () => {
      if (step.kind === 'info') return advance(stepIndex + 1);
      if (step.kind === 'field') {
        const ok = step.choices
          ? step.choices.find((c) => c.id === input)?.correct ?? false
          : step.expected?.(input, lesson.persona) ?? true;
        if (ok) return advance(stepIndex + 1);
        if (step.oops) setOops(step.oops);
        return;
      }
      if (!submitted.current) {
        submitted.current = true; setHiccup('vague_error'); setHighlight('phone');
        return;
      }
      setDone(true);
    },
    openLayer: (l) => setLayers((s) => ({ ...s, [l]: true })),
    stuck: () => setLayers({ asks: true, where: true, format: true, ifUnsure: true }),
    undo: () => advance(Math.max(0, stepIndex - 1)),
    reveal: () => {},
    resolveHiccup: () => setHiccup(null),
    dismissOops: () => setOops(null),
    backPressed: () => { if (stepIndex > 0) advance(stepIndex - 1); },
    exit: () => {},
    replayAudio: () => {},
  }), [step, stepIndex, input, lesson]);

  return {
    lesson, step, stepIndex, total: lesson.steps.length, input, openLayers, highlightField,
    hiccup, oops, canUndo: stepIndex > 0, done,
    receiptNo: done ? 'MSQ-482915' : null,
    result: done ? {
      score: 80, rung: 1, strength: bi('You read each box slowly and checked it.'),
      hiccupsShown: 1, hiccupsRecovered: 1,
    } : null,
    actions,
  };
}

// ---------- helper / video ----------
export const KB: KBEntry[] = [
  { id: 'kb_box', group: 'fields', variants: ['box', 'field'], answer: bi('A box is a place where you type one answer.'),
    tryNext: bi('Look at the grey example under the box.'), chips: ['chip_error'] },
];
export const looksLikeSecret = (q: string): boolean => /\d{6,}/.test(q);
export const matchQuestion = (q: string): KBEntry | null => {
  const t = q.toLowerCase();
  return KB.find((e) => e.variants.some((v) => t.includes(v))) ?? null;
};
export async function fetchVideos(_q: string): Promise<{
  items: { id: string; title: string; channel?: string; checked?: boolean }[];
  source: 'curated' | 'cache' | 'live' | 'none';
}> {
  return { items: [], source: 'none' };
}
