import { useApp } from './wire';

const BODY = [20, 24, 28] as const;

export function useTextSize() {
  const level = useApp((s) => s.textLevel);
  const body = BODY[level];
  return { body, heading: body + 6, big: body + 12 };
}
