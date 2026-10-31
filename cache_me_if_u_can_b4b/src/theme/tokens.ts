export const colors = {
  ink: '#10233F',
  body: '#1F2D44',
  muted: '#4A5A73',
  bg: '#F6F3EA',
  card: '#FFFFFF',
  line: '#D5DBE6',
  primary: '#1E4FD8',
  primaryDark: '#16399C',
  primaryInk: '#FFFFFF',
  primarySoft: '#E2EAFF',
  calm: '#D3EEDD',
  calmInk: '#14532D',
  warm: '#FDEBC8',
  warmInk: '#5B3A00',
  brand: '#0F5C55',
} as const;

export const sizes = {
  body: 20,
  bodyL: 24,
  bodyXL: 28,
  h1: 30,
  h2: 26,
  tap: 56,
  gap: 12,
} as const;

export const radius = { card: 22, button: 18, chip: 16 } as const;

// Soft depth for cards and buttons (no heavy fills, works on Android via elevation).
export const lift = {
  shadowColor: '#10233F',
  shadowOpacity: 0.12,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
} as const;
