# Savera: content, audio and general work (Mashq)

Put this file in the repo at `docs/team/04-savera-content-audio.md`. In VS Code chat (Codex or Claude), first paste the **session starter** (section 5), then paste **one task prompt at a time** (section 6). AI-drafted Urdu is only a draft: you (or a native Urdu speaker) must read and fix every line before it counts as final.

---

## 1. Your role and boundaries

**Role:** content, audio and general work. You talk to real parents, write all the words the app says (English first, then Urdu), generate and check the Urdu audio, and prepare the pitch material.

**You may create or edit:**
- `src/content/**` (lesson, hiccups, glossary, strings, helper knowledge base, videos, Guide text, index)
- `content/**` (audio script CSV)
- `tools/**` (audio generation scripts)
- `assets/audio/**`
- `src/audio/**` (the generated audio map)
- `docs/interviews.md`, `docs/pitch.md`

**You must NOT edit** (ask the owner instead):
- `app/**`, `src/components/**`, `src/theme/**`, `package.json`, `app.json` → Anas
- `src/engine/**`, `src/store/**`, `src/lib/**`, `src/helper/**`, `src/video/**`, `server/**` → Ahmer
- `app/guide.tsx`, `src/guide/**`, `src/forms/**`, `eas.json`, `README.md` → Maaz

**Out of bounds examples:** changing the type definitions (Ahmer owns `types.ts`), writing screens, changing how the app scores, editing the Guide script, inventing interview results, copying real organisation names or real ID numbers.

**Depends on others:** `src/engine/types.ts` (Ahmer, about 1:00 PM) for the exact data shapes. Until then use the shapes in section 3. The audio map must exist early: push an empty stub in the first 15 minutes after the scaffold so Ahmer's audio player can import it.

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

## 3. Shared contracts you must match

```ts
// src/engine/types.ts (owner Ahmer) -- import from here, never redefine
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

// validators you may import (Ahmer): import { isName, isDob, isId, isPhone } from '../../engine/validators';
```

**Your exports (each file under `src/content/`):**
- `lessons/lesson1.ts` → `export const LESSON1: Lesson;` and `src/content/lessons/index.ts` → `export const LESSONS: Record<string, Lesson> = { [LESSON1.id]: LESSON1 }`
- `hiccups.ts` → `export const HICCUPS: Record<HiccupId, Hiccup>`
- `glossary.ts` → `export const GLOSSARY: GlossaryTerm[]`
- `strings.ts` → `export const STRINGS: Record<string, Bi>`
- `kb.ts` → `export const KB: KBEntry[]`
- `videos.ts` → `export const VIDEOS: VideoItem[]`
- `guideText.ts` → `export type GuideStrings` and `export const GUIDE_TEXT: { ur: GuideStrings; en: GuideStrings }`
- `index.ts` → re-exports all of the above.

`GuideStrings` shape:
```ts
export type GuideStrings = {
  ui: { listen: string; helper: string; check: string; hide: string; missing: string; allgood: string;
        mapTitle: string; boxes: string; required: string; needFile: string; mapAudio: string };
  safety: { title: string; body: string; audio: string };
  kinds: Record<'name'|'dob'|'id_number'|'phone'|'email'|'address'|'choice'|'file'|'checkbox'|'generic',
                { title: string; asks: string; format?: string; audio: string }>;
};
```

**Audio id naming (use exactly):** step layers `<stepId>_asks`, `<stepId>_where`, `<stepId>_format`, `<stepId>_unsure`; hiccups `h_<hiccupId>`; glossary `g_<id>`; helper `kb_<id>`; UI `ui_<key>`; safety `safety_1` to `safety_6`; Guide `kind_<kind>`, `guide_map`, `guide_safety`.

---

## 4. Required string keys (all must exist in `STRINGS`)

```
start, listen, stuck, helper, practice_banner, next, back, undo, try_again, got_it, take_a_moment, yes, no, continue_card, welcome_back
consent_title, consent_line1, consent_line2, consent_line3
home_title, lessons, find_help, guide_me, guide_on_badge, settings
step_of            ("{n} of {total}")
layer_asks, layer_where, layer_format, layer_unsure
oops_title, oops_fix, sms_banner ("{code}" placeholder), session_expired, log_in_again, vague_error_banner
review_title, read_aloud, submit, receipt_title, receipt_save
result_title, rung_0, rung_1, rung_2, comfort_q, comfort_ok, comfort_unsure, comfort_notyet, next_lesson, practise_again
fridge_card, share_whatsapp, wa_training_wheels, wa_share_app
find_video_title, checked_by_team, from_youtube, video_helped_q, video_banner
helper_title, helper_unsure, secret_warning, jargon_title, chip_word, chip_box, chip_error, chip_logged_out, chip_safe
settings_text_size, settings_audio_speed, settings_language, settings_reset, settings_share_progress, settings_about
strength_unaided_recovery, strength_fewer_hints, strength_careful_check, strength_default
```

---

## 5. Session starter prompt (paste first in every new chat)

```text
You are my content assistant for the Mashq hackathon app. I am Savera, responsible for content, audio and documents.
Read docs/team/04-savera-content-audio.md completely before answering (boundaries, the exact data shapes, audio id naming, required string keys).
Rules for this whole chat:
1. Only create or edit files in: src/content/**, content/**, tools/**, assets/audio/**, src/audio/**, docs/interviews.md, docs/pitch.md.
2. If a change is needed in any other folder, STOP and write me a two-line message to send to the owner (Anas: app, components, theme, package.json. Ahmer: engine, store, lib, helper, video, server, types. Maaz: guide, forms, eas.json, README).
3. Never redefine types. Import them from src/engine/types.ts. If a shape does not fit, stop and tell me.
4. Write English first, then Urdu. Mark every Urdu line you are not sure about with // TODO(UR-review). Never invent facts, statistics or quotes.
5. Tone: calm, respectful, short sentences, one idea per sentence. Describe the box or step, never blame the person. Use the respectful Urdu form (آپ). Never use the words 'senior' or 'elderly'. No scary words about scams.
6. No real names, real ID numbers, real organisations or logos. The Practice Person is fictional.
7. Do not add dependencies. Only do the task I paste.
8. Keep answers short and list the files you changed.
Reply "ready" and wait for my first task.
```

---

## 6. Tasks and prompts

Times assume you start at 12:45 PM.

### S0. Stub audio map (12:45 – 13:00, first push after the scaffold)

```text
Task S0: create src/audio/audioMap.ts containing exactly:
// generated by tools/gen_audio_map.py. Do not edit.
export const AUDIO: Record<string, number> = {};
and src/content/index.ts with empty placeholder exports that match the contracts in section 3 (LESSONS = {}, HICCUPS as an object with all 8 ids and empty Bi strings, GLOSSARY = [], STRINGS = {}, KB = [], VIDEOS = [], GUIDE_TEXT with empty strings). This lets the other developers import my files today. Mark each placeholder with // TODO(content).
```
Push it, then tell the group "content stubs are in".

### S1. Parent conversations [start now, 12:45 – 13:30]

Each team member makes one or two calls; you collect the notes. Five minutes each. Questions:
1. What is one thing on your phone you avoid? Why?
2. What are you afraid might happen if you tap it?
3. When you ask for help, does the person teach you or just do it? How does that feel?
4. When you get stuck, what do you do next?
5. Which words or icons confuse you? (Write the exact words.)
6. Have you ever got a message or call that scared you? What did you do?
Ask permission before quoting anyone. Never invent or embellish answers.

```text
Task S1: create docs/interviews.md with this template and my notes below. Do not change my words except to fix spelling. Structure: a short intro (who we asked and when, no full names unless they agreed), one section per conversation (first name or 'Relative 1', age range, short verbatim lines, what they avoid, what they fear, the words that confuse them), then a summary of the top 3 patterns (only patterns that really appear in my notes) and the list of confusing words (exact spelling) to feed the glossary. My notes: <paste your notes>.
```

### S2. Lesson 1 content (13:00 – 14:00) [highest priority]

Persona (fictional): name Bashir Ahmed, father Nazir Ahmed, date of birth in words `7 March 1958` and as `07-03-1958`, ID `42101-1234567-1`, phone `0300-1234567`, city Karachi, domicile Sindh.
Step ids in order: `ready` (info), `name`, `father`, `dob`, `id`, `phone`, `city`, `domicile`, `session` (info), `photo`, `otp`, `review`, `submit`.

```text
Task S2: create src/content/lessons/lesson1.ts exporting LESSON1: Lesson (import types from '../../engine/types' and validators from '../../engine/validators'), and src/content/lessons/index.ts exporting LESSONS.
Lesson id 'lesson1'. Title: 'Apply for a service card' / Urdu. Persona exactly as in section 6 S2 of docs/team/04-savera-content-audio.md. ready: three items: 'Your ID card', 'Your phone number', 'A clear photo' (text Bi and audio ids ready_1..ready_3).
Steps (use the ids and kinds exactly):
- name (field, fieldKind 'name'): expected (v,p) => v.trim() === p.name; asks 'Your full name as written on the ID card'; where 'On the front of the ID card'; format 'Copy it exactly'; ifUnsure 'Ask the helper'. hiccup none (this is the easy first win; make it very easy).
- father (field, 'name'): expected equals p.father.
- dob (field, 'dob'): expected (v,p) => v.trim() === p.dob; example '07-03-1958'; format 'Day-month-year, for example 07-03-1958'; hiccup { id:'wrong_format', when:'wrong' }; oops consequence 'The form would not accept this date' fix 'Copy the shape of the grey example'.
- id (field, 'id_number'): expected strips dashes and compares with p.idNumber; where 'On the back of the ID card. Tap Where it is'; hiccup { id:'find_answer', when:'enter' }.
- phone (field, 'phone'): expected (v,p) => v.replace(/[-\s]/g,'') === p.phone.replace(/[-\s]/g,'') ; format '03XX-XXXXXXX'.
- city (field, 'choice'): choices Karachi (correct), Lahore, Islamabad (labels Bi); asks 'Pick the city on the card'.
- domicile (field, 'choice'): choices Sindh (correct), Punjab, KP; the label uses the word 'Domicile'; glossary ['domicile']; hiccup { id:'unknown_word', when:'enter' }.
- session (kind 'info'): label 'Session' ; asks 'Your session has expired'; hiccup { id:'logged_out', when:'enter' }.
- photo (field, 'file'): choices photo1 ('Too dark'), photo2 ('Blurry'), photo3 ('Clear', correct: true); the first choice shown (photo1) must NOT be correct; hiccup { id:'upload_rejected', when:'wrong' }; asks 'Pick the best photo for the form'.
- otp (field, 'code'): example '482913' (this is the SMS code); expected (v) => v.trim() === '482913'; hiccup { id:'verification_code', when:'enter' }; glossary ['otp'].
- review (kind 'review'): label 'Check your answers'.
- submit (kind 'submit'): label 'Submit'; hiccup { id:'vague_error', when:'submit_first' }.
For each field step give audio ids per section 3 naming (e.g. dob_asks, dob_where, dob_format, dob_unsure). Write English first for every Bi; put the Urdu draft after it with // TODO(UR-review) on the same line. Keep every sentence short. Do not use any real organisation name.
```

### S3. Hiccup and safety copy (13:45 – 14:15)

```text
Task S3: create src/content/hiccups.ts exporting HICCUPS: Record<HiccupId, Hiccup> with all 8 ids. For each: happened (one short sentence of what just happened, describing the form not the person), habit (ONE calm sentence, the recovery habit), audio 'h_<id>'. English drafts to use:
vague_error: 'Read the red words. They point to the box to fix.'
wrong_format: 'Copy the shape of the grey example.'
unknown_word: 'Tap the question mark to see what a word means.'
find_answer: 'The answer is often on the back of the card. Tap Where it is.'
logged_out: 'Real forms can lose your answers. Keep your details ready and log in again. The second time is faster.'
upload_rejected: 'Retake the photo in daylight, flat, with all four corners visible.'
verification_code: 'Type the code only on the site you started. Nobody who calls you should ever ask for it.'
back_fear: 'Use the form's own Back link when there is one. Your practice answers are saved.'
Then add to the same file an exported array SAFETY_LINES: Bi[] with 6 calm lines (never share a code; hang up and call the official number; a prize message is a trick; banks do not ask for your PIN; you can always ask someone you trust; it is okay to stop). Audio ids safety_1..safety_6. English first, Urdu draft after with // TODO(UR-review). No scare words, no statistics.
```

### S4. Glossary of 30 terms (14:00 – 14:30)

Start from your interview words, then add the standard list: OTP, PIN, CNIC, domicile, account title, beneficiary, verification code, session expired, CAPTCHA, upload, download, attachment, link, password, username, submit, confirm, terms and conditions, KYC, wallet, transaction ID, receipt, login, logout, profile, install, update, notification, screenshot, inbox, spam.

```text
Task S4: create src/content/glossary.ts exporting GLOSSARY: GlossaryTerm[] with these terms: <paste the final list, starting with the words from docs/interviews.md>.
For each term: id (lowercase, no spaces), term (Bi: Urdu script and English), plain (Bi: one short sentence of what it means in everyday words), analogy (Bi: one everyday comparison, e.g. 'OTP is like the key to your locker; the bank never asks you to hand it over'), audio 'g_<id>', pattern (a string for a regular expression that matches the English and Urdu spelling of the term, case-insensitive, e.g. 'OTP|او ٹی پی'; escape backslashes properly for a TS string: use \\b not \b). English first; Urdu draft with // TODO(UR-review). Never explain with other jargon. At least 20 terms must have analogies a non-technical person understands.
```

### S5. UI strings (14:15 – 14:45)

```text
Task S5: create src/content/strings.ts exporting STRINGS: Record<string, Bi> containing EVERY key listed in section 4 of docs/team/04-savera-content-audio.md. Placeholders: step_of is '{n} of {total}', sms_banner contains '{code}'. Write English first, then the Urdu draft with // TODO(UR-review). Tone rules: calm, respectful, short; buttons are verbs ('Start', 'Next', 'Try again'); no exclamation marks; no red-alert words. For the three comfort answers use: comfortable / a bit unsure / not yet. rung_0 'With the guide beside me', rung_1 'With a little help', rung_2 'On my own'. strength_* are one warm sentence each: unaided recovery ('Today you recovered from a logout without any hint.'), fewer hints ('You needed fewer hints than last time.'), careful check ('You read the number back before confirming. That is what careful people do.'), default ('You kept going and finished. That is what matters.').
```

### S6. Audio script, generation and map (14:30 – 15:30, record in priority order)

**Priority order (stop when time runs out; the text is always on screen):**
1. UI prompts and Lesson 1 "asks" clips (about 25 + 12).
2. Hiccup habits (8) and safety lines (6).
3. Guide field-kind bubbles (about 12) and the form map line.
4. Glossary (20 minimum).
5. Helper answers (40, lowest priority).

CSV `content/audio-script.csv` (header `id,text_ur`, one clip per line, UTF-8).

```text
Task S6a: generate content/audio-script.csv with header id,text_ur and one row per audio id used in src/content (lesson1 audio ids, HICCUPS audio, SAFETY_LINES, glossary audio, strings that need audio such as ui_consent, GUIDE_TEXT audio ids). The text_ur column holds the Urdu text to be spoken (copy from the content files; if a line is still English because Urdu is not final, put the Urdu draft and mark the id in a second file content/audio-todo.txt). Sort by the priority order in section 6 S6.
```

Create `tools/gen_audio.py` and `tools/gen_audio_map.py`:
```text
Task S6b: create tools/gen_audio.py and tools/gen_audio_map.py.
gen_audio.py: read content/audio-script.csv; for each row create assets/audio/<id>.mp3 if it does not exist (unless the FORCE env var is set). Use the edge_tts library by default: edge_tts.Communicate(text, VOICE).save(path) with VOICE from the VOICE environment variable (default 'ur-PK-UzmaNeural'; tell me how to list voices with: edge-tts --list-voices). If the USE_GTTS env var is '1', use gTTS instead: gTTS(text, lang='ur').save(path). Print 'ok <id>' per clip and a final count. Handle errors per row (print and continue).
gen_audio_map.py: list assets/audio/*.mp3 and write src/audio/audioMap.ts with: export const AUDIO: Record<string, number> = { "<id>": require("../../assets/audio/<id>.mp3"), ... }; sorted by id; first line is the comment '// generated by tools/gen_audio_map.py. Do not edit.'. Print the number of clips.
Tell me the exact commands to run: pip install edge-tts gTTS; python tools/gen_audio.py; python tools/gen_audio_map.py.
```
Notes:
- Both TTS routes are unofficial services. Disclose the tool and voice in the README (tell Maaz the name, voice and date).
- Run both scripts after every CSV change, then commit the mp3 files and the map together.
- Listen to every priority 1 and 2 clip. Wrong pronunciation or odd pauses: fix the text (add spaces or punctuation) and regenerate only those clips by deleting their mp3 files.

### S7. Helper knowledge base, 40 entries (15:00 – 15:45)

Groups: words (about 8), fields (10), errors (8), logged_out (4), safety (6), reassurance (4). Use at least five real questions from your conversations.

```text
Task S7: create src/content/kb.ts exporting KB: KBEntry[] with 40 entries in these groups: words (8), fields (10), errors (8), logged_out (4), safety (6), reassurance (4). Each entry: id (snake_case), group, variants (4 to 6 different ways to ask the same thing, including Urdu script, Roman Urdu spelling variants and short English phrases), answer (Bi: two or three short calm sentences), tryNext (Bi: one concrete step the person can do themselves; never 'let me do it for you'), audio 'kb_<id>' (optional), chips (optional follow-up chip ids).
Topics to cover: what is OTP, verification code, domicile, account title, session, upload, link, captcha; date format, ID number format, phone number, name as on ID, address parts, choice lists, photo requirements, required vs optional, what to do if unsure, where to find an answer; red message, wrong format, field highlighted, form will not submit, page stuck loading, file too large, photo unclear, try again later; session expired, forgot password, locked account, lost answers; caller asks for code, message with a link, prize message, someone says your account is blocked, how to check it is real, what to do if you already shared it; did I break it, can I undo, is it okay to ask, can I try again.
Rules: never ask for a code, PIN or password; never say 'I will fill it in for you'; safety answers end with 'Hang up and call the official number on your card'; calm tone, no scare words. English first, Urdu draft with // TODO(UR-review).
```

### S8. Guide text (15:00 – 15:30)

```text
Task S8: create src/content/guideText.ts exporting type GuideStrings (exactly as in section 3) and const GUIDE_TEXT: { ur: GuideStrings; en: GuideStrings }.
ui: listen 'Listen', helper 'Help', check 'Check', hide 'Hide', missing 'Empty boxes', allgood 'Everything looks filled', mapTitle 'Form map', boxes 'boxes', required 'required', needFile 'a photo is needed', mapAudio 'guide_map'.
safety: title 'Stop for a moment', body 'Do not share this code or PIN with anyone who calls you, even if they sound official.', audio 'guide_safety'.
kinds (title, asks, format, audio 'kind_<kind>') for name, dob, id_number, phone, email, address, choice, file, checkbox, generic. Each asks is one short sentence of what the box wants; format is a grey example or a short rule (dob '07-03-1958', phone '0300-1234567', id_number 'digits only unless the form shows dashes'). English first, Urdu draft after with // TODO(UR-review). Remember the Guide only explains; it never fills anything in.
```

### S9. Curated videos (15:15 – 15:45, with Ahmer's cache)

Find 10 to 15 short videos on common problems (logging in, OTP, filling a form, uploading a photo, spotting a message trick). Criteria: Urdu or clear Hindi-Urdu, under 4 minutes, clear voice, nobody asks for a PIN or code, you have watched it fully.
```text
Task S9: create src/content/videos.ts exporting VIDEOS: VideoItem[] from this list: <paste: YouTube id | title | topic tags | minutes>. topic tags are lowercase words such as 'login','otp','form','photo','scam'. Do not invent ids or titles.
```

### S10. Fridge card text, pitch and video script (15:30 – 16:15)

```text
Task S10a: create src/content/fridgeText.ts exporting FRIDGE_STEPS: Bi[] (five steps for filling an online form: have your ID card ready; read the question; copy from the card; check every answer aloud; save the confirmation number), FRIDGE_IF_STUCK: Bi[] (three short lines), FRIDGE_REMINDER: Bi (call the official number on your card; never share a code). English first, Urdu draft with // TODO(UR-review).
```
```text
Task S10b: create docs/pitch.md: six slides (title and one-sentence message each, plus speaker notes of 3 lines): 1 the parent and the problem (use one real quote from docs/interviews.md only if permission was given), 2 the root causes (fear of mistakes, fear of looking foolish, words they were never taught, no safe place to practise, help that does the task for them), 3 the solution loop (Try, Surprise, Teach), 4 the live demo (up to 5 screenshots to capture), 5 trust and privacy (data stays on the phone, the Guide never reads what you type, fictional practice data), 6 impact and what is next (lesson files are easy to add; more forms; family sharing). Add a QR code placeholder for the APK. Do not invent numbers.
```
Demo video script (2 minutes maximum; Maaz records or whoever is free, you write it):
| Time | Show | Say (draft) |
|---|---|---|
| 0:00 – 0:15 | A parent, a form, a worried face (or a quote card) | "My mother avoids forms because she is afraid of breaking something. She is not slow. The technology speaks a language she was never taught." (real line, with permission) |
| 0:15 – 0:30 | Home, open Lesson 1, the PRACTICE banner | "Mashq is a private practice phone. Nothing is real, so a mistake cannot hurt." |
| 0:30 – 1:05 | A field screen with four help layers; a wrong date and the Oops card | "She copies from the ID card. A wrong tap never blocks her. The app shows what would happen and the fix." |
| 1:05 – 1:25 | A hiccup and the Teach moment | "Real forms surprise her, so we plant the surprises and teach one calm habit." |
| 1:25 – 1:45 | Guide on a form, a jargon tap | "The Guide explains each box on a web form. It never fills anything in and never reads what she types." |
| 1:45 – 2:00 | Ladder result and comfort before and after | "She moves toward 'on my own'. Working: lessons, hiccups, ladder, Guide on practice and public forms. Simulated: practice forms and cached video results." |

### S11. Native-speaker check (rolling, 14:30 – 16:15)

Checklist for every priority 1 and 2 clip and every on-screen Urdu line:
- [ ] Respectful form (آپ), no blame, no scare words.
- [ ] Short sentences, everyday words (no English jargon without the Urdu word beside it).
- [ ] Numbers, dates and IDs are read clearly and match what is on screen.
- [ ] Audio matches the text; no odd pauses or mispronunciations.
- [ ] Remove each `// TODO(UR-review)` only after a native speaker approves the line.
Keep a list `content/review-status.txt` with `id: approved/needs-fix`.

---

## 7. Done checklist

- [ ] Content stubs and the empty audio map pushed in the first 15 minutes after the scaffold.
- [ ] Interviews documented in `docs/interviews.md`, with permission noted.
- [ ] `LESSON1` loads and every field step has text in both languages and audio ids.
- [ ] All 8 hiccups and 6 safety lines have text and audio.
- [ ] `STRINGS` contains every required key (no key shows up as plain text in the app).
- [ ] Glossary has 30 terms, at least 20 voiced; KB has 40 entries.
- [ ] Priority 1 and 2 audio generated, listened to and approved; audio map regenerated and committed.
- [ ] Pitch notes and demo video script ready by 3:30 PM.
- [ ] `npx tsc --noEmit` passes for your files. Everything committed and pushed.

---

## 8. Commit routine (every 20 to 30 minutes)

```bash
git pull --rebase origin main
npx tsc --noEmit
git add src/content content tools assets/audio src/audio docs/interviews.md docs/pitch.md
git commit -m "feat(content): lesson 1 script"
git pull --rebase origin main
git push
```
Audio files are large: commit them in small batches (for example after each priority group).

---

## 9. If you are blocked

- A type does not fit your content (for example you need an extra field): do not edit `types.ts`. Message Ahmer, who owns it, and Anas if it affects a screen.
- A string key is missing from the list: add it to `STRINGS` anyway and tell Anas the key name.
- The text-to-speech service is blocked or fails: try the other route (`USE_GTTS=1`) or another voice. The text on screen is always enough, so missing audio is never a blocker.
- Not sure of the Urdu: write your best version, mark `// TODO(UR-review)`, and ask a native speaker.
- Out of time: cut in this order: helper answers audio, KB entries beyond 25, glossary beyond 20, Guide text Urdu polish, fridge card text. Never cut: Lesson 1 content, hiccups and safety lines, UI strings, the first two audio priority groups.
