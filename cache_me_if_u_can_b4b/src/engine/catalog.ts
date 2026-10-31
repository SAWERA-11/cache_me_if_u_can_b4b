import type { Lesson, StepEvent } from './types';

export function findLesson(lessons: Record<string, Lesson>, id: string): Lesson | undefined {
  // Keep older array fixtures usable while matching Savera's keyed LESSONS export.
  if (Array.isArray(lessons)) return (lessons as Lesson[]).find((lesson) => lesson.id === id);
  return Object.prototype.hasOwnProperty.call(lessons, id) ? lessons[id] : undefined;
}

export function resumableLessonId(events: StepEvent[]): string | null {
  const seen = new Set<string>();
  for (let index = events.length - 1; index >= 0; index--) {
    const event = events[index];
    if (seen.has(event.lessonId)) continue;
    seen.add(event.lessonId);
    if (event.exited) return event.lessonId;
  }
  return null;
}
