# Mashq (مشق)

An Urdu-first practice app for parents and grandparents who feel unsure about online forms. Team: Anas, Ahmer Ali, Maaz Ali, Savera (registration spelling <verify>).

## Submission status

Final submitted commit: <id and time>. APK: <GitHub Release link>. Demo: <video link>.
Latest integrated team commit: `ca55cbf`, including Savera's content/audio and Ahmer's backend fixes. No GitHub release or tag was published when checked on 2026-10-31. The frontend screens now use real modules. Guide routing and native acceptance remain pending. It is not a completed or phone-tested app. See [blockers](docs/bugs.md) and [test evidence](docs/guide-tests.md).

## Target user and evidence

Mashq is designed for a parent who avoids online forms because unfamiliar boxes feel risky. Practice uses fictional details and lets the parent make the decisions. Actual interview findings and consent: <verify; docs/interviews.md contains two anonymized notes; quote permission is not yet recorded>. No participant quotes or outcome numbers are claimed.

## Solution and features

Planned team features: Try, Surprise, Teach loop; Form Coach; Oops mode; eight hiccups; independence ladder; jargon tap; helper; Guide browser; Find a video; fridge card. Their implementation in this checkout is <verify>.

Maaz's files provide a privacy-tested Guide injection script connected to Savera's Urdu/English GUIDE_TEXT and GLOSSARY, two bundled fictional forms, two public demo shortcuts, a WebView screen awaiting route integration, a validated message bridge and an Android APK build profile. Guide audio identifiers match the supplied audio map; native playback and human review remain pending. Ahmer's lesson engine, estimates, helper matcher and optional server are present; their fixture tests pass, but complete lesson/UI behavior is not yet verified.

## Install and run

Judges: download the APK from <GitHub Release link>, open it, allow installation from that source if asked, and follow Android's install prompts. Tested Android versions: <verify>. The first [EAS preview build](https://expo.dev/accounts/maazaypys-team/projects/build4bettergang/builds/a4e0e235-2805-49da-bcea-059fd6a1a0c1) has finished. [Download the early preview APK](https://expo.dev/artifacts/eas/E__ywbzEPaFe8jtt95kg5_J5rIaYPbKUYQAXu0-2xAs.apk). It was built before the latest integrations and uses the older fake wiring; it is not a submission APK. Emulator installation succeeds, but Android OS ANR dialogs prevented reliable interaction testing. No physical-phone validation or final release gates have passed.

Developers: from this directory, run `npm ci`, then `npx expo start` and scan with a compatible Expo Go. WebView is installed and the Guide screen typechecks; the real frontend wiring is complete, while the Guide route is still needed from Anas. Savera's content/audio exports are now supplied. Ahmer's `useApp`, `playClip`, and `uiBus` interfaces are now present. The current Router root is `src/app`; Anas must expose the Guide route there. See docs/bugs.md before expecting the Guide to run.

Optional server: `cd server`, `npm ci`, then `npm start`. It listens on port 8787 by default. Without a key, uncached searches return a safe 503 response. For live search, set `YOUTUBE_API_KEY` in the process environment (PowerShell: `$env:YOUTUBE_API_KEY='<your key>'`), then start the server. The start command does not load `.env` automatically. server/.env is now ignored; root .env still needs ignore coverage. Deployment URL: <verify; no hosting account supplied>.

Desktop checks (from the app root): `node src/guide/test/run.cjs`, `node src/guide/test/forms.test.cjs`, `node src/guide/test/bridge.test.cjs`, `node src/guide/test/public-forms.test.cjs`. These use the installed Edge browser and do not add dependencies. Eleven Guide fixture checks, both actual bundled-form smoke suites and bridge validation pass. Full typecheck passes; uncached lint has zero errors and two matcher warnings. The real-KB acceptance test currently gets 13/20 expected answers (target: at least 14), tracked in docs/bugs.md. The public-form test also passes against Selenium's demo form and httpbin's form without typing or submitting anything. Android WebView results remain pending.

Android preview: `eas whoami`, then `eas build -p android --profile preview` after integration, typecheck and phone checks. The project is already linked in app.json. See [Expo build setup](https://docs.expo.dev/build/setup/).

## Stack and dependencies

Present: Expo SDK 58, React Native, TypeScript, Expo Router, Zustand, AsyncStorage, expo-audio, Fuse.js, safe-area support and ESLint. The optional server declares Express and CORS. The frontend commit also adds react-native-webview 14.0.1, expo-print, expo-sharing, expo-file-system, expo-localization and Noto Naskh Arabic fonts. Maaz's work does not change dependency declarations.

## Privacy

The Guide inspects field labels and metadata to explain standard boxes. It checks only whether non-sensitive required boxes are empty. It never forwards typed values or page text to the app. Password, PIN, verification-code and card fields show a safety card without inspecting their values. The bundled forms never submit data. Public websites have their own network behavior and privacy practices; incognito does not stop a website receiving anything entered or submitted. The store persists app state locally through AsyncStorage. Optional live video search sends the search query to the configured server and YouTube; it rejects secret-like queries before searching. Native runtime and full-app privacy checks remain <verify>.

## Known limitations and simulations

Practice forms and the Practice Person are fictional; the supplied persona is fictional. The Guide supports standard fields; custom widgets, iframe forms, some single-page sites and strict page security rules may not work. Embedded browsers may block sign-in. Two public demo forms pass desktop checks and are available as Guide shortcuts; Android WebView and real-device verification remain pending. The Guide now uses the supplied Urdu/English dictionaries. Audio playback and helper/jargon sheets need team integration. Urdu speech is generated and still pending native-speaker review. Video cache files are currently empty; 12 curated video entries are supplied but full-watch approval remains pending and live search needs a server URL/key. Backend/server fixtures cover guards, fallback, cache, quota, timeout and rate limiting; native live-search and offline app behavior still need verification. The intended APK is a sideloaded prototype, not a Play Store release.

## Credits

Codex assisted with Guide code and documentation drafting. Team review and ability to explain the implementation: <verify>. Urdu audio was generated with unofficial edge-tts using ur-PK-UzmaNeural on 31 October 2026; gTTS (ur) is the fallback tool. All clips remain drafts pending native-speaker approval in content/review-status.txt. Noto Naskh Arabic: Copyright 2022 The Noto Project Authors, licensed under SIL Open Font License 1.1; distributed through @expo-google-fonts/noto-naskh-arabic (package code: MIT). The bundled regular font matches the package's regular font SHA-256. [Font license](https://github.com/expo/google-fonts/blob/master/font-packages/noto-naskh-arabic/LICENSE_FONT). Anas still needs to include the license alongside the bundled asset. Other asset credits: <verify>. No external scripts, fonts or images are loaded by the bundled forms.

## Draft release notes — v1.0-submission

Mashq helps parents practice unfamiliar online forms using fictional information. Its Guide explains standard fields and keeps sensitive boxes private.

Download <APK link>, open it and allow installation from that source if asked. Follow Android's installation prompts; tested Android versions: <fill>. After the pending Guide route integration, open the Guide, choose a practice form, turn on “Guide me”, then focus a box. “Listen”, “Helper” and “Check” offer guidance; sensitive boxes show only a safety card. “Close and clear” exits the incognito browser.

Limitations: standard fields only; custom widgets, iframe forms, some single-page sites, restrictive security rules and embedded sign-in may fail. Practice data is fictional. Urdu content/audio, offline behavior and video search need verification. Current checkout still has integration blockers; do not publish these notes as a tested release until resolved.

Final commit: <fill>. Android versions: <fill>.
