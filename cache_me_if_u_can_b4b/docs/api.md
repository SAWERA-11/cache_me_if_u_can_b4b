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
