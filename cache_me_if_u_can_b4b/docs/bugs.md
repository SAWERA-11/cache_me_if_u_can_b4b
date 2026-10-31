# Integration and bug log

Status refreshed 2026-10-31 from source checks only (tsc, eslint on src/, content and backend suites). "Resolved in source" is not phone evidence: no real-device run is recorded yet.

| ID | Owner | Severity | Status |
|---|---|---|---|
| BUG-1 | Anas | blocker | Resolved in source: react-native-webview declared and resolves; native verification pending (phone) |
| BUG-2 | Ahmer | blocker | Resolved in 15da65c; audio map now present |
| BUG-3 | Anas | blocker | Resolved in source: src/app/guide.tsx re-exports the Guide; Home links to /guide; phone check pending |
| BUG-4 | Savera | blocker | Resolved: src/content and src/audio/audioMap exist; tsc passes |
| BUG-5 | Ahmer | major | Resolved in source: eslint reports no errors in src/ |
| BUG-6 | Anas | major | Resolved in source: plain .env files are ignored |
| BUG-7 | Ahmer | minor | Resolved in docs: server README states Node does not load .env |
| BUG-8 | Maaz | major | Resolved in source: npx tsc --noEmit passes |

## BUG-1 | owner: Anas | severity: blocker
Where: package.json / Guide screen.
Steps: 1) Install declared packages. 2) Typecheck/import app/guide.tsx.
Expected: react-native-webview resolves.
Actual: Resolved in source by ba72738: package.json now declares react-native-webview 14.0.1. Native verification still depends on BUG-3 and content integration.
Phone/build: Windows source review; no phone build.
Screenshot: Not applicable; compiler evidence.

## BUG-2 | owner: Ahmer | severity: blocker
Where: src/guide/bridge.ts and app/guide.tsx.
Steps: 1) Typecheck the Guide files. 2) Resolve shared imports.
Expected: src/store/useApp, src/lib/audio and src/lib/uiBus exist with the MD contracts.
Actual: Resolved by 15da65c: all three modules now exist with compatible Guide contracts. playClip still imports Savera's missing src/audio/audioMap (see BUG-4). Native integration remains untested.
Phone/build: Windows source review; no phone build.
Screenshot: Not applicable; missing source modules.

## BUG-3 | owner: Anas | severity: blocker
Where: Expo Router root.
Steps: 1) Inspect src/app/_layout.tsx. 2) Locate Maaz's allowed app/guide.tsx.
Expected: A /guide route is reachable from the app.
Actual: Existing routes use src/app; Maaz's allowed root app/guide.tsx is not registered there. Please expose/re-export the Guide from src/app/guide.tsx and add navigation as appropriate.
Phone/build: Windows source review.
Screenshot: Not applicable.

## BUG-4 | owner: Savera | severity: blocker
Where: src/content and src/audio/audioMap; Guide dictionary and backend imports.
Steps: 1) Pull 15da65c and run npm ci. 2) Run npx tsc --noEmit and npm run lint.
Expected: Reviewed content exports and AUDIO map resolve.
Actual: src/content and src/audio/audioMap are absent. The engine/helper/translation/video modules import content; playClip imports the missing audio map. Please supply the agreed content exports, GUIDE_TEXT, GLOSSARY and AUDIO map. The Guide continues to use explicitly marked English placeholders.
Phone/build: Windows source review.
Screenshot: Not applicable.

## BUG-5 | owner: Ahmer | severity: major
Where: src/engine/useRunner.ts:14.
Steps: 1) Run npm ci. 2) Run npm run lint.
Expected: Lesson initialization passes React purity checks.
Actual: react-hooks/purity rejects Date.now() during render in createInitialState(lesson, 0, Date.now()). Please initialize timing outside render using a pattern accepted by the configured rules.
Phone/build: Windows / source 15da65c.
Screenshot: Not applicable; lint output.

## BUG-6 | owner: Anas | severity: major
Where: repository .gitignore.
Steps: Run git check-ignore server/.env.
Expected: A local server API-key file is ignored.
Actual: No match; only .env*.local is ignored. Please ignore plain .env files before anyone follows server setup instructions. No key file was created during testing.
Phone/build: Windows / source 15da65c.
Screenshot: Not applicable.

## BUG-7 | owner: Ahmer | severity: minor
Where: server/README.md and server/package.json.
Steps: 1) Follow README to put YOUTUBE_API_KEY in .env. 2) Run npm start.
Expected: The configured key is loaded for live search.
Actual: npm start invokes node index.js, which reads process.env but does not load .env. This is a source-review finding; no real key was used. Please correct setup instructions or add an explicit environment-file loading mechanism compatible with the advertised Node version.
Phone/build: Windows / Node 24; server no-key fallback tested.
Screenshot: Not applicable.

## BUG-8 | owner: Maaz | severity: major
Where: app/guide.tsx:46.
Steps: 1) Merge ba72738. 2) Run npm ci, then npx tsc --noEmit.
Expected: Guide WebView props typecheck with installed react-native-webview 14.0.1.
Actual: TS2769 reports WebView props as never. Diagnose the WebView/React Native type integration and resolve in Maaz's code where possible; coordinate with Anas if dependency or shared configuration changes are required.
Phone/build: Windows source check after npm ci installed 811 packages.
Screenshot: Not applicable; compiler output.

## Team checklist after fetching ba72738

This is repository evidence as of 2026-10-31, not a claim about unpublished work on teammates' machines. Latest frontend source was merged into Maaz's branch without conflicts. Backend fixture and Guide desktop checks passed before that merge; native integration acceptance remains pending.

### Anas

- [ ] Replace src/theme/wire/fakes.ts exports with Ahmer's real store, runner, audio, translation, helper, video and event bus, and Savera's real content. GlobalSheets must listen to the same uiBus used by the Guide; Home/Settings must use the same store.
- [ ] Register /guide under src/app (re-export Maaz's app/guide.tsx); verify Home navigation and Guide-off entry behavior.
- [ ] Finish resume/continue wiring with Ahmer, real next-lesson/retry behavior, and before/after comfort flow. Verify the complete Try/Surprise/Teach journey against the lesson content.
- [ ] Replace temporary English helper/video chips, fridge-card text and result literals with reviewed bilingual content.
- [ ] Ignore plain .env files (BUG-6); run full lint/typecheck after integration.
- [ ] Real-phone accessibility pass: Urdu/RTL/digits, all three text sizes, >=56dp targets, gallery, Android back, PDF font/rendering and sharing.

### Ahmer

- [ ] Fix useRunner Date.now render-purity failure (BUG-5).
- [ ] Coordinate the real runner/store integration with Anas, including resume state, retry/reset, next-lesson/adaptation and result behavior. Current Home explicitly disables resume, and ResultView has a next/retry TODO.
- [ ] Replace helper chip placeholder IDs with Savera's final KB IDs; run 20 real-content questions, at least 14 matches, with honest fallback for the rest.
- [ ] Verify all eight hiccups, undo/stuck/recovery, rung/strength results and real completed/exited event recording with final lesson content.
- [ ] Prewarm video caches with Savera; test curated/cache fallback with server offline, secret rejection, timeout and no-crash behavior. Current cache files are empty.
- [ ] Fix server .env startup documentation/loading (BUG-7); coordinate optional API URL with Maaz after deployment.
- [ ] Finish B8 privacy review and full lint/typecheck with final content/audio modules.

### Savera

- [ ] Push src/content exports (including LESSONS/LESSON1) and src/audio/audioMap.ts first; both are absent in fetched branches and block shared-module imports.
- [ ] Finish bilingual Lesson 1/persona/Teach content, all 8 hiccups and 6 safety lines, complete UI strings and GuideStrings/GUIDE_TEXT.
- [ ] Supply 30 glossary terms (at least 20 voiced) and 40 helper KB entries; align IDs/patterns/chips with Ahmer and Maaz.
- [ ] Generate audio CSV/scripts/assets/map; listen to priority 1 and 2 clips and obtain native-speaker approval. Give Maaz the TTS service/voice and font credits.
- [ ] Supply 10-15 watched, verified video references and fridge-card content; coordinate cache population with Ahmer.
- [ ] Push consented interview evidence, pitch notes and under-two-minute demo script. No evidence/pitch files are present in fetched source.

### Maaz

- [ ] Resolve the newly exposed WebView JSX props typecheck failure (BUG-8); this is now visible because Anas supplied the dependency.

- [ ] Wire the Guide dictionary to Savera's actual GUIDE_TEXT/GLOSSARY when they arrive; verify audio IDs.
- [ ] Recheck native Guide after Anas registers the route and replaces fake store/event bus; run both bundled forms and at least two public forms, including sensitive fields and Guide-off cleanup.
- [ ] Run the complete real-phone matrix twice, including offline, largest text, Urdu/RTL, helper, all hiccups, reset and Android back. Record actual phone/build evidence and file owner-specific bugs.
- [ ] Build the first usable preview APK, then the final APK after integration checks; validate a clean installation on a second phone.
- [ ] Optionally deploy the server with a hosting account/key and give Ahmer the URL; local no-key smoke tests already pass.
- [ ] Finalize README with actual features, interviews, audio/font credits, tested Android versions, final commit/time and APK/video links.
- [ ] Publish v1.0-submission with APK, add QR/screenshots, verify public repo/history/secrets and video access, and submit on Hackathon Hub with timestamped confirmation. No APK/release/submission is verified yet.

Recommended order: Savera publishes content/audio exports; Anas replaces fakes and registers Guide while Ahmer resolves hook/integration issues; everyone gets lint/typecheck passing; Maaz performs phone gates, APK and submission.
