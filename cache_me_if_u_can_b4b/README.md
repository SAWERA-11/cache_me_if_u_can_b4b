# Mashq (مشق)

An Urdu-first practice app for parents and grandparents who feel unsure about online forms. Team: Anas, Ahmer Ali, Maaz Ali, Savera (registration spelling <verify>).

## Submission status

Final submitted commit: <id and time>. APK: <GitHub Release link>. Demo: <video link>.
Latest integrated team commit: `15da65c` (backend, store, audio interface, helper and video server). No GitHub release or tag was published when checked on 2026-10-31. The app still has a starter home screen and pending Guide routing/content integration. It is not a completed or phone-tested app. See [blockers](docs/bugs.md) and [test evidence](docs/guide-tests.md).

## Target user and evidence

Mashq is designed for a parent who avoids online forms because unfamiliar boxes feel risky. Practice uses fictional details and lets the parent make the decisions. Actual interview findings and consent: <verify; docs/interviews.md has not been supplied>. No participant quotes or outcome numbers are claimed.

## Solution and features

Planned team features: Try, Surprise, Teach loop; Form Coach; Oops mode; eight hiccups; independence ladder; jargon tap; helper; Guide browser; Find a video; fridge card. Their implementation in this checkout is <verify>.

Maaz's files provide a Guide injection script, English placeholder dictionary, two bundled fictional forms, a WebView screen awaiting route integration, a validated message bridge connected to Ahmer's shared interfaces, and an Android APK build profile. Urdu strings and audio are pending Savera's reviewed content. Ahmer's lesson engine, estimates, helper matcher and optional server are present; their fixture tests pass, but complete lesson/UI behavior is not yet verified.

## Install and run

Judges: download the APK from <GitHub Release link>, open it, allow installation from that source if asked, and follow Android's install prompts. Tested Android versions: <verify>. No APK has been produced or validated in this session. A build has not passed the release gates.

Developers: from this directory, run `npm ci`, then `npx expo start` and scan with a compatible Expo Go. Guide integration requires `react-native-webview` and a route from Anas, plus content/audio exports from Savera. Ahmer's `useApp`, `playClip`, and `uiBus` interfaces are now present. The current Router root is `src/app`; Anas must expose the Guide route there. See docs/bugs.md before expecting the Guide to run.

Optional server: `cd server`, `npm ci`, then `npm start`. It listens on port 8787 by default. Without a key, uncached searches return a safe 503 response. For live search, set `YOUTUBE_API_KEY` in the process environment (PowerShell: `$env:YOUTUBE_API_KEY='<your key>'`), then start the server. The current start command does not load `.env` automatically, and plain `.env` files are not ignored yet; keep keys outside the repository. Deployment URL: <verify; no hosting account supplied>.

Desktop checks (from the app root): `node src/guide/test/run.cjs`, `node src/guide/test/forms.test.cjs`, `node src/guide/test/bridge.test.cjs`. These use the installed Edge browser and do not add dependencies. Eleven fixture checks, both actual bundled-form smoke suites and bridge validation pass. Android WebView results remain pending.

Android preview: `eas whoami`, then `eas build -p android --profile preview` after integration, typecheck and phone checks. The project is already linked in app.json. See [Expo build setup](https://docs.expo.dev/build/setup/).

## Stack and dependencies

Present: Expo SDK 58, React Native, TypeScript, Expo Router, Zustand, AsyncStorage, expo-audio, Fuse.js, safe-area support and ESLint. The optional server declares Express and CORS. Still absent: react-native-webview, expo-print and expo-sharing. Owners must add compatible versions; Maaz's work does not change dependency declarations.

## Privacy

The Guide inspects field labels and metadata to explain standard boxes. It checks only whether non-sensitive required boxes are empty. It never forwards typed values or page text to the app. Password, PIN, verification-code and card fields show a safety card without inspecting their values. The bundled forms never submit data. Public websites have their own network behavior and privacy practices; incognito does not stop a website receiving anything entered or submitted. The store persists app state locally through AsyncStorage. Optional live video search sends the search query to the configured server and YouTube; it rejects secret-like queries before searching. Native runtime and full-app privacy checks remain <verify>.

## Known limitations and simulations

Practice forms and the Practice Person are fictional; the persona content has not arrived. The Guide supports standard fields; custom widgets, iframe forms, some single-page sites and strict page security rules may not work. Embedded browsers may block sign-in. No public form or real Android device has been verified yet. English dictionary placeholders apply even when Urdu is selected. Audio playback and helper/jargon sheets need team integration. Generated Urdu speech and native-speaker review: <verify>. Video cache files are currently empty; curated content is missing and live search needs a server URL/key. Local server guards, no-key fallback and rate limiting pass smoke checks; live search and offline app behavior are unverified. The intended APK is a sideloaded prototype, not a Play Store release.

## Credits

Codex assisted with Guide code and documentation drafting. Team review and ability to explain the implementation: <verify>. Urdu text-to-speech service and voice: <verify>. Font licenses and third-party asset credits: <verify>. No external scripts, fonts or images are loaded by the bundled forms.

## Draft release notes — v1.0-submission

Mashq helps parents practice unfamiliar online forms using fictional information. Its Guide explains standard fields and keeps sensitive boxes private.

Download <APK link>, open it and allow installation from that source if asked. Follow Android's installation prompts; tested Android versions: <fill>. Open the Guide, choose a practice form, turn on “Guide me”, then focus a box. “Listen”, “Helper” and “Check” offer guidance; sensitive boxes show only a safety card. “Close and clear” exits the incognito browser.

Limitations: standard fields only; custom widgets, iframe forms, some single-page sites, restrictive security rules and embedded sign-in may fail. Practice data is fictional. Urdu content/audio, offline behavior and video search need verification. Current checkout still has integration blockers; do not publish these notes as a tested release until resolved.

Final commit: <fill>. Android versions: <fill>.
