// Single seam between my UI and the modules owned by Ahmer/Savera. Everything in app/ and
// src/components imports shared hooks and content from here. When the real modules land,
// change only this file (see the TODO below) and delete fakes.ts.
// Wired to Ahmer's real modules: useApp, uiBus, ltr, engine types.
// Still fake (blocked on Savera's src/content and src/audio/audioMap, which they import):
//   useT -> '../../lib/t';  playClip, stopClip, hasClip -> '../../lib/audio'
//   useRunner   -> '../../engine/useRunner'
//   matchQuestion, looksLikeSecret -> '../../helper/matcher';  fetchVideos -> '../../video/api'
//   HICCUPS, GLOSSARY, LESSON1, STRINGS, KB -> '../../content'
export * from './types';
export { useApp } from '../../store/useApp';
export { uiBus } from '../../lib/uiBus';
export { ltr } from '../../lib/ltr';
export {
  useT, playClip, stopClip, hasClip, useRunner,
  HICCUPS, GLOSSARY, LESSON1, STRINGS, KB, matchQuestion, looksLikeSecret, fetchVideos,
} from './fakes';
