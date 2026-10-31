# Guide validation and release gates

## Setup

Work directory: nested cache_me_if_u_can_b4b app directory containing package.json.
Windows: Node v24.11.0, npm 11.20.0, Java 21 and EAS CLI 24.14.0 are installed. EAS authentication and team access were confirmed earlier. The EAS project is already linked in app.json. adb is not on PATH. GitHub has no published releases/tags as of this check. Latest main commit 15da65c was fast-forwarded into Maaz's branch without conflicts. App npm ci installed 804 packages; server npm ci installed 70 packages. Dependency declarations/lockfiles were not edited.

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
| Full strict typecheck | Blocked by missing WebView, content index and audio map |
| Full lint | Blocked by those imports plus Ahmer's useRunner render-purity error; Maaz's other lint findings corrected |
| Native device/public WebView/build/release | Not run; integration gates remain open |

Commands: node src/guide/test/run.cjs; node src/guide/test/forms.test.cjs; node src/guide/test/bridge.test.cjs; node src/helper/__tests__/matcher.test.cjs; npx tsc --noEmit; npm run lint. Engine TS fixtures were executed with an in-memory TypeScript transpilation hook, without modifying their source or adding packages. Guide browser runners use temporary Edge profiles; set MASHQ_TEST_BROWSER to override the executable path. Generated lens.js is refreshed by run.cjs. These results are desktop/fixture evidence, not Android evidence.

Maaz-only ESLint check passes with import/no-unresolved temporarily disabled on the command line to separate the known missing WebView dependency from code lint issues; no lint rules/configuration were changed. Strict isolated typecheck of the dictionary, injected script and bundled form modules also passes.

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
| <public URL 1> | Not run | Not run | Not run | Not run | Not run | Populate PUBLIC_FORMS after tests |
| <public URL 2> | Not run | Not run | Not run | Not run | Not run | Do not submit personal information |

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
