// Single seam between my UI and the modules owned by Ahmer/Savera. Everything in app/ and
// src/components imports shared hooks and content from here. When the real modules land,
// change only this file (see the TODO below) and delete fakes.ts.
// TODO: wire to real hook:
//   useApp      -> '../../store/useApp'
//   useT, playClip, stopClip, hasClip, uiBus, ltr -> '../../lib/*'
//   useRunner   -> '../../engine/useRunner'
//   matchQuestion, looksLikeSecret -> '../../helper/matcher';  fetchVideos -> '../../video/api'
//   HICCUPS, GLOSSARY, LESSON1, STRINGS, KB -> '../../content'
export * from './types';
export {
  useApp, useT, playClip, stopClip, hasClip, uiBus, ltr, useRunner,
  HICCUPS, GLOSSARY, LESSON1, STRINGS, KB, matchQuestion, looksLikeSecret, fetchVideos,
} from './fakes';
