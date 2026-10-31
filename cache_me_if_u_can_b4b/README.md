# Mashq (مشق)

An Urdu-first Expo/React Native app for practising unfamiliar online forms using a fictional Practice Person. Team: Anas (frontend), Ahmer Ali (backend), Maaz Ali (Guide/release), Savera (content/audio).

## Current status

The app is connected to the real content, store, runner, helper, audio map and video catalog. The Guide route is registered and its WebView typing blocker is fixed. Full TypeScript and uncached ESLint checks pass in this checkout.

This is **not yet a phone-validated release**. A preview APK is built from the final commit (see Release links below), but no real-device acceptance results or public-form acceptance results are claimed here. See the ordered remaining-work list below. Older entries in `docs/bugs.md` describe historical blockers; several have now been fixed in source.

## Implemented

- Consent, Home, Settings, practice lessons, review/receipt/result, helper/jargon sheets, videos and printable fridge card.
- Two lessons: Lesson 1 (apply for a service card) and "Order from a delivery app" (location permission, address pin, quantity, cart total, phone, cash on delivery, placing the order, contacting the rider, refusing a PIN request, receiving the order). Both have Urdu voice and a Listen button on every question.
- Continue from the last exited step; pause-and-return; retry with a fresh runner; change an answer from review and return to review. Answers stay in memory, not persisted storage.
- Optional comfort questions before and after a lesson. When there is no next lesson, the result screen returns Home rather than pretending another lesson exists.
- All eight hiccups, undo, answer reveal, scoring and pure adaptation rules. A date field's visible boxes follow the runner value, including undo and revisits.
- Real bilingual lesson, glossary, KB, Guide text, UI strings and generated local audio assets. New integration strings remain marked for Urdu review.
- Guide on three bundled fictional pages (services form, wallet form, ride booking) plus an address bar to open any http(s) website, bilingual dictionary/audio, sensitive-field protection, jargon, required-field emptiness checks and Hide/off synchronization.
- Offline curated video matching, relevant-topic ranking, at most three results, optional cached/live search, timeout and secret guards.
- Local persisted preferences/progress with validation; cold-start hydration before navigation; Guide off on startup; plain `.env` files ignored.

## Remaining work — do in this order

| Order | Owner | Required next step |
|---|---|---|
| 1 | Savera + native Urdu reviewer | Read every Urdu line and listen to priority 1/2 clips, including the new integration strings. Update `content/review-status.txt` only after actual approval; do not remove review markers automatically. |
| 2 | Savera | Confirm who conducted each interview and obtain permission before using participant quotes in the pitch/video. Interview permission is currently not recorded. Watch each curated video completely and confirm it does not solicit a PIN/code; the catalog's watch-through TODO remains open. |
| 3 | Anas + Ahmer | Run the full journey on Android: consent/restart, all fields and eight hiccups, review editing, pause/Continue, retry, comfort answers, receipt and result. Test offline, all text sizes, Urdu/RTL/digits, audio speed, reset, hardware back, PDF rendering/sharing and helper follow-ups. A desktop unit test is not evidence of phone behavior. |
| 4 | Anas + Ahmer + Savera | Finish the separate Teach/advise-a-neighbour interaction from the original product loop. Recovery habits exist, but there is no distinct Teach interaction yet. Connect the tested adaptation rules to the next-lesson experience when additional lesson content is supplied; Lesson 1 and the delivery lesson are bundled. |
| 5 | Maaz | Verify Guide behavior on a real Android WebView, both bundled forms and at least two public forms without sign-in. Populate `PUBLIC_FORMS` only from successful tests. Check Guide-off cleanup and password/PIN/card/code privacy. |
| 6 | Maaz | Create a preview APK with EAS, download/install it, complete the phone matrix, then repeat on the final build and a clean second phone. Record build IDs, device/Android versions and observed results in `docs/guide-tests.md`. EAS login access was verified; no build has been created or validated in this session. |
| 7 | Maaz + team | Complete the demo video (under two minutes), screenshots, tested install instructions, asset/font/TTS credits and final release notes. Publish the tested APK/tag/release, add QR links, then submit on Hackathon Hub and save a timestamped confirmation. No release/submission should be marked complete without that evidence. |
| Optional | Maaz + Ahmer + Savera | Deploy `server/`, configure `YOUTUBE_API_KEY` on the host and `EXPO_PUBLIC_API_URL` for the app, and test actual live searches. Cache files are still empty; populate them only from reviewed video references. The app's bundled curated results work without this server. |

## Run locally

From this directory:

```sh
npm ci
npx expo start
```

Use an SDK-compatible Expo Go or development build. Routes live in `src/app/`; `src/app/guide.tsx` exposes the Guide screen. No native `ios/` or `android/` files are hand-maintained.

## Verification

```sh
npx tsc --noEmit
npx expo lint --no-cache
node src/lib/__tests__/run.cjs
node src/lib/__tests__/typecheck.cjs
node tools/check_content.mjs
node server/index.test.js
node src/guide/test/bridge.test.cjs
node src/guide/test/run.cjs
node src/guide/test/forms.test.cjs
```

On Windows with a restrictive PowerShell script policy, use `npx.cmd` instead of `npx`. Guide desktop tests use installed Microsoft Edge; set `MASHQ_TEST_BROWSER` to override its executable path.

Verified in this session: full TypeScript and lint; backend/content suites; 19/20 representative real-KB questions with no incorrect answers; all eight hiccups and rungs 2/1/0 against the real lesson; 143 referenced clips bound to nonempty assets; offline ranked video results; server guards/cache/quota/timeout/rate-limit tests; Guide bridge, eleven desktop fixture checks and both bundled-form smoke suites. Generated speech quality and native playback remain human/device checks.

Android preview, once ready to run the phone gates:

```sh
npx eas-cli@latest whoami
npx eas-cli@latest build --platform android --profile preview
```

The existing EAS project and preview APK profile are in `app.json` and `eas.json`. Build jobs/signing still require the configured account and available build capacity. Do not recreate the project link.

## Optional video server

Follow [server/README.md](server/README.md). Run `npm ci` and `npm start` inside `server/`. Set `YOUTUBE_API_KEY` in the process/host environment; Node does not load `.env` automatically. Default port: `8787`. Without a key, uncached requests return a safe unavailable response. Never commit keys or put the YouTube key in the mobile app.

## Privacy and limitations

Practice details are fictional. Typed answers and helper text are not stored in AsyncStorage or sent by the lesson/helper. A cold resume restores the step pointer and event evidence, not typed answers; review answers and hiccup recovery counters are session-local. Preferences, counts, results and comfort answers stay on the device.

The Guide reads labels/metadata locally and only checks emptiness of ordinary required fields. Sensitive fields are not inspected; field values/page text are not forwarded to the app. Incognito does not prevent a public website from receiving information a person types or submits to that website. Bundled forms do not submit data.

Optional video searches can send non-secret search queries to the configured server/YouTube. Thumbnails and embeds also require internet. Secret-like numbers are rejected before video search. The catalog contains reviewed-by-source candidates whose full watch-through approval is still pending; do not treat the UI's team-check label as completed human approval until Savera signs off.

The Guide supports ordinary fields, not every custom widget, iframe, strict site policy or embedded sign-in. Public forms, Android accessibility, PDF Urdu font rendering, deployment, APK installation and submission remain unverified until the corresponding remaining-work item has evidence.

## Content and credits

Interview notes: [docs/interviews.md](docs/interviews.md). Pitch/demo draft: [docs/pitch.md](docs/pitch.md). Backend contracts: [docs/api.md](docs/api.md). Generated audio scripts and map tools are under `tools/`; the configured default speech route is edge-tts with `ur-PK-UzmaNeural`, with a gTTS fallback. Confirm which route actually generated the shipped clips before final credits. Font packages/assets and any third-party video references need final license/attribution review. Codex assisted with implementation, tests and documentation.

## Release links and credits (from Maaz's branch)

Final submitted code commit: `83f0e65` (31 October 2026, 5:34 PM PKT). The only later commit updates this README. APK: [EAS preview build from 83f0e65](https://expo.dev/accounts/maazaypys-team/projects/build4bettergang/builds/74945b6b-3832-4f13-9870-e65209f55535). Demo: <video link>.

Judges: open the APK link above on an Android phone, download the APK, open it, allow installation from that source if asked, and follow Android's install prompts. Tested Android versions: <verify>. The first [EAS preview build](https://expo.dev/accounts/maazaypys-team/projects/build4bettergang/builds/a4e0e235-2805-49da-bcea-059fd6a1a0c1) has finished. [Download the early preview APK](https://expo.dev/artifacts/eas/E__ywbzEPaFe8jtt95kg5_J5rIaYPbKUYQAXu0-2xAs.apk). It was built before the latest integrations and uses the older fake wiring; it is not a submission APK. Emulator installation succeeds, but Android OS ANR dialogs prevented reliable interaction testing. No physical-phone validation or final release gates have passed.

Codex assisted with Guide code and documentation drafting. Claude Code (Anthropic) assisted with the delivery app lesson, EAS builds and presentation drafting. Team review and ability to explain the implementation: <verify>. Urdu audio was generated with unofficial edge-tts using ur-PK-UzmaNeural on 31 October 2026; gTTS (ur) is the fallback tool. All clips remain drafts pending native-speaker approval in content/review-status.txt. Noto Naskh Arabic: Copyright 2022 The Noto Project Authors, licensed under SIL Open Font License 1.1; distributed through @expo-google-fonts/noto-naskh-arabic (package code: MIT). The bundled regular font matches the package's regular font SHA-256. [Font license](https://github.com/expo/google-fonts/blob/master/font-packages/noto-naskh-arabic/LICENSE_FONT). Anas still needs to include the license alongside the bundled asset. Other asset credits: <verify>. No external scripts, fonts or images are loaded by the bundled forms.
