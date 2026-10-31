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
- `restoreRun` resumes an exited lesson with earlier event evidence, without restoring or persisting typed answers; completed runs start fresh.
- `src/lib/backend.ts` re-exports the real backend and content contracts for the frontend integration seam.

## Team integration

Savera's S0/S2 define `LESSONS` as `Record<string, Lesson>`, not an array. The runner now uses keyed lookup. Hiccup IDs appear once per run, including step revisits; the 13-step fixture exercises all eight placements from S2/M6. Audio layer IDs and message payloads retain the agreed contracts. Baseline timing uses the median of retained event timings and never lowers a score.

Anas's ca55cbf now connects the frontend seam to the real backend and content modules. `src/lib/backend.ts` also supplies a consolidated export surface. Home can derive its Continue target with `useApp(s => resumableLessonId(s.events))`; the step pointer uses event IDs and contains no typed input.

With authorization to complete all members' integration work, the runner now exposes in-memory `answers` and actions `goTo(index)` and `restart()`. Review edits return to the originating review/submit step. Restart clears transient answers and resets event/result saving for a new run. Exit saves pending events synchronously before navigation can unmount the screen. None of these APIs persist typed answers. The Guide route is registered; deployment and Android acceptance testing remain pending.

After merging Maaz's latest Guide branch, BUG-5's render-purity issue and BUG-7's setup instructions are already addressed by the backend commits. `server/.gitignore` now protects plain local `.env` files (and variants) while retaining `.env.example`; Anas still owns repository-wide ignore policy. Both secret guards also reject full-width and punctuation-separated numbers before cache/network access. Resumed history is retained for scoring and is not written to storage twice. Hiccup counters remain session-local; old `StepEvent` records cannot reconstruct prior recovery counts.

## Verification

Run `node src/lib/__tests__/run.cjs` for backend fixture tests and `node server/index.test.js` for offline server HTTP tests. No API key is required. Fixtures verify contracts independently of Savera's pending content/audio modules; they do not replace testing reviewed content or Android audio playback.

The backend suite now also runs against the real content: 19/20 representative KB questions matched with no incorrect answers, bilingual top-level chips and every follow-up ID resolve, Lesson 1 reaches rungs 2/1/0 for clean/supported/revealed runs, and the supported run exercises all eight hiccups. Real-video tests check offline results, topic relevance and a three-item limit. Audio tests check generated bindings and nonempty files, not pronunciation or native playback. Video watch-through approval remains pending in Savera's catalog comments.

Run `node src/lib/__tests__/typecheck.cjs` for a strict backend check against compiler-only content/audio contracts. It does not supply runtime content or replace the full-project typecheck.

Full-project validation: `npx.cmd tsc --noEmit` and `npx.cmd expo lint --no-cache` on Windows now pass. The WebView generic uses `object` to avoid its declaration's default `undefined` intersection becoming `never`; no dependency patch or `any` cast is used. Guide dictionary/audio now use the actual bilingual content. See README for remaining human review, native-device and release gates.
