# Mashq (مشق): safe practice for online forms

> **Download the Android APK:** `<APK_LINK>`
>
> **Watch the demo video:** `<DEMO_VIDEO_LINK>`

Mashq ("practice" in Urdu) is an Urdu-first Android app for parents and grandparents who avoid online forms because they are afraid of breaking something or looking foolish. It gives them a safe place to practise, with nothing real at stake, and teaches them to do the task **themselves**. It never fills anything in for them.

Built at **Build4Better, NED University, Karachi, 31 October 2026**.

| | |
|---|---|
| **Final submitted commit** | [`83f0e65`](https://github.com/SAWERA-11/cache_me_if_u_can_b4b/commit/83f0e65) (31 Oct 2026, 17:34 PKT) |
| **Source code** | https://github.com/SAWERA-11/cache_me_if_u_can_b4b (public, full commit history) |
| **App folder** | [`cache_me_if_u_can_b4b/`](cache_me_if_u_can_b4b/) |
| **APK** | `<APK_LINK>` (built from `83f0e65`; [EAS build page](https://expo.dev/accounts/maazaypys-team/projects/build4bettergang/builds/74945b6b-3832-4f13-9870-e65209f55535)) |
| **Demo video** | `<DEMO_VIDEO_LINK>` |

> The final submitted version is commit `83f0e65`. Commits after it only edit the README files (documentation). There are no code, content or audio changes after the submitted commit.

---

## Team

| Member | Role |
|---|---|
| Anas | Frontend: screens, components, theme, right-to-left layout |
| Ahmer Ali | Backend and logic: lesson engine, store, helper matching, audio player, video search, optional server |
| Maaz Ali | Guide (form-explaining browser), testing, builds and release |
| Savera | Content and audio: lesson scripts, Urdu text, glossary, helper answers, voice clips, interviews, pitch |

---

## Target user and problem

Our users are parents and grandparents in Pakistan who use a phone every day for calls, voice notes and videos, but avoid online forms, banking apps and phone settings.

We spoke to two family members of the team (a mother in her 60s and a grandfather in his 70s; summaries in [docs/interviews.md](cache_me_if_u_can_b4b/docs/interviews.md)). Three patterns came up in both conversations:

1. **Help that does the task for them.** Family members take the phone, fix it quickly and hand it back. Nothing is learned, so the next time they must ask again, and they feel dependent.
2. **Fear of a mistake that cannot be undone:** losing money, ruining the phone's setup, deleting photos or contacts. When stuck, both stop completely and wait for family.
3. **Words they were never taught,** such as *Verify OTP*, *Clear Cache*, *Allow Access* and *Storage Full*, and scam calls or messages that create panic.

The problem is not ability. It is fear, unexplained words and no safe place to practise.

---

## Solution and core features

The core loop is **Try → Surprise → Teach → Check → Finish**.

- **Practice lessons (Try).** A realistic form on a fictional "Citizen Services Portal (Practice)", filled with the details of a made-up Practice Person shown on a practice ID card. Two lessons are bundled: *Apply for a service card* and *Order from a delivery app*. A "PRACTICE, nothing is real" banner is always visible.
- **Four help layers on every question:** what it asks, where to find the answer, how to write it, and what to do if unsure. Each has a **Listen** button with an Urdu voice clip.
- **Oops mode.** A wrong answer never blocks. A calm card shows what would happen on a real form and how to fix it, with **Undo**. There are no red crosses, timers, scores or badges.
- **Eight planted hiccups (Surprise):** a vague error, wrong date format, an unknown word, an answer you must look for, getting logged out, a rejected photo, a verification code arriving, and the fear of pressing Back. Each comes with one calm recovery habit.
- **Teach moment.** After a hiccup, the person advises a confused neighbour by picking the right habit. Explaining it is how it sticks.
- **Check and submit,** with a practice receipt and a confirmation number to save.
- **Independence ladder (Finish):** "With the guide beside me" → "With a little help" → "On my own", one warm sentence about what they did well, and an optional before/after comfort question.
- **Jargon tap.** Hard words (43 terms, from *OTP* and *Domicile* to *Cache* and *Surge*) open a plain explanation and an everyday comparison, with voice.
- **Helper.** Question chips and 40 curated answers in Urdu, Roman Urdu and English, matched offline. It warns if someone types a code or PIN, and never asks for one.
- **Guide browser.** A built-in browser that explains each box on a web form: what it wants, a form map, and which required boxes are still empty. It **never reads or sends what you type**; password, PIN, card and code boxes show only a safety card. It includes three practice forms (services, wallet sign-up, ride booking), two public demo forms, and an address bar for any website.
- **Find a video.** 12 short, curated Urdu/Hindi-Urdu videos on OTPs, scam messages, passwords and photo uploads, with optional live search through our server.
- **Fridge card.** A printable/shareable one-page checklist for filling any form, plus safety reminders.
- **Settings:** three text sizes (20, 24, 28), voice speed, Urdu/English, reset, and an explanation of what the Guide can and cannot see.

**Design rules we kept throughout:** body text at least 20sp, tap targets at least 56dp, one idea per screen, Urdu first with hand-built right-to-left layout, calm language that describes the box and never blames the person, no real personal data, no real organisation names or logos, and everything works offline except optional live video search.

---

## Setup and run

### Judges: install the APK (Android)

1. On an Android phone, open the APK link: `<APK_LINK>` (built from the final commit `83f0e65`), and download the file.
2. Open it. If Android warns about an unknown app, tap **Install anyway**, and allow installing from this source if asked.
3. Open **Mashq**, accept the practice notice, and start **Lessons → Apply for a service card**.

Tested Android versions: `<to be filled after device testing>`.

### Developers: run from source

Requirements: Node.js 20 or later, npm, and the Expo Go app (SDK 58) on an Android phone, or an Android emulator.

```sh
git clone https://github.com/SAWERA-11/cache_me_if_u_can_b4b.git
cd cache_me_if_u_can_b4b/cache_me_if_u_can_b4b
npm ci
npx expo start
```

Scan the QR code with Expo Go. On Windows with a restrictive PowerShell policy, use `npx.cmd` instead of `npx`.

Build an Android APK (Expo account required):

```sh
npx eas-cli@latest build --platform android --profile preview
```

### Optional video server

Live video search is optional; the curated videos work without it.

```sh
cd cache_me_if_u_can_b4b/server
npm ci
YOUTUBE_API_KEY=<your key> npm start      # listens on port 8787
```

Set `EXPO_PUBLIC_API_URL` to the server address when starting the app. Never commit the key. See [server/README.md](cache_me_if_u_can_b4b/server/README.md).

### Checks

Run inside `cache_me_if_u_can_b4b/`:

```sh
npx tsc --noEmit                      # strict TypeScript
npx expo lint --no-cache              # lint
node tools/check_content.mjs          # content: required strings, lessons, glossary, helper, Guide text
node src/guide/test/run.cjs           # Guide privacy and behaviour (uses Microsoft Edge headless)
node src/guide/test/forms.test.cjs    # Guide on the bundled practice forms
node src/guide/test/bridge.test.cjs   # Guide message bridge
node server/index.test.js             # optional server
```

---

## Technology stack and dependencies

| Area | What we used |
|---|---|
| App | Expo SDK 58, React Native 0.88, React 19.3, TypeScript 6 (strict) |
| Navigation | Expo Router |
| State and storage | Zustand, @react-native-async-storage/async-storage |
| Audio | expo-audio, with bundled MP3 voice clips |
| Guide browser | react-native-webview, with an injected plain-JavaScript script |
| Helper search | Fuse.js (offline fuzzy matching) |
| Fridge card | expo-print, expo-sharing, expo-file-system |
| Other Expo modules | expo-font, expo-asset, expo-localization, expo-linking, expo-image, expo-constants, expo-splash-screen, expo-status-bar, expo-system-ui, expo-web-browser |
| Font | Noto Naskh Arabic (@expo-google-fonts/noto-naskh-arabic) |
| Optional server | Node.js, Express, cors (YouTube Data API for live search) |
| Content tools | Node.js scripts and Python 3 (edge-tts, gTTS) for generating voice clips |
| Build | EAS Build (Android APK) |

The full lists are in [package.json](cache_me_if_u_can_b4b/package.json) and [server/package.json](cache_me_if_u_can_b4b/server/package.json).

---

## AI tools and third-party credits

**AI assistants.** We used AI coding assistants for code, tests, content drafting and documentation: **Claude Code** (Claude Opus 5.5 and Claude Sonnet 5.5, Anthropic) and **Codex** (OpenAI). Commits made with Claude carry a `Co-Authored-By` line. All AI output was reviewed by the team, and team members can explain and demonstrate the implementation.

**Urdu voice.** All voice clips were generated with **edge-tts** (an unofficial client for Microsoft Edge's online text-to-speech), voice `ur-PK-UzmaNeural`, on 31 October 2026. gTTS (Google Translate text-to-speech) was set up as a fallback. A native Urdu speaker on our team reviewed the priority lines by ear and chose alternative spellings where the voice mispronounced a word.

**Urdu text.** AI drafted the first versions of the Urdu text. A native speaker reviewed and corrected every priority line (see Known limitations).

**Font.** Noto Naskh Arabic, © 2022 The Noto Project Authors, SIL Open Font License 1.1, via @expo-google-fonts (MIT).

**Videos.** The 12 curated videos belong to their YouTube creators and are linked, not copied. They were watched in full by our team.

**Public test forms in the Guide:** the Selenium project's demo web form and the httpbin.org demo form.

All practice forms, the Practice Person, ID numbers, phone numbers and the "Citizen Services Portal (Practice)" are fictional. No real organisation's name or logo is used in the app.

---

## Known limitations and mocked features

**Simulated on purpose**
- The practice forms (two lessons and three Guide forms), the Practice Person and the practice ID card are fictional. Nothing is ever sent anywhere.
- The SMS verification code, session expiry, the vague error and the photo rejection are simulated hiccups.

**Limitations**
- **Device testing is incomplete.** The APK is built from the final commit, and desktop tests and an Android emulator run passed. Full testing on a physical phone was not finished before the deadline.
- **Urdu review is partial.** 140 priority lines (safety lines, hiccup habits, both lessons' questions and labels, buttons, Teach moment, practice card, Guide privacy note, ride words) were reviewed and approved by a native speaker. About 160 lower-priority voice clips (most glossary explanations, helper answers and secondary hints) are AI-drafted and generated, and not yet reviewed.
- **Generated speech** can still mispronounce some words.
- **The Guide** handles standard form fields only. It may not work with custom widgets, forms inside iframes, some single-page sites, strict page security policies, or sign-in pages that block embedded browsers. Public-form tests were run in a desktop browser, not yet in the Android WebView.
- **Video search:** curated videos work offline (thumbnails and playback need internet). Live search needs the optional server and a YouTube API key, which has a small daily quota. The search cache is empty.
- **Helper** answers come from a fixed list of 40 entries. Questions outside it get an honest "not sure" reply with suggested questions.
- Only two lessons are bundled. New lessons are plain content files.
- The APK is a sideloaded prototype, not published on the Play Store.

**Privacy.** Progress and settings stay on the phone. Typed practice answers are not stored. The Guide only checks whether ordinary required boxes are empty; it never reads, stores or sends what you type, and never inspects password, PIN, card or code boxes. A real website opened in the Guide can still receive what you type into it, as in any browser. The only network use is optional video search, and secret-looking numbers are rejected before any search is sent.

---

## Repository guide

| Path | What it holds |
|---|---|
| [`cache_me_if_u_can_b4b/src/app/`](cache_me_if_u_can_b4b/src/app/) | Screens (Expo Router) |
| [`cache_me_if_u_can_b4b/src/components/`](cache_me_if_u_can_b4b/src/components/) | UI components |
| [`cache_me_if_u_can_b4b/src/engine/`](cache_me_if_u_can_b4b/src/engine/) | Lesson engine, validators, ladder estimate |
| [`cache_me_if_u_can_b4b/src/content/`](cache_me_if_u_can_b4b/src/content/) | Lessons, hiccups, glossary, helper answers, strings, Guide text, videos |
| [`cache_me_if_u_can_b4b/src/guide/`](cache_me_if_u_can_b4b/src/guide/) | Guide script and bridge |
| [`cache_me_if_u_can_b4b/src/forms/`](cache_me_if_u_can_b4b/src/forms/) | Practice web forms for the Guide |
| [`cache_me_if_u_can_b4b/assets/audio/`](cache_me_if_u_can_b4b/assets/audio/) | 229 Urdu voice clips |
| [`cache_me_if_u_can_b4b/tools/`](cache_me_if_u_can_b4b/tools/) | Voice generation and content checks |
| [`cache_me_if_u_can_b4b/server/`](cache_me_if_u_can_b4b/server/) | Optional video search server |
| [`cache_me_if_u_can_b4b/docs/`](cache_me_if_u_can_b4b/docs/) | Interviews, pitch, Guide tests, bug log, release notes |
| `01-…04-*.md` | Each team member's task plan |
