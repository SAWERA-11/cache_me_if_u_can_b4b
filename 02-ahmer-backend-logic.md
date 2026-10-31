# Ahmer Ali: backend and logic (Mashq)

Put this file in the repo at `docs/team/02-ahmer-backend-logic.md`. In VS Code chat (Codex or Claude), first paste the **session starter** (section 5), then paste **one task prompt at a time** (section 6). Review, run the check, commit, then do the next task.

---

## 1. Your role and boundaries

**Role:** backend and logic. You build everything that is not a screen: the shared types, the store, the lesson runner, the scoring and adaptation, the audio player, the helper matcher, the video client and the optional server. Your code is the brain that Anas's screens call.

**You may create or edit:**
- `src/engine/**`
- `src/store/**`
- `src/lib/**`
- `src/helper/**` (the matcher; the Helper sheet UI belongs to Anas)
- `src/video/**`
- `server/**`

**You must NOT edit** (ask the owner instead):
- `app/**`, `src/components/**`, `src/theme/**`, `package.json`, `app.json` → Anas
- `app/guide.tsx`, `src/guide/**`, `src/forms/**`, `eas.json`, `README.md` → Maaz
- `src/content/**`, `content/**`, `tools/**`, `assets/audio/**`, `src/audio/**` → Savera

**Out of bounds examples:** building any screen or component, writing Urdu text or lesson content, changing the Guide script, deploying the server (Maaz deploys), adding packages (ask Anas).

**Important rules for your files:**
- `src/engine/**` (except `useRunner.ts`) must be **pure TypeScript**: no `react`, no `react-native`, no Expo imports, so it can be tested in Node with `npx tsx` (no extra install).
- Anything that uses React (hooks) goes in `useRunner.ts` and `src/lib/*.ts` files that need it.

**You are blocking others, so push in this order:** (1) `types.ts` and `validators.ts` by about 1:00 PM, (2) store, lib, audio, uiBus, `useT` by about 1:15 PM, (3) `useRunner` v0 by about 1:45 PM.

---

## 2. Context pack (identical in all four team files)

**Project.** Mashq (مشق, "practice"), Build4Better hackathon at NED University, Saturday 31 October 2026. Build window ends 5:00 PM PKT, our submission target is 4:45 PM. An Android app for parents and grandparents who avoid online forms because they fear breaking something or looking foolish. It teaches them to do the task themselves and never does it for them. Urdu first.

**Team.** Anas (frontend) · Ahmer Ali (backend and logic) · Maaz Ali (Guide, testing, deployment, submission) · Savera (content, audio, general).

**Core loop.** Try (safe practice on a fictional "Citizen Services Portal (Practice)") → Surprise (8 planted "hiccups", each with one calm recovery habit) → Teach (advise a confused neighbour) → Check and submit → Finish (three-rung independence ladder). Extras: Guide switch (a WebView with an injected script that explains form fields on web forms), jargon tap, helper chat (chips first, curated answers), Find a video, fridge card.

**Stack.** Expo (latest SDK), React Native, TypeScript (strict), Expo Router, Zustand, react-native-webview, expo-audio, Fuse.js, and a small optional Express server. Right-to-left layout is done by hand with the `useDir()` helper (no `I18nManager`). Offline first: everything works without internet except optional live video search.

**Design rules (never break these).**
- Body text at least 20sp (three levels: 20, 24, 28). Tap targets at least 56dp. One idea per screen. High contrast.
- Never a red error or red X. Never blame the person (describe the box or step, not the user). No timers, no scores, streaks, badges or leaderboards.
- A visible "PRACTICE, nothing is real" banner on practice screens.
- No real personal data anywhere. The Practice Person is fictional.
- The Guide never reads or sends what a user types.
- Never use a real organisation's name or logo.
- Use logical direction helpers; never hard-code left or right.

**Folder owners.**

| Folder or file | Owner |
|---|---|
| `app/**` (except `app/guide.tsx`), `src/components/**`, `src/theme/**`, `assets/fonts/**`, `package.json`, `app.json` | Anas |
| `src/engine/**`, `src/store/**`, `src/lib/**`, `src/helper/**`, `src/video/**`, `server/**` | Ahmer |
| `app/guide.tsx`, `src/guide/**`, `src/forms/**`, `eas.json`, `README.md`, `docs/guide-tests.md`, `docs/bugs.md` | Maaz |
| `src/content/**`, `content/**`, `tools/**`, `assets/audio/**`, `src/audio/**`, `docs/interviews.md`, `docs/pitch.md` | Savera |

**Rules for AI assistants (also in the session starter).**
1. Edit only files in the owner's paths. If a change is needed elsewhere, STOP and write a two-line message for me to send to the owner.
2. Do not install or remove dependencies. If one seems needed, tell me the package name and why. Anas decides.
3. Do not change shared contracts (types or function signatures). If a contract looks wrong, stop and tell me.
4. Do only the task pasted. No extra features, no refactors outside the task, no renaming.
5. TypeScript strict. Run `npx tsc --noEmit` and fix errors in your own files.
6. If unsure of Urdu wording, write it and mark `// TODO(UR-review)`. Never invent facts.
7. No secrets in code. No real names, numbers or logos.
8. Keep answers short. List the files you changed.

---

## 3. Shared contracts (you WRITE most of these)

```ts
// ---------- src/engine/types.ts (owner: Ahmer; everyone imports from here) ----------
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

// ---------- src/engine/validators.ts (Ahmer) ----------
isName(s): boolean;  isDob(s): boolean /* DD-MM-YYYY */;  isId(s): boolean /* 13 digits, optional dashes */;  isPhone(s): boolean /* 03XX-XXXXXXX */;

// ---------- src/store/useApp.ts (Ahmer) ----------
useApp(selector) -> { language: Lang; textLevel: 0|1|2; audioSpeed: 0.8|1; consented: boolean; guideOn: boolean;
  shareProgress: boolean; results: {lessonId:string; ts:number; score:number; rung:0|1|2; strength:string}[];
  struggles: Record<string, number>; comfort: {lessonId:string; before?:number; after?:number}[];
  set(partial): void; addStruggle(kind: string): void; reset(): void }

// ---------- src/lib/* (Ahmer) ----------
useT(): (key: string) => string          // reads STRINGS and the current language; returns the key if missing
playClip(id?: string, rate?: number): boolean;  stopClip(): void;  hasClip(id?: string): boolean;
uiBus: { emit(e: 'jargon' | 'helper', payload: unknown): void; on(e: 'jargon' | 'helper', fn: (p: unknown) => void): () => void };
ltr(s: string): string                   // wraps digits/IDs so they stay left-to-right inside Urdu text

// ---------- src/engine/useRunner.ts (Ahmer) ----------
useRunner(lessonId: string): {
  lesson: Lesson; step: Step; stepIndex: number; total: number;
  input: string; openLayers: { asks: boolean; where: boolean; format: boolean; ifUnsure: boolean };
  highlightField: string | null;           // e.g. 'phone' after the vague error
  hiccup: HiccupId | null; oops: { consequence: Bi; fix: Bi } | null;
  canUndo: boolean; done: boolean; receiptNo: string | null; result: LessonResultView | null;
  actions: { setInput(v: string): void; submit(): void; openLayer(l: 'asks'|'where'|'format'|'ifUnsure'): void;
    stuck(): void; undo(): void; reveal(): void; resolveHiccup(): void; dismissOops(): void;
    backPressed(): void; exit(): void; replayAudio(): void };
}

// ---------- src/helper/matcher.ts and src/video/api.ts (Ahmer) ----------
matchQuestion(q: string): KBEntry | null;   looksLikeSecret(q: string): boolean;
fetchVideos(q: string): Promise<{ items: { id: string; title: string; channel?: string; checked?: boolean }[];
  source: 'curated' | 'cache' | 'live' | 'none' }>;

// ---------- src/content/* (Savera) ----------
LESSON1: Lesson;  HICCUPS: Record<HiccupId, Hiccup>;  GLOSSARY: GlossaryTerm[];
STRINGS: Record<string, Bi>;  KB: KBEntry[];  VIDEOS: VideoItem[];  GUIDE_TEXT: { ur: GuideStrings; en: GuideStrings };

// ---------- src/audio/audioMap.ts (generated by Savera) ----------
AUDIO: Record<string, number>;

// ---------- src/guide/* and app/guide.tsx (Maaz) ----------
buildLens(lang: Lang): string;  handleGuideMessage(raw: string): void;  export default GuideScreen;

// ---------- src/components/* (Anas) ----------
BigButton, AudioButton({ clipId?, label? }), StuckButton, Banner, Row, Sheet, IdCard, GlobalSheets (listens to uiBus)
```

Lesson 1 step ids that Savera will use (your tests and rules rely on them): `ready`, `name`, `father`, `dob`, `id`, `phone`, `city`, `domicile`, `session`, `photo`, `otp`, `review`, `submit`.

---

## 4. Rules your runner must implement (from the plan)

**Per-step event** (a `StepEvent` is created on entering a step and saved when the step completes or is exited):
- First user action sets `firstActionMs = now - enteredAt` (once).
- `openLayer` increases `hintTaps` only the first time that layer is opened on the step.
- `submit` on a field: if `expected(input, persona)` is true → `completed = true`, save the event, go to the next step. If false → `wrongAttempts += 1`, set `oops` from `step.oops` (or a generic default), stay on the step.
- `stuck` increases `stuckTaps` and goes back one step with the previous input restored.
- `undo` restores the previous input of the current step, increases `undoTaps`.
- `reveal` (after 3 wrong attempts or from the helper) sets `revealedAnswer = true` and fills the expected answer.
- `replayAudio` increases `audioReplays`.
- `exit` saves an event with `exited = true` and stores a resume pointer.

**Hiccup placements in Lesson 1** (drive them from `step.hiccup`, plus these specials):
| Step | Hiccup | When | Special behaviour |
|---|---|---|---|
| `dob` | wrong_format | `wrong` | first wrong attempt shows the hiccup, then oops stays available |
| `id` | find_answer | `enter` | UI flips the ID card on request (Anas) |
| `domicile` | unknown_word | `enter` | |
| `session` (info step) | logged_out | `enter` | once only; answers kept |
| `photo` | upload_rejected | `wrong` | choice ids: the one with `correct: true` succeeds |
| `otp` | verification_code | `enter` | |
| `submit` | vague_error | `submit_first` | set `highlightField = 'phone'`; the second submit succeeds and creates `receiptNo` like `MASHQ-482913` |
| any | back_fear | `backPressed()` | only if mid-lesson; shows the hiccup instead of leaving |
A hiccup is **recovered unaided** if no `hintTaps` or `stuckTaps` were recorded between its appearance and `resolveHiccup()`.

**Estimate** (use exactly):
- Step score: 0 if revealed, exited or not completed; 1.0 if completed with no hints, no wrong attempts, no stuck taps; 0.75 if completed with 0 hints, exactly 1 wrong attempt, no stuck taps; 0.5 if no stuck taps and (1 hint or 2 wrong attempts); otherwise 0.25.
- Lesson score = mean of step scores over steps that were completed, exited or revealed (skip `info` steps).
- Rung: score ≥ 0.8 → 2 ("on my own"), ≥ 0.45 → 1 ("with a little help"), else 0 ("with the guide beside me").
- Hesitation flag: `firstActionMs > 2.5 × baseline` (baseline = median of the person's earlier `firstActionMs`, or 20000 if none). The flag never lowers the score.
- Strength message: choose the best moment: unaided hiccup recovery → `strength_unaided_recovery`; fewer hints than the previous lesson → `strength_fewer_hints`; no wrong attempts on a check step → `strength_careful_check`; else `strength_default`. These are string keys in `STRINGS` (Savera). Return a `Bi` by reading `STRINGS[key]` (fall back to a plain English sentence if missing).
- Adaptation plan (pure function): `planNext({ last2: number[], failedRecoveries: Record<string, number>, struggles: Record<string, number> })` returns `{ extraHintCards, workedExampleFirst, fadeHints, refresherKinds, hiccupMix }`: two failed recoveries of the same hiccup → extra hints and a worked example first; two lessons ≥ 0.8 → fade hints and `hiccupMix: 'harder'`; struggles ≥ 3 for a field kind → add it to `refresherKinds`.

---

## 5. Session starter prompt (paste first in every new chat)

```text
You are my coding assistant for the Mashq hackathon app. I am Ahmer Ali, the backend and logic developer.
Read docs/team/02-ahmer-backend-logic.md completely before answering (it contains my boundaries, the shared contracts and the rules the runner and estimate must follow).
Rules for this whole chat:
1. Only create or edit files in: src/engine/**, src/store/**, src/lib/**, src/helper/**, src/video/**, server/**.
2. If a change is needed in any other folder, STOP and write me a two-line message to send to the owner (Anas: app, components, theme, package.json. Maaz: guide, forms, eas.json, README. Savera: content, audio, tools, docs).
3. Do not change the shared contracts in section 3. Implement them exactly (names, parameters, return types).
4. src/engine/** except useRunner.ts must be pure TypeScript with no react or react-native imports.
5. Do not add dependencies. If one is needed, tell me the package and why.
6. Only do the task I paste. No extra features, no screens, no refactors outside it.
7. TypeScript strict. Tests use node:assert and run with: npx tsx <file>.
8. Keep answers short and list the files you changed.
Reply "ready" and wait for my first task.
```

---

## 6. Tasks and prompts

Times assume you start at 12:45 PM. Until Anas pushes the scaffold (about 1:15 PM), write your files in a temporary folder outside the repo and copy them in after `git pull`.

### B1. Types and validators (12:45 – 13:00) [push first]

```text
Task B1: create src/engine/types.ts exactly as written in section 3 of docs/team/02-ahmer-backend-logic.md (copy the type definitions verbatim, add 'export' to all, no changes).
Create src/engine/validators.ts exporting isName, isDob, isId, isPhone:
- isName(s): trimmed length >= 2 and contains at least one letter (Latin or Urdu).
- isDob(s): /^\d{2}-\d{2}-\d{4}$/ and day 1-31, month 1-12, year 1900-2026.
- isId(s): /^\d{5}-?\d{7}-?\d$/ after trim.
- isPhone(s): /^03\d{2}-?\d{7}$/ after trim.
Create src/engine/__tests__/validators.test.ts using node:assert with at least 3 valid and 3 invalid cases per function, runnable with npx tsx.
No react imports anywhere. List the files created.
```

### B2. Store, storage, audio, bus, translation (13:00 – 13:30)

```text
Task B2: create these files.
1. src/lib/storage.ts: kv.get<T>(key, default), kv.set(key, value), kv.clear() over @react-native-async-storage/async-storage with try/catch.
2. src/store/useApp.ts: a Zustand store persisted with createJSONStorage over AsyncStorage, name 'mashq-state', with exactly these fields and actions: language ('ur' default), textLevel (0), audioSpeed (1), consented (false), guideOn (false), shareProgress (false), results (array, keep last 10), events (array of StepEvent, keep last 300), struggles (Record<string, number>), baselineMs (number | null), comfort (array), set(partial), addEvent(e), addResult(r), addStruggle(kind), reset(). Also make guideOn reset to false on every cold start (do this in onRehydrateStorage). Export types.
3. src/lib/audio.ts: playClip(id, rate), stopClip(), hasClip(id) using expo-audio createAudioPlayer and the AUDIO map from '../audio/audioMap' (Savera generates it; until then create nothing in that folder and import it anyway; I will confirm it exists). playClip returns false if the id is missing and never throws. Add setAudioModeAsync({ playsInSilentMode: true }) in an initAudio() function. Check the exact expo-audio API names in the installed version and tell me if any differ from createAudioPlayer / replace / play / pause.
4. src/lib/uiBus.ts: a tiny typed event emitter with emit(e, payload) and on(e, fn) returning an unsubscribe function. Events: 'jargon' and 'helper'.
5. src/lib/ltr.ts: ltr(s) = '‪' + s + '‬'.
6. src/lib/t.ts: useT() hook returning (key) => string, reading STRINGS from '../content' and the language from useApp; returns the key itself when missing. Also export a non-hook tr(key, lang) for use outside React.
7. src/lib/normalizeUrdu.ts: lower-case, remove Arabic diacritics U+064B-U+065F and U+0670, remove tatweel U+0640, map U+064A and U+0649 to U+06CC, U+0643 to U+06A9, U+0647 to U+06C1, replace punctuation with spaces, collapse whitespace.
Constraints: only these files; no new dependencies; strict TypeScript.
```

### B3. Runner reducer and hook (13:30 – 14:30)

```text
Task B3: build the lesson runner.
Create src/engine/runner.ts (PURE TypeScript, no react imports): a reducer for the state and actions described in section 4 of docs/team/02-ahmer-backend-logic.md. Include: RunState type, Action union, createInitialState(lesson, resumeIndex?), reduce(state, action, now), helpers newEvent(lessonId, stepId), and pure helpers to decide hiccups from step.hiccup and the special cases in the hiccup table (submit_first -> vague_error with highlightField 'phone'; second submit succeeds and sets receiptNo as 'MASHQ-' + 6 digits; backPressed mid-lesson -> back_fear; 'session' info step triggers logged_out once).
Create src/engine/useRunner.ts exporting useRunner(lessonId) that uses useReducer, loads the lesson (import LESSONS from '../content' by id; until Savera pushes, accept a lesson via an optional second parameter for tests), exposes exactly the contract in section 3, saves StepEvents into useApp.addEvent when a step completes or is exited, and on finishing computes the result via src/engine/estimate.ts (task B5) or a stub returning { score: 0, rung: 0, strength: {ur:'', en:''}, hiccupsShown: 0, hiccupsRecovered: 0 } until B5 exists.
Create src/engine/__tests__/runner.test.ts that plays a small fixture lesson (define it inside the test file, 4 steps) with scripted actions and asserts: events recorded, wrongAttempts counted, hintTaps only once per layer, stuck goes back one step, hiccup shown and resolved, receipt created, final state done. Run with npx tsx.
Do not import any screen or component. List files created.
```

### B4. Hiccup and oops defaults (14:15 – 14:30, part of B3)

```text
Task B4: in src/engine/oopsDefaults.ts export a function defaultOops(fieldKind) returning { consequence: Bi, fix: Bi } with calm English text and Urdu left as '' with // TODO(UR-review), for each FieldKind (name, dob, id_number, phone, choice, text, file, code). The consequence says what would happen in real life, the fix says what to do, never blames the person. Use it in the runner when a step has no oops.
```

### B5. Estimate and adaptation (14:30 – 15:15)

```text
Task B5: create src/engine/estimate.ts and src/engine/adaptation.ts (PURE TypeScript).
estimate.ts exports: stepScore(e: StepEvent): number, lessonScore(events: StepEvent[]): number, rungFor(score): 0|1|2, median(nums), isHesitant(firstActionMs, baselineMs|null), pickStrength(events, previousEvents?, hiccupRecoveries): Bi (keys: strength_unaided_recovery, strength_fewer_hints, strength_careful_check, strength_default read through a passed-in lookup function so the module stays pure), buildResult(events, previousEvents, hiccupsShown, hiccupsRecovered, lookup): LessonResultView.
adaptation.ts exports planNext as described in section 4.
Follow the scoring rules in section 4 exactly. Write src/engine/__tests__/estimate.test.ts covering: perfect lesson (rung 2), a lesson with hints and wrong attempts (rung 1), a lesson with revealed answers (rung 0), info steps ignored, planNext for two strong lessons, planNext for two failed recoveries. Run with npx tsx. Then wire buildResult into useRunner (replace the stub) and save the result to useApp.addResult.
```

### B6. Helper matcher (15:15 – 15:45)

```text
Task B6: create src/helper/matcher.ts.
Build a Fuse.js index from KB (import { KB } from '../content') where each row is { id, text: normalizeUrdu(variant) } for every variant of every entry. Options: keys ['text'], includeScore true, threshold 0.4, ignoreLocation true.
Export matchQuestion(q): normalize the query, search, return the KBEntry of the best hit if its score <= 0.45, else null.
Export looksLikeSecret(q): true if the text (after removing dashes and spaces) contains a run of 9 or more digits, or two groups of 4 digits, or the words 'password' / 'pin' followed by digits.
Export matchChip(chipId): KBEntry | null using a small map defined in the file: chip_word, chip_box, chip_error, chip_logged_out, chip_safe, each mapped to a KB entry id (use placeholders; I will correct after Savera finishes KB) and fall back to null.
Write src/helper/__tests__/matcher.test.ts with 10 sample questions (use fixture KB entries defined inside the test, not the real KB) covering exact match, spelling variants, Roman Urdu, no match, and secret detection. Run with npx tsx.
```

### B7. Video client and server (15:30 – 16:15, server draft can start earlier in a temp folder)

```text
Task B7: create the video pieces.
1. src/video/config.ts: export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? ''.
2. src/video/cache.json: start as {} (Savera/Ahmer will pre-warm it later).
3. src/video/api.ts: fetchVideos(q). Order: (a) match q against VIDEOS (import from '../content') by topic tags and title words and return those as source 'curated' with checked true; (b) look up normalized q in cache.json and return source 'cache'; (c) if API_URL is set, call `${API_URL}/api/videos?q=...` with a 5 second timeout (AbortController) and return source 'live'; (d) otherwise or on any error return { items: [], source: 'none' }. Never throw. Before any network call, if looksLikeSecret(q) return { items: [], source: 'none' }.
4. server/index.js and server/package.json: an Express server (ES modules, Node 18+, built-in fetch) with GET /api/videos?q= that: rejects empty q, rejects queries with 9+ digits, serves from an in-memory cache persisted to cache.json, otherwise calls the YouTube Data API v3 search.list with part=snippet, type=video, maxResults=3, q + ' اردو', videoEmbeddable=true, videoDuration=short, safeSearch=strict, relevanceLanguage=ur, regionCode=PK, key from process.env.YOUTUBE_API_KEY, maps results to { id, title, channel }, handles 403 as 429 quota error, has a tiny per-IP rate limit (30 requests), CORS enabled. Add server/.env.example (YOUTUBE_API_KEY=, PORT=8787) and server/README.md with run steps.
Never put a real API key in any file. List the files created.
```
When ready: tell Maaz to deploy `server/` (any free Node host, root `server`, start command `node index.js`, env var `YOUTUBE_API_KEY`). Maaz gives you the URL; Anas or you put it in `.env` as `EXPO_PUBLIC_API_URL`. The app must still work with no server.

### B8. Privacy check and support (16:15 – 16:45)

```text
Task B8: review my files for privacy and correctness.
1. Search src/engine, src/store, src/lib, src/helper, src/video, server for anything that stores or sends personal data. The only stored data allowed: language, text level, audio speed, consent, guideOn (reset at start), step events (counts, no typed text), results, struggle counts, comfort answers. Typed answers must NOT be stored or sent. Confirm and fix.
2. Confirm no network call happens except the optional video search, and that it never includes digits that look like secrets.
3. Run all tests (npx tsx on each test file) and report pass/fail.
4. Create docs/api.md (in docs/, allowed for this task only) listing every exported function and its purpose in one line.
Report anything suspicious. Do not touch other folders.
```

---

## 7. Done checklist

- [ ] `types.ts` and `validators.ts` pushed by about 1:00 PM; store, lib, `useT`, `uiBus`, `playClip` by about 1:15 PM; `useRunner` v0 by about 1:45 PM.
- [ ] Runner test plays a fixture lesson end to end (all `npx tsx` tests pass).
- [ ] Estimate returns the right rung for the three test lessons; `planNext` works.
- [ ] `matchQuestion` answers at least 14 of 20 test questions; unmatched ones return `null`.
- [ ] `fetchVideos` never throws and works with the server off.
- [ ] No typed answers stored or sent. `npx tsc --noEmit` passes.
- [ ] Everything committed and pushed.

---

## 8. Commit routine (every 20 to 30 minutes)

```bash
git pull --rebase origin main
npx tsc --noEmit
npx tsx src/engine/__tests__/runner.test.ts        # run the tests that exist
git add src/engine src/store src/lib src/helper src/video server docs/api.md
git commit -m "feat(engine): lesson runner reducer and hook"
git pull --rebase origin main
git push
```
Tell the group in the chat whenever you push something others depend on (types, store, hook).

---

## 9. If you are blocked

- Lesson content is not there yet: test with your own fixture lesson inside the test file.
- A contract seems wrong or incomplete (for example Anas needs the answers list on the review screen): do not change signatures silently. Message Anas and Savera, agree the change, then update this file's contract section for all four people.
- Out of time: cut in this order: B7 live server (keep curated and cache), then B6 chip map polish, then B4 defaults. Never cut B1, B2, B3, B5.
- Server deployment is Maaz's job. Never deploy it yourself.
