// Shared contract types now come from Ahmer's src/engine/types.ts. Only the Runner shape is local.
import type { Bi, HiccupId, Lesson, LessonResultView, Step } from '../../engine/types';

export type {
  Bi, FieldKind, GlossaryTerm, Hiccup, HiccupId, KBEntry, Lang, Lesson, LessonResultView, Persona, Step,
} from '../../engine/types';

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
