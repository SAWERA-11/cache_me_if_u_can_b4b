export type AdaptationInput = {
  last2: number[];
  failedRecoveries: Record<string, number>;
  struggles: Record<string, number>;
};

export type AdaptationPlan = {
  extraHintCards: boolean;
  workedExampleFirst: boolean;
  fadeHints: boolean;
  refresherKinds: string[];
  hiccupMix: 'usual' | 'harder';
};

export function planNext(input: AdaptationInput): AdaptationPlan {
  const failed = Object.values(input.failedRecoveries).some((count) => count >= 2);
  const strong = input.last2.length >= 2 && input.last2.slice(-2).every((score) => score >= 0.8);
  return {
    extraHintCards: failed,
    workedExampleFirst: failed,
    fadeHints: strong,
    refresherKinds: Object.entries(input.struggles)
      .filter(([, count]) => count >= 3)
      .map(([kind]) => kind),
    hiccupMix: strong ? 'harder' : 'usual',
  };
}
