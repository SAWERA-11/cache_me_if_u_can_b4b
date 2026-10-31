import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { AUDIO } from '../audio/audioMap';

let player: ReturnType<typeof createAudioPlayer> | null = null;

export async function initAudio(): Promise<void> {
  try {
    await setAudioModeAsync({ playsInSilentMode: true });
  } catch {
    // Audio is an enhancement; the lesson remains usable without it.
  }
}

export function hasClip(id?: string): boolean {
  return !!id && Object.prototype.hasOwnProperty.call(AUDIO, id);
}

export function stopClip(): void {
  const current = player;
  player = null;
  try {
    current?.pause();
  } catch {
    // Still release the native player when pausing fails.
  }
  try {
    current?.remove();
  } catch {
    // Repeated cleanup is safe for callers.
  }
}

export function playClip(id?: string, rate = 1): boolean {
  if (!id || !hasClip(id)) return false;
  try {
    stopClip();
    player = createAudioPlayer(AUDIO[id]);
    player.playbackRate = rate;
    player.play();
    return true;
  } catch {
    stopClip();
    return false;
  }
}
