# Integration and bug log

Current source: main ca55cbf merged into Maaz's branch. Full strict typecheck passes. Uncached lint has zero errors and two require-import warnings in Ahmer's matcher. The frontend integration seam now exports real modules; /guide is still absent.

| ID | Owner | Severity | Current status |
|---|---|---|---|
| BUG-1 | Anas | blocker | Resolved: WebView 14.0.1 installed |
| BUG-2 | Ahmer | blocker | Resolved: shared store/audio/event bus supplied |
| BUG-3 | Anas | blocker | Resolved in source: src/app/guide.tsx re-exports the Guide; Home links to /guide; phone check pending |
| BUG-4 | Savera | blocker | Source blocker resolved: content and audio supplied; human review pending |
| BUG-5 | Ahmer | major | Resolved: latest hook passes typecheck and uncached lint |
| BUG-6 | Anas | major | Resolved in source: root and server .env files are ignored |
| BUG-7 | Ahmer | minor | Resolved: server setup accurately documents environment variables |
| BUG-8 | Maaz | major | Resolved: explicit WebView<object> clears JSX typing failure |
| BUG-9 | Ahmer / Savera | major | Open: real-content helper acceptance gets 13/20; target is at least 14 |

## BUG-3 | owner: Anas | severity: blocker
Where: src/theme/wire/index.ts, src/components/GlobalSheets.tsx and src/app.
Steps: Inspect the integration seam and Guide route registration.
Expected: Screens, Guide and global sheets share Ahmer's real store and uiBus; /guide is reachable.
Actual: ca55cbf removes fakes and connects the real modules, including the shared store and uiBus. src/app/guide.tsx is still absent; register/re-export Maaz's app/guide.tsx. A request to allow Maaz this one-line exception is pending; no out-of-owner file was edited.
Phone/build: Source ca55cbf; first preview APK installed on Android 17/API 37 emulator, but it predates these integrations.
Screenshot: Temporary local capture, not submission evidence.

## BUG-6 | owner: Anas | severity: major
Where: repository .gitignore.
Steps: Run git check-ignore .env server/.env.
Expected: Local environment files are ignored.
Actual: Ahmer added server/.gitignore, protecting server/.env. The root .gitignore still only ignores .env*.local. Ignore root .env/.env.* while preserving examples. No key file was created during these checks.
Phone/build: Source 55c18b1.
Screenshot: Not applicable.

## BUG-9 | owner: Ahmer / Savera | severity: major
Where: Actual KB/matcher acceptance, src/guide/test/acceptance.test.cjs.
Steps: Run node src/guide/test/acceptance.test.cjs.
Expected: At least 14 of 20 independently phrased questions return the expected KB answer; unmatched questions return null.
Actual: 13/20 match. Misses return null (honest fallback), including 'What is a verification code?', 'What does account title mean?', 'What is captcha?', 'What is an optional box?', 'my file is too large', 'session khatam ho gaya', and 'can I try again please?'. Coordinate variants or matching improvements without weakening privacy guards. Do not change the acceptance questions just to obtain a passing result.
Phone/build: Node desktop test using real KB and exported createMatcher; native sheet behavior pending integration.
Screenshot: Not applicable; reproducible console evidence.

## Resolved evidence

- BUG-1/2: Anas's WebView dependency and Ahmer's actual contracts are installed/present.
- BUG-4: Savera supplied LESSONS/LESSON1, 38 glossary terms, 40 KB entries, UI/Guide/fridge copy and generated audio/map. Maaz now imports GUIDE_TEXT and GLOSSARY directly. All 12 Guide audio identifiers resolve; Urdu and English dictionaries differ; glossary regex patterns compile.
- BUG-5: npx tsc --noEmit passes; npx expo lint --no-cache has zero errors. Backend/service/server suites and content checker pass.
- BUG-7: server/README.md now explains process environment configuration and the lack of automatic .env loading.
- BUG-8: app/guide.tsx explicitly uses WebView<object> for component/ref; no dependencies or shared contracts changed.

## Remaining team work

### Anas

- [x] Connect src/theme/wire to real modules/content and remove fakes (ca55cbf).
- [ ] Register /guide under src/app and verify Home navigation, shared Guide state and GlobalSheets events.
- [ ] Finish resume/continue, retry/next lesson, comfort flow, translated fridge/result/helper/video UI and complete Try/Surprise/Teach journey with the real runner.
- [ ] Ignore root .env files; include the bundled Noto font license.
- [ ] Check Urdu/RTL/digits, largest text, tap targets, gallery, Android back, PDF and sharing on real phones.

### Ahmer

- [ ] Resolve BUG-9 with Savera; at least 14/20 expected matches are required.
- [ ] Help Anas connect the real runner, persistence, resume/catalog and shared event bus. Latest backend fixtures pass and the frontend now uses real modules; native integration acceptance remains pending.
- [ ] Populate demo video cache with verified references from Savera; verify native offline/video fallback after wiring.
- [ ] Optionally remove the two require-import lint warnings without changing behavior; full uncached lint currently exits successfully.

### Savera

- [ ] Supply Guide chrome STRINGS keys guide_practice_1, guide_practice_2, guide_reload and guide_close_clear; Maaz uses English fallback labels until supplied.

- [ ] Perform native-speaker review of text AND audio; review-status.txt still marks clips pending. Remove TODO(UR-review) only after approval.
- [x] Supply two anonymized parent conversation notes.
- [ ] Record who held the interviews and permission to quote; permissions are not yet recorded.
- [x] Supply 12 curated video entries.
- [ ] Confirm every video was watched fully and is safe to recommend; the source still has a watch-review TODO. Demo cache files remain empty.
- [ ] Improve the missing helper phrasings with Ahmer (BUG-9).
- [ ] Finalize pitch/script with verified claims and actual demo/screenshots; provide any remaining asset credits.

### Maaz

- [x] Fix WebView typing and connect real Guide dictionaries/glossary/audio identifiers.
- [x] Pass Guide desktop privacy/behavior tests on both bundled forms and two public demo forms; add public shortcuts.
- [x] Run backend/server/content checks and the 20-question real-KB acceptance test; file its failure instead of claiming a pass.
- [x] Export the Android JS/Hermes frontend bundle and submit the first EAS preview build; final APK/install gate is still pending.
- [x] Verify SDK/emulator setup; initial Expo Go Consent/Home smoke and first APK installation completed. Native acceptance remains pending; the emulator shows recurring Android System UI/Launcher ANRs.
- [x] First EAS preview succeeded, APK downloaded and installed on the emulator; Consent screen rendered. It predates current integrations and is not a submission build. Android OS ANR dialogs prevented reliable interaction testing.
- [ ] After Anas's integration, run Guide/native sheets/audio and the full phone matrix twice, including offline and a clean second physical phone.
- [ ] Optionally deploy the server once hosting credentials and an API key are available.
- [ ] Finalize README, actual tested Android versions, final commit/time, APK/video links and QR.
- [ ] Publish final APK release and submit to Hackathon Hub with confirmation evidence.
