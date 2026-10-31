// TODO: wire to real hook. Temporary copy of the shared contracts (section 3 of
// docs/team/01-anas-frontend.md). Owner of the real file: Ahmer (src/engine/types.ts).
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
  example?: string;
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
export type LessonResultView = { score: number; rung: 0 | 1 | 2; strength: Bi;
  hiccupsShown: number; hiccupsRecovered: number };

export type LayerName = 'asks' | 'where' | 'format' | 'ifUnsure';

export type Runner = {
  lesson: Lesson; step: Step; stepIndex: number; total: number;
  input: string; openLayers: Record<LayerName, boolean>;
  highlightField: string | null;
  hiccup: HiccupId | null; oops: { consequence: Bi; fix: Bi } | null;
  canUndo: boolean; done: boolean; receiptNo: string | null; result: LessonResultView | null;
  actions: { setInput(v: string): void; submit(): void; openLayer(l: LayerName): void;
    stuck(): void; undo(): void; reveal(): void; resolveHiccup(): void; dismissOops(): void;
    backPressed(): void; exit(): void; replayAudio(): void };
};
