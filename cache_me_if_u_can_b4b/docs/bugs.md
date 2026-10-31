# Integration and bug log

| ID | Owner | Severity | Status |
|---|---|---|---|
| BUG-1 | Anas | blocker | Open: WebView dependency absent |
| BUG-2 | Ahmer | blocker | Resolved in 15da65c: shared modules supplied; audio content dependency tracked in BUG-4 |
| BUG-3 | Anas | blocker | Open: Guide route integration |
| BUG-4 | Savera | blocker | Open: content index and audioMap absent; blocks compiler and app imports |
| BUG-5 | Ahmer | major | Open: useRunner render-purity lint error |
| BUG-6 | Anas | major | Open: plain .env files are not ignored |
| BUG-7 | Ahmer | minor | Open: server README .env setup is not loaded by npm start |

## BUG-1 | owner: Anas | severity: blocker
Where: package.json / Guide screen.
Steps: 1) Install declared packages. 2) Typecheck/import app/guide.tsx.
Expected: react-native-webview resolves.
Actual: Package is not declared. Please add SDK-compatible react-native-webview using Expo's installer.
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
