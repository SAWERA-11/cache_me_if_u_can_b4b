export type Lang = 'ur' | 'en';
export type Bi = { ur: string; en: string };
export type FieldKind = 'name' | 'dob' | 'id_number' | 'phone' | 'choice' | 'text' | 'file' | 'code';
export type HiccupId = 'vague_error' | 'wrong_format' | 'unknown_word' | 'find_answer'
  | 'logged_out' | 'upload_rejected' | 'verification_code' | 'back_fear';
export type Persona = { name: string; father: string; dobWords: string; dob: string;
  idNumber: string; phone: string; city: string; domicile: string };
export type Step = {
  id: string; kind: 'info' | 'field' | 'review' | 'submit';
  fieldKind?: FieldKind;
  label: Bi; asks: Bi; where?: Bi; format?: Bi; ifUnsure?: Bi;
  example?: string;                                   // grey example; for 'code' steps it is the SMS code
  expected?: (input: string, p: Persona) => boolean;
  choices?: { id: string; label: Bi; correct?: boolean }[];
  oops?: { consequence: Bi; fix: Bi };
  hiccup?: { id: HiccupId; when: 'enter' | 'wrong' | 'submit_first' };
  glossary?: string[];
  audio?: { asks?: string; where?: string; format?: string; ifUnsure?: string };
};
export type Lesson = { id: string; title: Bi; persona: Persona;
  ready: { id: string; text: Bi; audio?: string }[]; steps: Step[] };
export type Hiccup = { id: HiccupId; happened: Bi; habit: Bi; audio: string };
export type GlossaryTerm = { id: string; term: Bi; plain: Bi; analogy: Bi; audio: string; pattern: string };
export type KBEntry = { id: string; group: 'words' | 'fields' | 'errors' | 'logged_out' | 'safety' | 'reassurance';
  variants: string[]; answer: Bi; tryNext: Bi; audio?: string; chips?: string[] };
export type VideoItem = { id: string; title: string; topic: string[]; minutes: number };
export type StepEvent = { lessonId: string; stepId: string; ts: number; firstActionMs: number;
  hintTaps: number; stuckTaps: number; wrongAttempts: number; undoTaps: number;
  audioReplays: number; revealedAnswer: boolean; completed: boolean; exited: boolean };
export type LessonResultView = { score: number; rung: 0 | 1 | 2; strength: Bi;
  hiccupsShown: number; hiccupsRecovered: number };
