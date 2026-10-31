// Real implementation exports for Anas's src/theme/wire integration seam.
export type * from '../engine/types';
export { useApp } from '../store/useApp';
export { useT } from './t';
export { playClip, stopClip, hasClip, initAudio } from './audio';
export { uiBus } from './uiBus';
export { ltr } from './ltr';
export { useRunner } from '../engine/useRunner';
export { resumableLessonId } from '../engine/catalog';
export { matchQuestion, matchChip, looksLikeSecret } from '../helper/matcher';
export { fetchVideos } from '../video/api';
export { HICCUPS, GLOSSARY, LESSON1, STRINGS, KB } from '../content';

export type Runner = ReturnType<typeof import('../engine/useRunner').useRunner>;
export type LayerName = keyof Runner['openLayers'];
