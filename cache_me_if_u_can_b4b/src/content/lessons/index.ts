import type { Lesson } from '../../engine/types';
import { LESSON_DELIVERY } from './delivery';
import { LESSON1 } from './lesson1';
import { LESSON_RIDE } from './ride';

export const LESSONS: Record<string, Lesson> = { [LESSON1.id]: LESSON1, [LESSON_DELIVERY.id]: LESSON_DELIVERY, [LESSON_RIDE.id]: LESSON_RIDE };
