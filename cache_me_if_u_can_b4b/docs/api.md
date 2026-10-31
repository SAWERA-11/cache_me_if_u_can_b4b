# Backend API

- `isName`, `isDob`, `isId`, `isPhone` validate practice form values.
- `createInitialState`, `reduce`, and `newEvent` run lesson state transitions.
- `defaultOops` supplies calm fallback recovery text.
- `stepScore`, `lessonScore`, `rungFor`, `median`, and `isHesitant` calculate lesson estimates.
- `pickStrength` and `buildResult` create the result summary.
- `planNext` creates the next lesson adaptation plan.
- `kv.get`, `kv.set`, and `kv.clear` provide resilient key-value storage.
- `playClip`, `stopClip`, `hasClip`, and `initAudio` control optional audio.
- `uiBus.emit` and `uiBus.on` connect non-screen UI events.
- `ltr` keeps identifiers readable inside right-to-left text.
- `normalizeUrdu` canonicalizes Urdu and Roman text for matching.
- `useT` and `tr` translate shared string keys.
- `useApp` stores local consent, preferences, events, results, and struggles.
- `useRunner` exposes the lesson runner to React screens.
- `matchQuestion`, `looksLikeSecret`, and `matchChip` provide safe helper matching.
- `fetchVideos` returns curated, cached, optional live, or empty video results.
- `scoredEvents` filters lesson events using actual step kinds before scoring.
- `resumeIndex` locates the latest exited step without storing typed input.
- `fallbackStrength` supplies an English strength sentence when translations are missing.
- `privateEvent` strips extra properties from a step event before storage.
- `persistedState` selects the allowed preferences and progress fields and resets Guide state.
- `createVideoApp` creates the optional video server with injectable dependencies for offline tests.
- `isSecret` applies the server-side secret guard before cache or network access.

## Verification

Run `node src/lib/__tests__/run.cjs` for backend fixture tests and `node server/index.test.js` for offline server HTTP tests. No API key is required. Fixtures verify contracts independently of Savera's pending content/audio modules; they do not replace testing reviewed content or Android audio playback.

Run `node src/lib/__tests__/typecheck.cjs` for a strict backend check against compiler-only content/audio contracts. It does not supply runtime content or replace the full-project typecheck.

Full-project validation: `npx.cmd tsc --noEmit` and `npx.cmd expo lint` on Windows. Missing content/audio modules and WebView currently block typecheck; Guide lint findings also remain outside Ahmer's implementation paths.
