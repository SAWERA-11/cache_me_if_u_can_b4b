import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Lang, StepEvent } from '../engine/types';
import { persistedState, privateEvent } from './persistence';

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
  set: (partial) => set(partial),
  addEvent: (event) => set((state) => ({ events: [...state.events, privateEvent(event)].slice(-300) })),
  addResult: (result) => set((state) => ({ results: [...state.results, result].slice(-10) })),
  addStruggle: (kind) => set((state) => ({ struggles: { ...state.struggles, [kind]: (state.struggles[kind] ?? 0) + 1 } })),
  reset: () => set(initialState),
}), {
  name: 'mashq-state',
  storage: createJSONStorage(() => AsyncStorage),
  partialize: persistedState,
  merge: (persisted, current) => {
    if (!persisted || typeof persisted !== 'object') return current;
    const candidate = { ...current, ...persisted } as AppState;
    if (!Array.isArray(candidate.events) || !Array.isArray(candidate.results) || !Array.isArray(candidate.comfort)) return current;
    return { ...current, ...persistedState(candidate) };
  },
  onRehydrateStorage: () => (state) => {
    if (state) state.guideOn = false;
  },
}));
