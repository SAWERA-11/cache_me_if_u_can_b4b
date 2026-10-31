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
- `findLesson` looks up Savera's keyed `Record<string, Lesson>` catalog.
- `resumableLessonId` selects the most recently exited lesson whose latest event is still an exit.
- `restoredState` validates persisted preferences/progress and removes unexpected fields without replacing store actions.
- `src/lib/backend.ts` re-exports the real backend and content contracts for the frontend integration seam.

## Team integration

Savera's S0/S2 define `LESSONS` as `Record<string, Lesson>`, not an array. The runner now uses keyed lookup. Hiccup IDs appear once per run, including step revisits; the 13-step fixture exercises all eight placements from S2/M6. Audio layer IDs and message payloads retain the agreed contracts. Baseline timing uses the median of retained event timings and never lowers a score.

Anas's pulled frontend currently imports temporary fakes from `src/theme/wire/index.ts`. After Savera supplies the real `src/content` exports and `src/audio/audioMap.ts`, Anas can replace that file's fake exports with `export * from '../../lib/backend';`. This also provides the `Runner`/`LayerName` type aliases used by the frontend. Home can derive its Continue target with `useApp(s => resumableLessonId(s.events))`; the step pointer uses event IDs and contains no typed input.

F5's answer review/jump API is not in the agreed runner contract. The pulled UI temporarily captures answers in screen state; this backend does not add unagreed fields/actions or persist typed answers. Review navigation requires agreement with Anas/Savera. Maaz still owns deployment, Android validation, and Guide route integration.

## Verification

Run `node src/lib/__tests__/run.cjs` for backend fixture tests and `node server/index.test.js` for offline server HTTP tests. No API key is required. Fixtures verify contracts independently of Savera's pending content/audio modules; they do not replace testing reviewed content or Android audio playback.

Run `node src/lib/__tests__/typecheck.cjs` for a strict backend check against compiler-only content/audio contracts. It does not supply runtime content or replace the full-project typecheck.

Full-project validation: `npx.cmd tsc --noEmit` and `npx.cmd expo lint` on Windows. Missing content/audio modules and Guide/WebView integration currently block typecheck; frontend/Guide lint findings remain outside Ahmer's implementation paths.
