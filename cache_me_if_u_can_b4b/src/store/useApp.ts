import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Lang, StepEvent } from '../engine/types';
import { persistedState, privateEvent, restoredState } from './persistence';
import { median } from '../engine/estimate';

export type AppResult = { lessonId: string; ts: number; score: number; rung: 0 | 1 | 2; strength: string };
export type Comfort = { lessonId: string; before?: number; after?: number };
export type AppState = {
  language: Lang;
  textLevel: 0 | 1 | 2;
  audioSpeed: 0.8 | 1;
  consented: boolean;
  guideOn: boolean;
  shareProgress: boolean;
  results: AppResult[];
  events: StepEvent[];
  struggles: Record<string, number>;
  baselineMs: number | null;
  comfort: Comfort[];
  set: (partial: Partial<AppState>) => void;
  addEvent: (event: StepEvent) => void;
  addResult: (result: AppResult) => void;
  addStruggle: (kind: string) => void;
  reset: () => void;
};

const initialState = {
  language: 'ur' as Lang, textLevel: 0 as const, audioSpeed: 1 as const, consented: false,
  guideOn: false, shareProgress: false, results: [], events: [], struggles: {},
  baselineMs: null, comfort: [],
};

export const useApp = create<AppState>()(persist((set) => ({
  ...initialState,
  set: (partial) => set((state) => ({ ...restoredState({ ...state, ...partial }, state),
    guideOn: typeof partial.guideOn === 'boolean' ? partial.guideOn : state.guideOn })),
  addEvent: (event) => set((state) => {
    const events = [...state.events, privateEvent(event)].slice(-300);
    return { events, baselineMs: median(events.map((item) => item.firstActionMs)) };
  }),
  addResult: (result) => set((state) => ({ results: [...state.results, result].slice(-10) })),
  addStruggle: (kind) => set((state) => ({ struggles: { ...state.struggles, [kind]: (state.struggles[kind] ?? 0) + 1 } })),
  reset: () => set(initialState),
}), {
  name: 'mashq-state',
  storage: createJSONStorage(() => AsyncStorage),
  partialize: persistedState,
  merge: (persisted, current) => {
    return { ...current, ...restoredState(persisted, current) };
  },
  onRehydrateStorage: () => (state) => {
    if (state) state.guideOn = false;
  },
}));
