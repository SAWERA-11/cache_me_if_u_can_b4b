# Integration and bug log

| ID | Owner | Severity | Status |
|---|---|---|---|
| BUG-1 | Anas | blocker | Open: WebView dependency absent |
| BUG-2 | Ahmer | blocker | Open: shared modules absent |
| BUG-3 | Anas | blocker | Open: Guide route integration |
| BUG-4 | Savera | major | Open: reviewed dictionary and audio absent |

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
Actual: All three modules are absent. Please provide useApp (including set/getState/addStruggle), playClip and uiBus without changing the agreed contracts.
Phone/build: Windows source review; no phone build.
Screenshot: Not applicable; missing source modules.

## BUG-3 | owner: Anas | severity: blocker
Where: Expo Router root.
Steps: 1) Inspect src/app/_layout.tsx. 2) Locate Maaz's allowed app/guide.tsx.
Expected: A /guide route is reachable from the app.
Actual: Existing routes use src/app; Maaz's allowed root app/guide.tsx is not registered there. Please expose/re-export the Guide from src/app/guide.tsx and add navigation as appropriate.
Phone/build: Windows source review.
Screenshot: Not applicable.

## BUG-4 | owner: Savera | severity: major
Where: src/guide/dictionary.ts.
Steps: 1) Select Urdu. 2) Inspect dictionary output.
Expected: Reviewed GUIDE_TEXT and GLOSSARY, matching audio clips.
Actual: Content modules are absent; explicitly marked English placeholders are used for both languages. Please supply GUIDE_TEXT and GLOSSARY using section 3's contract.
Phone/build: Windows source review.
Screenshot: Not applicable.
