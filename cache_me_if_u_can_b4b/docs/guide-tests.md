# Guide validation and release gates

## Setup

Work directory: nested cache_me_if_u_can_b4b app directory containing package.json.
Windows: Node v24.11.0, npm 11.20.0, Java 21, EAS CLI 24.14.0 are installed. EAS authentication and access to the configured team were confirmed. app.json already contains an EAS project link; no init or relink is needed. Android adb is not on PATH. npm install --package-lock=false completed successfully, installing 574 declared/transitive packages. npm reported 14 audit findings; no automatic dependency upgrades were applied.

Validation on 2026-10-31: generated JavaScript syntax passed. `node src/guide/test/run.cjs` passed all 10 automated desktop checks in installed Microsoft Edge: map count, password safety, code safety, name classification, required check, no typed sentinel in messages, jargon wrapping, jargon message, dynamically added card protection, disabled cleanup. Sensitive field value getters deliberately throw if accessed. The runner regenerates lens.js and uses temporary browser profiles, without adding packages. Set MASHQ_TEST_BROWSER to override the Edge executable path. These are desktop tests, not Android WebView evidence.

Strict isolated typecheck passed for lens.ts, dictionary.ts and both bundled form modules. Full `tsc --noEmit` remains blocked by the missing modules/dependency listed in bugs.md and consequent inferred callback types. `expo lint` was attempted; Expo tried to bootstrap absent ESLint dependencies automatically. It was stopped and its package.json additions reverted. Lint remains unverified until Anas supplies ESLint configuration and packages. No package declarations were intentionally changed.

## Desktop test

Open src/guide/test/page.html in Chrome, open Developer Tools Console, and paste the entire src/guide/test/lens.js file. This generated file is buildLens('en') output, not an independent implementation; regenerate after lens.ts or dictionary.ts changes. The fixture logs protocol messages. Focus each field; check the map and empty-required summary, then password/code safety and the Domicile link. Choose Hide; focus again and confirm no new messages. Inject again and confirm one bar only.

## Safety review

The only injected-script .value access is `el.value.length === 0` in lens.ts:101 checkFields, after sensitive reclassification and visibility/required checks at line 95. It produces a boolean only. Password/PIN/code/card detection precedes other field kinds at line 55. No input innerText reads, autofill or field writes occur in the injected script. Label/legend text is read locally for classification and jargon matching; it is never posted. Local missing-field labels are shown only inside the page. Protocol sends are at lines 34, 37, 81, 88, 90, 105 and 131.

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
| Bundled services form | Pending phone | Pending phone | Pending phone | Pending phone | Pending phone | Desktop fixture available |
| Bundled wallet form | Pending | Pending | Pending | Pending | Pending | No external requests |
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

Resolve docs/bugs.md, install declared dependencies, run strict typecheck and lint; build preview APK; install on a real phone; complete matrix twice including a clean second phone; record final commit/time; prepare release tag v1.0-submission and attach APK; verify public repo/history and secret exclusions; verify <2 minute video in private window; add release QR; submit registered team on Hackathon Hub with screenshots and timestamped confirmation. Server deployment requires Ahmer's server and a hosting account/key, neither supplied here.
