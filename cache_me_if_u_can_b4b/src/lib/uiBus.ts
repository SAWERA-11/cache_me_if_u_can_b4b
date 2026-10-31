type Event = 'jargon' | 'helper';
type Listener = (payload: unknown) => void;
const listeners: Record<Event, Set<Listener>> = { jargon: new Set(), helper: new Set() };

export const uiBus = {
  emit(event: Event, payload: unknown): void {
    listeners[event].forEach((listener) => listener(payload));
  },
  on(event: Event, listener: Listener): () => void {
    listeners[event].add(listener);
    return () => listeners[event].delete(listener);
  },
};
