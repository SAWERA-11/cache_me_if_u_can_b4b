import type { VideoItem } from '../engine/types';

// TODO(content): S9. Add 10 to 15 videos that Savera has watched fully.
// Criteria: Urdu or clear Hindi-Urdu, under 4 minutes, clear voice, nobody asks for a PIN or code.
// Format: { id: '<YouTube id>', title: '<title as on YouTube>', topic: ['login'|'otp'|'form'|'photo'|'scam', ...], minutes: <number> }
// Never invent ids or titles.
export const VIDEOS: VideoItem[] = [];
