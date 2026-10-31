# Guide validation and release gates

## Setup

Work directory: nested cache_me_if_u_can_b4b app directory containing package.json.
Windows: Node v24.11.0, npm 11.20.0, Java 21 and EAS CLI 24.14.0 are installed. EAS authentication and team access were confirmed earlier. The EAS project is already linked in app.json. Android SDK platform-tools and emulator exist under %LOCALAPPDATA%/Android/Sdk (not on PATH). WHPX acceleration is usable. No physical Android device is attached. GitHub has no published releases/tags as of this check. Latest main 55c18b1, including content/audio/backend fixes, is merged; conflicts with older copies of Maaz files were resolved preserving the current fixes/evidence. App npm ci installed 811 packages; server npm ci installed 70 packages. Dependency declarations/lockfiles were not edited.

Validation on 2026-10-31:

| Check | Actual result |
|---|---|
| Guide fixture in Microsoft Edge | 11 checks pass, including injection with a password already focused |
| Actual bundled services and wallet HTML | Both pass map, safety, required check, payload privacy, local submit and cleanup smoke checks |
| Native message bridge (isolated mocks) | Valid identifiers/kinds accepted; malformed, unknown and sensitive payloads ignored; extra page data not forwarded |
| Ahmer validators, runner and estimate fixtures | All three suites pass |
| Ahmer helper matcher fixtures | Pass; this is not the real-content 20-question acceptance test |
| Local optional server without key | Empty/secret-like queries rejected with 400; ordinary uncached query returns 503; 31st valid request returns 429 |
| Expo dependency compatibility | npx expo install --check passes |
| Common credential-pattern scan | No matches in tracked text sources; no plain .env tracked; .env ignore gap filed as BUG-6 |
| Maaz lint | npx eslint app/guide.tsx src/guide src/forms passes without disabling any rule |
| Android JS/Hermes bundle export | npx expo export --platform android passes for the currently routed frontend; Guide is not registered yet |
| Public forms in desktop Edge | Selenium and httpbin maps/focus/check/off/reinjection pass; Selenium password safety passes |
| Full strict typecheck | PASS after latest content/audio pull and explicit WebView<object> fix |
| Full uncached lint | PASS: zero errors, two require-import warnings in matcher.ts |
| Actual content/Guide audio | Content checker passes; Urdu/English dictionaries, 31 glossary patterns and all 12 Guide audio IDs validate |
| Real KB acceptance | FAIL: 13/20 expected answers; target >=14, filed as BUG-9 |
| Emulator UI smoke | Android 17 / API 37, Expo Go reaches Consent and Home; frontend still uses fakes |
| Native device/public WebView/build/release | Not run; integration gates remain open |

Commands: node src/guide/test/run.cjs; node src/guide/test/forms.test.cjs; node src/guide/test/bridge.test.cjs; node src/helper/__tests__/matcher.test.cjs; npx tsc --noEmit; npm run lint. Engine TS fixtures were executed with an in-memory TypeScript transpilation hook, without modifying their source or adding packages. Guide browser runners use temporary Edge profiles; set MASHQ_TEST_BROWSER to override the executable path. Generated lens.js is refreshed by run.cjs. These results are desktop/fixture evidence, not Android evidence.

Maaz-only ESLint passes with every configured rule enabled. Full uncached Expo lint also passes after the latest backend fixes. The WebView JSX error was fixed by explicitly supplying its extra-props generic as object; no dependency or shared configuration was changed. Strict isolated typecheck of the dictionary, injected script and bundled form modules also passes.

## Desktop test

Open src/guide/test/page.html in Chrome, open Developer Tools Console, and paste the entire src/guide/test/lens.js file. This generated file is buildLens('en') output, not an independent implementation; regenerate after lens.ts or dictionary.ts changes. The fixture logs protocol messages. Focus each field; check the map and empty-required summary, then password/code safety and the Domicile link. Choose Hide; focus again and confirm no new messages. Inject again and confirm one bar only.

## Safety review

The only injected-script .value access is `el.value.length === 0` in lens.ts:105 checkFields, after sensitive reclassification and visibility/required checks at line 100. It produces a boolean only. Password/PIN/code/card detection precedes other field kinds at line 57. No input innerText reads, autofill or field writes occur in the injected script. Label/legend text is read locally for classification and jargon matching; it is never posted. Local missing-field labels are shown only inside the page. Protocol sends are at lines 36, 39, 83, 92, 94, 109 and 135.

Outgoing messages contain fixed types and kinds, dictionary identifiers, counts, or the page origin/path. Query strings and fragments are excluded from GUIDE_READY URLs. The native bridge ignores READY, CHECK_RESULT and SENSITIVE_FOCUS and validates the accepted identifier/kind payloads. It never stores messages. Bundled mock forms separately read their own phone input to simulate validation; this is not Guide inspection and no network submission occurs.

Consent copy (five lines):

The Guide looks at box labels to explain what a form asks for.
It can check whether an ordinary required box is empty.
It does not read passwords, PINs, card details or verification codes.
It does not send what you type to the app.
The website itself can still receive information you enter or submit.

## Public form tests — pending Android integration

| URL | Bar on focus | Form map | Safety card | Check button | Jargon underline | Notes |
|---|---|---|---|---|---|---|
| Bundled services form | Pending phone | Pending phone | Pending phone | Pending phone | Pending phone | Desktop fixture and actual bundled form pass |
| Bundled wallet form | Pending phone | Pending phone | Pending phone | Pending phone | Pending phone | Actual bundled form passes desktop smoke checks |
| https://www.selenium.dev/selenium/web/web-form.html | Yes, desktop | Yes, 14 fields | Yes, password | Yes, desktop | Yes with real glossary | Cleanup and double reinjection pass; no typing/submission; Android pending |
| https://httpbin.org/forms/post | Yes, desktop | Yes, 12 fields | N/A: no sensitive field | Yes, desktop | N/A: no matching term | Cleanup and double reinjection pass; no typing/submission; Android pending |

Public test command: node src/guide/test/public-forms.test.cjs. It navigates real public demo pages using Edge DevTools, injects the actual Guide script, focuses boxes and checks emptiness. It never types, uploads or submits. Both URLs are now PUBLIC_FORMS shortcuts, with native acceptance explicitly pending. Jargon behavior passes on the bundled Domicile fixture and Selenium form with the actual glossary.

Limitations: standard fields only; custom widgets, iframe forms, some single-page sites and restrictive page security rules may fail. Some sites block sign-in inside embedded browsers. Cross-origin iframe contents are not inspected.

## Real-phone matrix — all pending

Run twice: afternoon build and final APK. Record phone model, Android version, build ID and actual results for each run.

| Area | Required observation | Result |
|---|---|---|
| Install | Fresh install, consent once | Not run |
| Lesson 1 | Receipt/result reached unaided | Not run |
| Hiccups | All 8 once, recovery works | Not run |
| Oops | Warm card, fix, undo | Not run |
| Audio | Listen works; missing clips safe | Not run |
| Text size | Largest size, no clipping | Not run |
| RTL | Urdu aligned, digits/IDs readable | Not run |
| Offline | Lessons, glossary, helper, audio | Not run |
| Estimate | Clean/messy lessons produce correct rung | Not run |
| Guide on | Both bundled and two public forms | Not run |
| Guide off | No bar, listeners or jargon marks | Not run |
| Safety | Password/code/card/PIN: safety only | Not run |
| Helper | 20 questions, at least 14 matches | Not run |
| Secret warning | Card entry warning, no sending | Not run |
| Video | Server off, curated/cache fallback | Not run |
| Reset | Returns to first run | Not run |
| Back | Predictable navigation, lesson back_fear | Not run |

## Release checklist — not completed

Resolve docs/bugs.md, install declared dependencies, run strict typecheck and lint; build preview APK; install on a real phone; complete matrix twice including a clean second phone; record final commit/time; prepare release tag v1.0-submission and attach APK; verify public repo/history and secret exclusions; verify <2 minute video in private window; add release QR; submit registered team on Hackathon Hub with screenshots and timestamped confirmation. Ahmer's server is now present and its no-key local smoke tests pass. Deployment still needs a hosting account and, for live search, a YouTube API key. Neither was supplied; no server was deployed and no external release/submission was published.

## First EAS preview build

Build a4e0e235-2805-49da-bcea-059fd6a1a0c1 was submitted to EAS on 2026-10-31 at 09:25 UTC (14:25 PKT), with preview/internal APK profile. EAS created the remote signing keystore successfully. Build dashboard: https://expo.dev/accounts/maazaypys-team/projects/build4bettergang/builds/a4e0e235-2805-49da-bcea-059fd6a1a0c1. This is an early frontend preview using fake wiring, not the final submission. EAS records base commit 5cb3d49; its uploaded working-tree snapshot also includes Maaz's WebView fix and public-form shortcuts. Final submission commit must be recorded on a clean, fully integrated build.

## Latest integration evidence

The latest team pull supplies real GUIDE_TEXT/GLOSSARY and AUDIO; dictionary.ts no longer has English placeholders. Desktop loaders now transpile the real content dependencies without importing native modules. Run node src/guide/test/acceptance.test.cjs to reproduce the helper acceptance failure and dictionary/audio checks. This test intentionally fails below 14/20; its questions must not be weakened to hide missing matches.

No physical phone is attached. A read-only, headless Medium_Phone_API_37.0 emulator boots with WHPX and reaches Consent/Home through existing Expo Go and local Metro. This does not pass the fresh-APK, offline, Guide route, real-runner, reviewed Urdu or second-phone gates. The current frontend still exports fakes from src/theme/wire/index.ts.
