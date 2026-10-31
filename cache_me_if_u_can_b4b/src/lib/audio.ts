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
    const created = createAudioPlayer(AUDIO[id]);
    player = created;
    created.play();
    // The docs only guarantee playback once the source has loaded, so start again at the
    // moment it reports loaded (once), unless the clip was replaced or stopped meanwhile.
    if (created.isLoaded === false && typeof created.addListener === 'function') {
      const subscription = created.addListener('playbackStatusUpdate', (status) => {
        if (!status.isLoaded) return;
        subscription.remove();
        if (player === created && !status.playing && !status.didJustFinish) created.play();
      });
    }
  } catch (error) {
    console.warn('[audio] could not play', id, error);
    stopClip();
    return false;
  }
  // The rate is set on its own: a failure here must not silence the clip.
  try {
    if (rate !== 1 && player) player.playbackRate = rate;
  } catch (error) {
    console.warn('[audio] could not set rate', rate, error);
  }
  return true;
}
