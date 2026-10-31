import type { Lesson } from '../../engine/types';
import { LESSON_DELIVERY } from './delivery';
import { LESSON1 } from './lesson1';

export const LESSONS: Record<string, Lesson> = { [LESSON1.id]: LESSON1, [LESSON_DELIVERY.id]: LESSON_DELIVERY };
