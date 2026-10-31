# Maaz Ali: Guide, testing, deployment and submission (Mashq)

Put this file in the repo at `docs/team/03-maaz-guide-testing-release.md`. In VS Code chat (Codex or Claude), first paste the **session starter** (section 5), then paste **one task prompt at a time** (section 6). Review, test on a real phone, commit, then do the next task.

---

## 1. Your role and boundaries

**Role:** you own four things: (1) builds and the Expo account, (2) the **Guide** (the injected script and the WebView screen), (3) testing and bug reports, (4) release, README and the Hackathon Hub submission.

**You may create or edit:**
- `app/guide.tsx`
- `src/guide/**`
- `src/forms/**`
- `eas.json`
- `README.md`
- `docs/guide-tests.md`, `docs/bugs.md`
- GitHub Releases and the Expo account (builds)

**You must NOT edit** (ask the owner instead):
- `app/**` (other screens), `src/components/**`, `src/theme/**`, `package.json`, `app.json` → Anas
- `src/engine/**`, `src/store/**`, `src/lib/**`, `src/helper/**`, `src/video/**`, `server/**` → Ahmer
- `src/content/**`, `content/**`, `tools/**`, `assets/audio/**`, `src/audio/**` → Savera

**Out of bounds examples:** changing other people's screens to "fix" a bug (file a bug instead), editing lesson content or Urdu text, adding npm packages (ask Anas), changing `app.json` (ask Anas; the one exception is the `eas init` project link, which you commit once).

**Depends on others:**
- Anas pushes the scaffold by about 1:15 PM (you cannot run the first build before that).
- Savera supplies `GUIDE_TEXT` and `GLOSSARY` (jargon patterns). Until then, use placeholder English strings behind the same shape.
- Ahmer provides `playClip`, `uiBus`, `useApp`. Anas provides `GlobalSheets`, which shows the Jargon and Helper sheets when you call `uiBus.emit`.

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

## 3. Shared contracts you use or provide

```ts
// You PROVIDE:
buildLens(lang: Lang): string;                 // src/guide/lens.ts, the injected script as source text
handleGuideMessage(raw: string): void;         // src/guide/bridge.ts
export default GuideScreen;                    // app/guide.tsx

// You USE (owned by others):
import type { Lang, Bi } from '../engine/types';                 // Ahmer
useApp(selector): { guideOn, language, audioSpeed, set(), addStruggle(kind) }   // Ahmer, src/store/useApp
playClip(id?: string, rate?: number): boolean                    // Ahmer, src/lib/audio
uiBus.emit('jargon', termId: string); uiBus.emit('helper', kinds: string[])     // Ahmer, src/lib/uiBus (Anas's GlobalSheets listens)
GLOSSARY: { id; term: Bi; plain: Bi; analogy: Bi; audio: string; pattern: string }[]   // Savera, src/content
GUIDE_TEXT: { ur: GuideStrings; en: GuideStrings }               // Savera, src/content/guideText.ts

// GuideStrings (defined by Savera in src/content/guideText.ts):
type GuideStrings = {
  ui: { listen: string; helper: string; check: string; hide: string; missing: string; allgood: string;
        mapTitle: string; boxes: string; required: string; needFile: string; mapAudio: string };
  safety: { title: string; body: string; audio: string };
  kinds: Record<'name'|'dob'|'id_number'|'phone'|'email'|'address'|'choice'|'file'|'checkbox'|'generic',
                { title: string; asks: string; format?: string; audio: string }>;
};
```

**Messages between the page and the app** (JSON strings through `window.ReactNativeWebView.postMessage`):
Page → app: `GUIDE_READY {url, fieldCount, requiredCount}`, `FIELD_HELP {fieldKind}`, `PLAY_AUDIO {audioId}`, `JARGON {termId}`, `ASK_HELPER {kinds}`, `CHECK_RESULT {emptyRequiredCount}`, `SENSITIVE_FOCUS {}`.
App → page (through `injectJavaScript`): `window.__mashq.receive({type:'SET_GUIDE', on:false})`.

---

## 4. Setup commands (Expo account and builds)

Only you (and one backup) need the Expo login. Everyone else uses Expo Go.
```bash
npm install -g eas-cli
eas login
eas whoami
```
After Anas pushes the scaffold:
```bash
git pull --rebase origin main
npm install
eas init                      # once: links the repo to the Expo account; commit and push the change it makes
eas build:configure           # creates eas.json if missing
eas build -p android --profile preview
eas build:list
```
`eas.json` must contain a preview profile that produces an APK:
```json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "preview": { "distribution": "internal", "android": { "buildType": "apk" } },
    "production": {}
  }
}
```
Notes:
- The Expo Free plan has a limited number of Android builds per month and a low-priority queue that can wait an hour or more. Only you start builds, and announce them in the group first.
- If several laptops must build, create an access token on the Expo website and set `EXPO_TOKEN` (PowerShell: `$env:EXPO_TOKEN="token"`; bash: `export EXPO_TOKEN="token"`). Never commit it.
- Windows: local EAS builds are, as far as I know, not supported. Use the cloud build, or a Gradle build if the queue is too slow. Verify this before relying on it.
- Share the Expo password only privately and change it after the event.

---

## 5. Session starter prompt (paste first in every new chat)

```text
You are my coding assistant for the Mashq hackathon app. I am Maaz Ali, responsible for the Guide, builds, testing and release.
Read docs/team/03-maaz-guide-testing-release.md completely before answering (boundaries, contracts, message protocol).
Rules for this whole chat:
1. Only create or edit files in: app/guide.tsx, src/guide/**, src/forms/**, eas.json, README.md, docs/guide-tests.md, docs/bugs.md.
2. If a change is needed in any other folder, STOP and write me a two-line message to send to the owner (Anas: app, components, theme, package.json, app.json. Ahmer: engine, store, lib, helper, video, server. Savera: content, audio, tools, docs).
3. Do not change shared contracts. Use useApp, playClip, uiBus, GLOSSARY, GUIDE_TEXT exactly as defined in section 3.
4. The Guide must NEVER read the value of a form field, never send field values or page text to the app, and for password, one-time-code, PIN and card fields show only the safety card. It may only check whether a non-sensitive field is empty.
5. Do not add dependencies. If one is needed, tell me the package and why.
6. Only do the task I paste. No extra features.
7. Injected script rules: keep it as plain ES5-style JavaScript text inside a TypeScript string. Do not use Function.prototype.toString. No backticks and no ${ inside the script body. Style elements with el.style properties only, not <style> text.
8. Keep answers short and list the files you changed.
Reply "ready" and wait for my first task.
```

---

## 6. Tasks and prompts

Times assume you start at 12:45 PM.

### M0. Accounts, first build (12:45 – 13:30) [Gate G1 at 13:30]

Steps:
1. Install `eas-cli` and log in (commands in section 4).
2. When Anas pushes the scaffold, run `eas init`, commit the change, push.
3. Start the first build with `eas build -p android --profile preview` and tell the group it is queued.
4. While it runs, continue with M1.
5. When it finishes, download the APK and install it on a real phone. Tell the group "G1 passed" or "G1 failed".
If it is still queued at 13:30, say so in the group; keep working with Expo Go and try a Gradle build as a fallback.

Prompt (only for eas.json):
```text
Task M0: create eas.json for an Android APK preview build exactly as in section 4 of docs/team/03-maaz-guide-testing-release.md. Do not edit any other file.
```

### M1. Guide script in a desktop browser (12:45 – 13:30, do not wait for the scaffold)

```text
Task M1: build the injected Guide script and a test page.
Create src/guide/lens.ts exporting buildLens(lang: 'ur'|'en'): string and src/guide/test/page.html (a plain HTML form for desktop testing).
The script (plain JavaScript text, wrapped in an immediately-invoked function, ending with 'true;') must:
1. Keep a state object; guard against double injection (window.__mashq.active).
2. Scan input, select, textarea elements that are visible (skip hidden, submit, button). Collect label text from el.labels, aria-label, aria-labelledby, placeholder, name, id (max 80 chars).
3. Classify each field: sensitive (type=password, autocomplete one-time-code or cc-*, or label/name/id matches otp|one-time|verification|pin|cvv|cvc|card number|passw), else kind by select/file/checkbox/date of birth/phone/email/id number (cnic, national id)/address/name, else generic.
4. Create a guidance bar fixed at the bottom of the page using a shadow root and el.style assignments only (no <style> text). Large text (20px+), buttons at least 48px tall: Listen (posts PLAY_AUDIO with the kind's audio id), Helper (posts ASK_HELPER with detected kinds), Check (see 6), Hide.
5. On focusin of a field: if sensitive show only the safety card (title, body, audio from the dictionary) and post SENSITIVE_FOCUS; never read the field value. Otherwise show the kind's title/asks/format and post FIELD_HELP.
6. Check button: for visible required fields (required attribute or aria-required) that are NOT sensitive, check only whether they are empty (checkbox/radio: not checked); post CHECK_RESULT with the count and show the labels of the empty ones in the bar. Never read or send values.
7. Jargon: for each label and legend element, find glossary patterns (the dictionary provides {id, pattern} pairs) in text nodes and wrap the first match in a span with a dotted underline; tapping posts JARGON {termId}. Mark processed labels with data-mashq-done.
8. A MutationObserver (debounced 400 ms) re-scans when the page changes; ignore mutations inside the bar. On the first scan of a URL with at least one field, show the form map in the bar (number of boxes, number required, whether a file upload exists) and post GUIDE_READY.
9. window.__mashq.receive({type:'SET_GUIDE', on:false}) removes the bar, listeners and observer.
10. All messages via window.ReactNativeWebView.postMessage(JSON.stringify(msg)) in a try/catch; in the desktop test page, define a fake window.ReactNativeWebView that console.logs.
The dictionary (src/guide/dictionary.ts, create it) builds from GUIDE_TEXT[lang] and GLOSSARY (jargon patterns) imported from '../content'; until Savera pushes, use a local placeholder object with the same shape and a TODO. buildLens replaces a __DICT__ marker in the script text with JSON.stringify(dictionary). Keep the script text in a String.raw template; no backticks or ${ inside it.
The test page must contain: name, date of birth, ID number, phone, email, address, a select, a file input, a checkbox, a password field, a verification code field, required markers (asterisk only), a label containing the word 'Domicile', and a submit button. Tell me how to test it by pasting the script into the desktop browser console.
```

### M2. WebView screen and bridge (13:15 – 14:00) [Gate G2 at 13:15 for the first proof]

```text
Task M2: build app/guide.tsx and src/guide/bridge.ts.
app/guide.tsx (default export GuideScreen): full screen. Top: a large Guide switch bound to useApp guideOn (label from useT if available, else 'Guide me'), and when on a persistent badge 'Guide is ON'. Middle: a WebView (react-native-webview) with source { html: SERVICES_FORM_HTML, baseUrl: 'https://practice.mashq.local/' } by default, originWhitelist ['*'], javaScriptEnabled, domStorageEnabled, setSupportMultipleWindows false, incognito, injectedJavaScript = guideOn ? buildLens(language) : 'true;', onMessage = e => handleGuideMessage(e.nativeEvent.data). When the switch changes while a page is open: if turned on, call ref.current.injectJavaScript(buildLens(language)); if turned off, injectJavaScript("window.__mashq && window.__mashq.receive({type:'SET_GUIDE',on:false}); true;"). Bottom: large buttons (>= 56dp): Back, Reload, Close and clear (leaves the screen; with incognito nothing persists). Shortcut buttons at the top of the page area to load: practice form 1, practice form 2 (from src/forms), and a place for two public form URLs (array constant PUBLIC_FORMS with TODO urls; I will fill them after testing). Handle Android hardware back with BackHandler: webview goBack if canGoBack else leave the screen. Force guideOn false on mount (the parent switches it on each time).
src/guide/bridge.ts: handleGuideMessage(raw) parses JSON in try/catch and handles: PLAY_AUDIO -> playClip(audioId, audioSpeed from useApp.getState()); JARGON -> uiBus.emit('jargon', termId); ASK_HELPER -> uiBus.emit('helper', kinds); FIELD_HELP -> useApp.getState().addStruggle(fieldKind); other types ignored. It must never store or forward anything else.
Constraints: use only Ahmer's and Anas's contracts; if useApp or uiBus are not in the repo yet, import them anyway and tell me, do not create them.
```

### M3. Bundled practice forms (13:45 – 14:15)

```text
Task M3: create src/forms/servicesForm.ts and src/forms/walletForm.ts. Each exports an HTML string (SERVICES_FORM_HTML, WALLET_FORM_HTML) of a simple, ordinary-looking portal form with deliberate everyday problems:
- A header strip 'Practice page. Nothing here is real.' (do not use any real organisation name or logo; call them 'Citizen Services Portal (Practice)' and 'Wallet Signup (Practice)').
- Required fields marked only with a small red asterisk.
- Fields: full name, father's name, date of birth (type text), ID number, phone, email, address, city (select), domicile (label uses the word 'Domicile'), photo (file input), password, verification code (autocomplete one-time-code), a terms checkbox, submit.
- A phone field that rejects the wrong format with the vague message 'Invalid input' under it.
- After 40 seconds a message 'Session will expire' appears, then 'Session expired' (setTimeout).
- Submit shows a success message and never sends anything anywhere.
- Large readable text (18px+), mobile viewport meta, plain styles in a <style> tag (this is our own page, so <style> is fine here).
The wallet form: account title, mobile number, CNIC-style ID number, PIN field, OTP field, beneficiary name, submit. Keep each file as a template string; escape backticks. Do not include external scripts, fonts or images.
```

### M4. Safety review of the Guide (14:15 – 14:30, before real-site tests)

```text
Task M4: review src/guide/** and app/guide.tsx for privacy.
1. Search for every place the script reads .value, .innerText of inputs, or page text, and confirm it is only an emptiness check on non-sensitive fields.
2. Confirm no postMessage payload contains field values or page text. Allowed payloads: the message types in section 3 with counts, kinds, ids and the page URL.
3. Confirm password, one-time-code, card and PIN fields never reach the classification branch that reads anything.
4. Confirm the script does not autofill or change any field.
Report each finding with the line and fix issues in my files only. Write a short 'what the Guide can and cannot see' paragraph (plain English, 5 lines) for the consent screen and the README, in docs/guide-tests.md.
```

### M5. Real public form tests (14:30 – 15:15)

Pick two or three **public forms with no sign-in** (for example a general contact or registration form). For each, open it in the Guide screen and record in `docs/guide-tests.md`: URL, bar on focus (yes/no), form map (yes/no), safety card on password and code fields (yes/no), check button (yes/no), jargon underline (yes/no), anything that failed (custom widgets, iframes, strict page security rules, sign-in blocked).
Prompt (to help write the notes and fill `PUBLIC_FORMS`):
```text
Task M5: update app/guide.tsx PUBLIC_FORMS with these URLs and short labels: <paste the URLs that worked>. Create docs/guide-tests.md with a table: URL | bar on focus | form map | safety card | check button | jargon underline | notes, filled from these results: <paste your results>. Then list the limitations section (plain English) for the README: standard fields only, custom widgets, forms inside iframes, some single-page sites, strict page security rules, sign-in blocked in embedded browsers.
```

### M6. Test matrix and bug reports (15:15 – 16:15, then continuous)

Run this on a real phone with the latest build (or Expo Go before the APK):

| Area | Test | Pass when |
|---|---|---|
| Install | Fresh APK install, no data | Consent shows once |
| Lesson 1 | Complete all steps unaided | Reaches the receipt and result |
| Hiccups | Trigger all 8 | Each shows once and resolves |
| Oops mode | Wrong input in each field kind | Warm card, fix shown, undo works |
| Audio | Listen on voiced screens | Plays, missing clips do not crash |
| Text size | Largest level on every screen | No clipping or overlap |
| Right-to-left | Urdu text, digits and IDs | Numbers read left to right, alignment correct |
| Offline | Airplane mode | Lessons, glossary, helper chips, audio work |
| Estimate | One clean and one messy lesson | Correct rung, strength sentence |
| Guide on | Both practice forms and the public forms | Bar, map, underlines, safety card, check |
| Guide off | Same pages | Nothing injected |
| Safety | Focus password and code fields | Safety card only |
| Helper | 20 test questions | At least 14 matched, the rest honest fallback |
| Secret warning | Type a card number | Warning shown, nothing sent |
| Video | Demo queries with the server off | Curated or cached results, no crash |
| Settings | Reset data | Back to first run |
| Back button | Android back on every screen | Predictable; back_fear sheet in lessons |

Bug report format (post in the group chat and keep in `docs/bugs.md`):
```text
BUG-<n> | owner: <Anas/Ahmer/Maaz/Savera> | severity: blocker/major/minor
Where: <screen or step>
Steps: 1) ... 2) ...
Expected: ...
Actual: ...
Phone/build: <model, Android version, APK or Expo Go>
Screenshot: <attached>
```
Prompt (to keep the log tidy):
```text
Task M6: update docs/bugs.md with the following new bug reports in the standard format, keep numbering, and add a summary table at the top (id, owner, severity, status). New reports: <paste>.
```

### M7. README (15:30 – 16:15, final commit id at the very end)

```text
Task M7: create README.md for the repo using this structure and these facts. Keep placeholders in angle brackets that I will fill.
Sections: title 'Mashq (مشق)'; team (Anas, Ahmer Ali, Maaz Ali, Savera) matching the registration; final submitted commit <id and time>; target user and problem (specific parent, 3 to 4 sentences, real findings from docs/interviews.md with permission); solution and core features (Try, Surprise, Teach loop; Form Coach; Oops mode; 8 hiccups; independence ladder; jargon tap; helper; Guide browser; Find a video; fridge card); install and run (judges: download the APK from GitHub Releases <link>, open it, tap 'Install anyway' if Android warns about an unknown app, allow installing from this source if asked, tested on Android <versions>; developers: npm install, npx expo start, scan with Expo Go; optional server: cd server && npm install && node index.js, needs YOUTUBE_API_KEY); technology stack and dependencies (Expo, React Native, TypeScript, Expo Router, Zustand, react-native-webview, expo-audio, expo-print, expo-sharing, Fuse.js, optional Express server); AI tools and third-party credits (AI coding assistants used for code and content drafting, the text-to-speech service used for Urdu audio and its voice, fonts; all output reviewed by the team; team members can explain and demonstrate the implementation); known limitations and mocked or simulated features (practice forms and the Practice Person are simulated; video results in the demo come from a cache and live search has a small daily quota; the Guide finds standard form fields only; Urdu audio is generated speech checked by a native speaker for the main lessons only; the APK is a sideloaded prototype, not on the Play Store); privacy (data stays on the phone; the Guide never reads or sends what you type; network use is the optional video search only); evidence (summary of the parent conversations, link to docs/interviews.md).
Do not invent features or numbers. Mark anything unverified with <verify>.
```

### M8. Server deployment (when Ahmer says the server is ready, about 15:30)

Any free Node host works. Generic steps: create a service from the GitHub repo, set the root directory to `server`, build command `npm install`, start command `node index.js`, add the environment variable `YOUTUBE_API_KEY` (your own key from the Google Cloud console with the YouTube Data API enabled), deploy, then open `<url>/api/videos?q=test` to check. Send the URL to Ahmer. The app must still work without it, so do not spend more than 20 minutes.

### M9. Final build, release and submission (16:15 – 16:45)

Checklist (do in this order):
1. Everyone has pushed. You run `git pull --rebase origin main`, `npm install`, `npx tsc --noEmit`.
2. Note the final commit id: `git rev-parse --short HEAD`. Put it in the README.
3. Build: `eas build -p android --profile preview` (or the local build you validated).
4. Install the APK on a different phone from the one used for development, without Expo Go. Run Lesson 1 and the Guide on a practice form.
5. Create the GitHub Release (tag `v1.0-submission`), attach the APK, paste the install steps. With GitHub CLI: `gh release create v1.0-submission path/to/app.apk --title "Mashq submission" --notes "Install steps in README"`; otherwise use the GitHub website. Make a QR code from the release URL with any online QR generator and add it to the README and the pitch.
6. Check the repository: public, history visible, no secrets (search for keys), `.env` ignored.
7. Check the demo video link opens in a private window and is under 2 minutes.
8. Hackathon Hub: log in with the registered email, confirm team and members match the repo and README, paste the repo link, video link and the APK link, add up to 5 screenshots, submit, and take a timestamped screenshot of the confirmation. Have a second person watch.
9. After submitting, do not push anything that changes the submitted version.

Prompt (to prepare the release notes):
```text
Task M9: write the GitHub Release notes (Markdown) for tag v1.0-submission: what Mashq is in two sentences, the APK install steps for judges (download, open, 'Install anyway', allow from this source if asked, Android versions tested <fill>), how to use the Guide switch, known limitations (use the list from README.md), and the final commit id <fill>. Keep it under 200 words.
```

---

## 7. Done checklist

- [ ] First APK built and installed by 1:30 PM (or fallback chosen and announced).
- [ ] Guide bar appears on a bundled form on a real phone by 1:15 PM, or the fallback is agreed.
- [ ] Guide works on both practice forms and at least two public forms; does nothing when off.
- [ ] Safety review passed: no value read, nothing typed sent, sensitive fields show only the safety card.
- [ ] Test matrix run at least twice (afternoon and after the final build); bugs filed and assigned.
- [ ] README complete with the final commit id and the install steps.
- [ ] Release APK installs on a clean second phone; GitHub Release published; QR code added.
- [ ] Submitted on Hackathon Hub before 4:45 PM with a confirmation screenshot.

---

## 8. Commit routine (every 20 to 30 minutes)

```bash
git pull --rebase origin main
npx tsc --noEmit
git add app/guide.tsx src/guide src/forms eas.json README.md docs/guide-tests.md docs/bugs.md
git commit -m "feat(guide): webview screen with injected script"
git pull --rebase origin main
git push
```

---

## 9. If you are blocked

- Injection does not work on the phone by 14:00: debug with `adb logcat`, try `injectedJavaScriptBeforeContentLoaded` plus a DOMContentLoaded listener, and if it still fails keep the Guide on bundled forms only, and say so in the README.
- GLOSSARY or GUIDE_TEXT not there yet: use the placeholder object and message Savera.
- A bug is in someone else's folder: file it with the format above, do not fix it yourself.
- Build queue too long: keep testing with Expo Go, ask the group before starting a local Gradle build.
- Out of time: cut in this order: M8 server deployment, public form tests beyond two, README polish. Never cut M1, M2, M4, M9.
