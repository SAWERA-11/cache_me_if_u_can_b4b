import assert from 'node:assert/strict';
import { buildResult, lessonScore, median, rungFor, stepScore } from '../estimate';
import type { StepEvent } from '../types';
import { planNext } from '../adaptation';

const event = (overrides: Partial<StepEvent> = {}): StepEvent => ({
  lessonId: 'test', stepId: 'name', ts: 1, firstActionMs: 1, hintTaps: 0,
  stuckTaps: 0, wrongAttempts: 0, undoTaps: 0, audioReplays: 0,
  revealedAnswer: false, completed: true, exited: false, ...overrides,
});

assert.equal(stepScore(event()), 1);
assert.equal(stepScore(event({ wrongAttempts: 1 })), 0.75);
assert.equal(rungFor(lessonScore([event(), event({ stepId: 'phone' })])), 2);
assert.equal(rungFor(lessonScore([event({ hintTaps: 1 }), event({ stepId: 'phone', wrongAttempts: 2 })])), 1);
assert.equal(rungFor(lessonScore([event({ revealedAnswer: true })])), 0);
assert.equal(lessonScore([event({ stepId: 'session' })]), 0);
assert.equal(median([3, 1, 2]), 2);
assert.equal(planNext({ last2: [0.8, 0.9], failedRecoveries: {}, struggles: {} }).fadeHints, true);
assert.equal(planNext({ last2: [], failedRecoveries: { wrong_format: 2 }, struggles: {} }).workedExampleFirst, true);
assert.deepEqual(planNext({ last2: [], failedRecoveries: {}, struggles: { phone: 3 } }).refresherKinds, ['phone']);
assert.equal(buildResult([event()]).rung, 2);
console.log('estimate.test.ts passed');
