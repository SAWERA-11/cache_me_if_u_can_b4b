# Anas: frontend (Mashq)

Put this file in the repo at `docs/team/01-anas-frontend.md`. In VS Code chat (Codex or Claude), first paste the **session starter** (section 5), then paste **one task prompt at a time** (section 6). Review the result, run it on your phone, commit, then do the next task. Do not paste several tasks at once.

---

## 1. Your role and boundaries

**Role:** frontend. You build every screen and every shared UI component, and you own the scaffold.

**You may create or edit:**
- `app/**` (all screens) **except** `app/guide.tsx`
- `src/components/**`
- `src/theme/**`
- `assets/fonts/**`
- `package.json`, `app.json`, lock file (you are the only person who installs packages)

**You must NOT edit** (ask the owner instead):
- `src/engine/**`, `src/store/**`, `src/lib/**`, `src/helper/**`, `src/video/**`, `server/**` → Ahmer
- `app/guide.tsx`, `src/guide/**`, `src/forms/**`, `eas.json`, `README.md` → Maaz
- `src/content/**`, `content/**`, `tools/**`, `assets/audio/**`, `src/audio/**`, `docs/interviews.md`, `docs/pitch.md` → Savera

**Out of bounds examples (do not do these even if they look easy):** writing lesson logic or scoring (Ahmer), writing Urdu text or glossary (Savera), changing the Guide script (Maaz), adding a package without telling the group, adding features not in your tasks, inventing a new screen.

**Depends on others:**
- Ahmer pushes `types.ts`, `useApp`, `useRunner`, `playClip`, `uiBus`, `useT` by about 1:00 to 1:30 PM. Until then build components with plain props, and wire to the real hooks when they land.
- Savera pushes content and the string keys. Until then use the key names in section 4 and show the key itself if a string is missing.

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

## 3. Shared contracts (types and signatures everyone agrees on)

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
BigButton({ label, onPress, variant?: 'primary'|'secondary'|'calm', disabled? })
AudioButton({ clipId?: string, label?: string })     // always shows text; plays through playClip
StuckButton({ onPress })    Banner()    Row({ children, style? })
Sheet({ visible, onClose, title, children })
IdCard({ persona, side?: 'front'|'back', highlight?: 'name'|'father'|'dob'|'id'|'phone'|null, onFlip? })
GlobalSheets()   // mounted once in app/_layout.tsx; listens to uiBus and shows the Jargon and Helper sheets on any screen
```

---

## 4. UI string keys you can rely on (Savera supplies all of them in `STRINGS`)

Use these exact keys with `useT()`. If one is missing, the key itself is shown, so you will notice.

```
start, listen, stuck, helper, practice_banner, next, back, undo, try_again, got_it, take_a_moment, yes, no, continue_card, welcome_back
consent_title, consent_line1, consent_line2, consent_line3
home_title, lessons, find_help, guide_me, guide_on_badge, settings
step_of            ("{n} of {total}", replace {n} and {total} yourself)
layer_asks, layer_where, layer_format, layer_unsure
oops_title, oops_fix, sms_banner ("{code}" placeholder), session_expired, log_in_again
review_title, read_aloud, submit, receipt_title, receipt_save
result_title, rung_0, rung_1, rung_2, comfort_q, comfort_ok, comfort_unsure, comfort_notyet, next_lesson, practise_again
fridge_card, share_whatsapp, wa_training_wheels, wa_share_app
find_video_title, checked_by_team, from_youtube, video_helped_q, video_banner
helper_title, helper_unsure, secret_warning, jargon_title
settings_text_size, settings_audio_speed, settings_language, settings_reset, settings_share_progress, settings_about
```

---

## 5. Session starter prompt (paste first in every new chat)

```text
You are my coding assistant for the Mashq hackathon app. I am Anas, the frontend developer.
Read docs/team/01-anas-frontend.md completely before answering (it contains my boundaries, the design rules and the shared contracts).
Rules for this whole chat:
1. Only create or edit files in: app/** (not app/guide.tsx), src/components/**, src/theme/**, assets/fonts/**, package.json, app.json.
2. If a change is needed in any other folder, STOP and write me a two-line message to send to the owner (Ahmer: engine, store, lib, helper, video, server. Maaz: guide, forms, eas.json, README. Savera: content, audio, tools, docs).
3. Do not change the shared contracts in section 3. Use useApp, useRunner, useT, playClip, uiBus exactly as defined there.
4. Only do the task I paste. No extra features, no refactors outside it.
5. Follow the design rules: text >= 20sp, tap targets >= 56dp, never red errors, never blame the user, always use useDir() for direction (no left/right).
6. TypeScript strict. Run npx tsc --noEmit mentally and fix type errors.
7. Keep answers short and list the files you changed.
Reply "ready" and wait for my first task.
```

---

## 6. Tasks and prompts

Times assume you start at 12:45 PM. Commit after each task.

### F0. Scaffold (12:45 – 13:15) [blocks everyone]

Commands to run yourself (Windows Command Prompt or PowerShell; macOS and Linux in the comments):
```bash
git clone https://github.com/<owner>/mashq.git
cd mashq
npx create-expo-app@latest ../mashq-tmp
# Windows:           robocopy ..\mashq-tmp . /E /XD node_modules .git
# macOS or Linux:    cp -r ../mashq-tmp/. .
npm run reset-project        # removes the example screens if the script exists; otherwise delete them by hand
npx expo install react-native-webview expo-audio expo-font expo-print expo-sharing expo-localization expo-linking expo-asset expo-constants @react-native-async-storage/async-storage react-native-safe-area-context
npm install zustand fuse.js
npm install @expo-google-fonts/noto-naskh-arabic       # if the package is missing, download the .ttf into assets/fonts
git add -A && git commit -m "chore: scaffold Expo app and core dependencies" && git push
```
Copy the three planning documents (feature spec, implementation plan, this team folder) into `docs/` so everyone's AI can read them. Tell the group when you have pushed.

Prompt:
```text
Task F0: create the project skeleton files (no screens' real content yet).
Create:
1. src/theme/tokens.ts: color tokens (ink, body, muted, bg, card, line, primary, primaryInk, calm, calmInk, warm, warmInk; no red anywhere), and size tokens (body 20, bodyL 24, bodyXL 28, h1 30, h2 26, tap 56, gap 12).
2. src/theme/useDir.ts: a hook useDir() returning { rtl, row, align, startSide, endSide } where rtl = (language === 'ur'). It must read the language from useApp (import { useApp } from '../store/useApp'; selector s => s.language). Ahmer is writing that store, so just import it. row is 'row-reverse' when rtl else 'row'.
3. src/theme/useTextSize.ts: hook returning the font size for body/heading based on useApp textLevel (0=20,1=24,2=28 for body; headings +6).
4. src/components/Row.tsx: a View using useDir().row.
5. app/_layout.tsx: Expo Router Stack with headerShown false, animation 'fade', loads the Noto Naskh Arabic font with a system-font fallback, and renders nothing else yet (GlobalSheets will be added later).
6. Stub screens that only show a title and a BigButton-free placeholder text: app/index.tsx (temporarily redirects to /consent), app/consent.tsx, app/home.tsx, app/lesson/[id].tsx, app/settings.tsx, app/video.tsx, app/fridge.tsx. Do NOT create app/guide.tsx (Maaz owns it).
Constraints: no new dependencies, no hard-coded left/right, text >= 20sp. List the files created.
```

### F1. Base components (13:15 – 13:45)

```text
Task F1: build the shared components in src/components/ using useDir(), useT() and the tokens. Props exactly as in section 3 of docs/team/01-anas-frontend.md.
1. BigButton: min height 56, large label, variants primary (blue background, white text), secondary (white background, dark border), calm (soft green background). No red. Pressed state visible. accessibilityRole="button" and accessibilityLabel.
2. AudioButton: shows a speaker icon (use a simple text/emoji-free drawn shape or the Unicode speaker symbol) AND the label text (default useT()('listen')). onPress calls playClip(clipId, audioSpeed from useApp). If hasClip(clipId) is false, still show the button but make it a quiet no-op (the text is always the source of truth).
3. StuckButton: small but >= 56dp tall, always readable, label useT()('stuck'), calm variant.
4. Banner: warm-colored strip with useT()('practice_banner'), accessibilityRole="header".
5. Sheet: a bottom sheet (Modal-based, no extra library) with a title, a close button >= 56dp, scrollable children, large padding, closes on backdrop tap.
6. IdCard: a fictional ID card drawn with Views. Front shows name, father, date of birth in WORDS (persona.dobWords) and phone; back shows the ID number (use ltr() around digits). The 'highlight' prop draws a thick dark outline around the matching line. A "Flip" button (BigButton secondary) toggles side unless onFlip is controlled. Title text on the card: "Citizen Services Portal (Practice)" in English and Urdu from useT keys if present, else English literal. No real logos.
Also create src/components/Gallery.tsx (a dev-only screen component, not a route) that renders every component at all 3 text levels so I can check clipping.
Constraints: no new dependencies; all spacing via useDir helpers; no left/right style props.
```

### F2. Consent, Home, Settings (13:45 – 14:15)

```text
Task F2: build three screens.
1. app/consent.tsx: one screen: title (consent_title), three icon rows (consent_line1..3) each with a simple drawn icon and text, an AudioButton that plays clip 'ui_consent' , and one BigButton primary 'start'. On press: useApp.getState().set({ consented: true }) then router.replace('/home').
2. app/index.tsx: redirect to /home if consented else /consent (read useApp). If useApp is not available yet, keep the temporary redirect and add a TODO.
3. app/home.tsx: header text home_title; a Banner is NOT shown here. Large cards (each >= 72dp tall): Lessons (one card for LESSON1, showing a small three-rung ladder icon for the last result of that lesson from useApp.results, never numbers), 'continue_card' shown only if a lesson was exited (leave a prop/TODO, Ahmer will expose it), Find help (opens uiBus.emit('helper', [])), Find a video (router.push('/video')), Guide browser (router.push('/guide') with a visible switch bound to useApp guideOn labelled guide_me; the switch is off at cold start), and a small Settings link. No notifications, no badges, no counters.
4. app/settings.tsx: text size (3 big buttons 20/24/28 bound to textLevel), audio speed (0.8x / 1x), language (Urdu / English; switching sets language, the layout flips instantly), share progress toggle (default off), reset my data (confirm via a Sheet, then useApp.getState().reset() and router.replace('/consent')), re-read consent link, about section with text 'settings_about'.
Constraints: tap targets >= 56dp; all texts via useT(); direction via useDir(); no new dependencies.
```

### F3. Lesson container, Get ready, Field screen (14:00 – 14:45 for the core, finish by 15:00)

```text
Task F3: build app/lesson/[id].tsx using useRunner(id) from the contract in section 3.
Show one of these, depending on runner.step.kind:
A. 'info' (Get ready or the 'session' step): the Banner, lesson title, a checklist from lesson.ready (each item with text and an AudioButton), and a primary 'next' button that calls runner.actions.submit(). For the step with hiccup logged_out the text is useT()('session_expired') and the button label is useT()('log_in_again').
B. 'field': Banner; step indicator text built from useT()('step_of') with {n} and {total}; the question (step.label and step.asks) in large type; the input by step.fieldKind:
   - 'name','text','phone': TextInput height >= 56, textAlign from useDir().align, keyboardType 'phone-pad' for phone.
   - 'id_number': numeric keypad.
   - 'dob': three boxes (day, month, year) with max lengths 2, 2, 4, combined into 'DD-MM-YYYY' and sent with actions.setInput.
   - 'choice': one BigButton per step.choices.
   - 'file': three sample photo cards drawn with Views and labelled 'Photo 1', 'Photo 2', 'Photo 3' (they are not real images); tapping one calls setInput with its choice id. Use step.choices for the ids.
   - 'code': an SMS banner at the top using useT()('sms_banner') with {code} replaced by step.example, and one numeric input.
   Below the input: four help buttons (layer_asks, layer_where, layer_format, layer_unsure). Tapping one calls actions.openLayer(layer) and shows a panel with the text (step.asks / where / format / ifUnsure by language) and an AudioButton with the matching step.audio id. If layer 'where' opens, show an IdCard above the input with highlight set from step.id (map: name→'name', father→'father', dob→'name' side front, id→'id' on the back side, phone→'phone').
   Primary button 'next' calls actions.submit(). StuckButton calls actions.stuck(). A secondary 'undo' button (shown when runner.canUndo) calls actions.undo().
C. 'review' and 'submit' are built in task F5; for now show a placeholder.
Also: handle Android hardware back with BackHandler: call runner.actions.backPressed() and return true (do not leave the screen).
Constraints: no logic about scoring or validation in the UI (the runner decides). Only call runner actions. Use highlightField from runner to outline the matching input with a thick dark border (not red). All text via useT() or from the step fields.
```

### F4. Oops card and Hiccup sheet (14:30 – 15:00)

```text
Task F4: build two components in src/components/ and wire them into app/lesson/[id].tsx.
1. OopsCard: shown when runner.oops is not null. Warm (not red) card with title useT()('oops_title'), the consequence text, then 'oops_fix' label and the fix text, an AudioButton if a clip id is available, and two buttons: 'try_again' (calls actions.dismissOops()) and 'undo' (calls actions.undo()).
2. HiccupSheet: a Sheet shown when runner.hiccup is not null. It reads HICCUPS[runner.hiccup] from src/content (import { HICCUPS } from '../content'). Shows 'happened' text (small), then the 'habit' text (large) with an AudioButton using HICCUPS[id].audio, then BigButton 'got_it' calling actions.resolveHiccup(). The sheet cannot be closed by tapping outside (the person must press 'got_it').
Constraints: never show a red color, never show an error sound. No scoring logic. Do not change the runner.
```

### F5. Review, Submit, Receipt (15:00 – 15:30)

```text
Task F5: complete the 'review', 'submit' and receipt parts of app/lesson/[id].tsx.
1. review: title useT()('review_title'); a list of the answers the person typed (read them from the runner; if the contract does not expose answers, show a TODO and ask me to request runner.answers from Ahmer; do not read store internals). Each row shows the label, the value large, and a 'read_aloud' button that plays the label's clip (step.audio.asks); each row is tappable to jump back to that step (call a navigation action only if the runner exposes one, otherwise leave a TODO). Primary button 'submit' calls actions.submit().
2. submit: after the first press the runner shows the vague-error hiccup. Render the vague error banner in a calm warm color with the text 'There was a problem with your submission' (also in Urdu from STRINGS key 'vague_error_banner' if it exists). The field named by runner.highlightField gets a thick dark outline on the review row.
3. receipt: when runner.done is true and runner.receiptNo is set, show title 'receipt_title', the receipt number very large (wrapped in ltr()), the line 'receipt_save', an AudioButton, and a primary button that goes to the result screen (task F6).
Constraints: no scoring in the UI.
```

### F6. Result screen (15:00 – 15:30)

```text
Task F6: build the result view shown after the receipt (inside app/lesson/[id].tsx or app/lesson/result.tsx, your choice).
Use runner.result (LessonResultView). Show: title result_title; a three-rung ladder drawn with Views, the current rung highlighted (rung_0, rung_1, rung_2 labels), never numbers or percentages; the strength sentence (result.strength in the current language) large and calm; an optional comfort check: question comfort_q with three picture buttons (comfort_ok, comfort_unsure, comfort_notyet) that write to useApp.set({ comfort: [...] }) (skippable); buttons: next_lesson, practise_again, fridge_card.
If runner.result is null, show a short loading text.
Constraints: do not compute the rung or the strength in the UI. Do not show hiccup counts as failures; if you show them, phrase as 'You handled N surprises'.
```

### F7. Jargon sheet and Helper sheet (15:30 – 16:00)

```text
Task F7: build GlobalSheets and its two sheets in src/components/ and mount GlobalSheets in app/_layout.tsx.
1. GlobalSheets: subscribes to uiBus.on('jargon', ...) and uiBus.on('helper', ...) inside useEffect and cleans up. Shows JargonSheet or HelperSheet on top of any screen.
2. JargonSheet: payload is a term id (string). Look up GLOSSARY.find(t => t.id === id). Show term, plain meaning, analogy, and an AudioButton with the term's audio id. Title useT()('jargon_title').
3. HelperSheet: payload is an array of field kinds (may be empty). Show five big chip buttons (using these string keys if present: 'chip_word', 'chip_box', 'chip_error', 'chip_logged_out', 'chip_safe'; otherwise English labels). Optional text input with a Send button. Before matching, call looksLikeSecret(text): if true show useT()('secret_warning') and do not search. Otherwise call matchQuestion(text); if it returns a KBEntry show the answer, an AudioButton (entry.audio), the tryNext line, and follow-up chips from entry.chips; if null show useT()('helper_unsure'). A chip press should call matchQuestion with the chip's text, or use a chip-to-entry-id map if Ahmer provides one. Never fill any field, never ask for a code.
Constraints: no network calls. Do not edit src/helper or src/content.
```

### F8. Find a video screen (16:00 – 16:15, only if on time)

```text
Task F8: build app/video.tsx.
Input: chips for common problems and an optional text input. Before searching, call looksLikeSecret(text); if true show the warning. Call fetchVideos(query). Show up to 3 large cards: thumbnail https://i.ytimg.com/vi/<id>/hqdefault.jpg (Image), title, and a tag: checked_by_team if item.checked else from_youtube. Tapping a card opens the video inside a WebView (react-native-webview) at https://www.youtube.com/embed/<id>?rel=0&playsinline=1 in a Sheet. After the video closes: a 'Try it now' button that opens the helper sheet (uiBus.emit('helper', [])) and 'video_helped_q' with yes/no buttons (store the answer in local state only). Always show the banner text video_banner. If source is 'none' show helper_unsure.
Constraints: no API keys, no direct network code other than the image and the embed.
```

### F9. Fridge card and share buttons (only if on time)

```text
Task F9: build app/fridge.tsx and src/components/fridgeCard.ts.
fridgeCard.ts exports buildFridgeHtml(lang): string returning a one-page A4 HTML (large type, light lines, no heavy fills, right-to-left when lang is 'ur') with five numbered steps, an 'If stuck do this' box with three short lines, the eight recovery habits (from HICCUPS in src/content), and a reminder to call the official number. fridge.tsx has a preview text, a BigButton 'fridge_card' that uses expo-print printToFileAsync({ html }) then expo-sharing shareAsync(uri), and two BigButtons using Linking.openURL('https://wa.me/?text=' + encodeURIComponent(text)) with texts from useT() keys wa_training_wheels and wa_share_app.
Constraints: no new dependencies. If the Urdu font does not render in the PDF, embed it via a base64 @font-face and tell me.
```

### F10. Polish and accessibility pass (16:00 – 16:15)

```text
Task F10: review every screen I own for: tap targets >= 56dp, body text >= 20sp at all three text levels without clipping, contrast, no red colors, accessibilityLabel on all buttons and icons, correct direction (no left/right style props: search the code for 'left', 'right', 'marginLeft', 'marginRight', 'paddingLeft', 'paddingRight'), consistent spacing, BackHandler behaviour, and empty/missing-string states (a missing key must not crash). Fix issues in my files only and list what you changed. Do not add features.
```

---

## 7. Done checklist

- [ ] Scaffold pushed by 1:15 PM, group informed.
- [ ] Every screen readable at the largest text level, in Urdu, on a real phone.
- [ ] Lesson 1 can be played from Get ready to Result using the real runner.
- [ ] No red colors, no hard-coded left or right, no timers, no scores shown.
- [ ] `npx tsc --noEmit` passes.
- [ ] Gallery screen shows all components without clipping.
- [ ] Everything committed and pushed.

---

## 8. Commit routine (every 20 to 30 minutes)

```bash
git pull --rebase origin main
npx tsc --noEmit
git add app src/components src/theme assets/fonts package.json app.json package-lock.json
git commit -m "feat(ui): field screen with four help layers"
git pull --rebase origin main
git push
```
You are the only person who installs packages. If someone asks for a package, install it, commit `package.json` and the lock file alone, push, and tell the group to run `npm install`.

---

## 9. If you are blocked

- A hook or content export is missing: build against props and a temporary local fake inside your own files, add `// TODO: wire to real hook`, and message the owner (Ahmer for hooks, Savera for content).
- A contract looks wrong: message Ahmer and Savera, do not change it yourself.
- Running out of time: cut in this order: F9 fridge card, F8 video screen, then F7 helper sheet polish. Never cut F3, F4, F5, F6.
- Phone cannot connect: `npx expo start --tunnel`.
