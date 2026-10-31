import { useFonts, NotoNaskhArabic_400Regular, NotoNaskhArabic_700Bold } from '@expo-google-fonts/noto-naskh-arabic';
import { Stack } from 'expo-router';
import { useEffect, useSyncExternalStore } from 'react';
import { useApp } from '../store/useApp';
import { initAudio, stopClip } from '../lib/audio';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalSheets } from '../components/GlobalSheets';
const subscribeToHydration = (listener: () => void) => useApp.persist.onFinishHydration(listener);

export default function RootLayout() {
  // Render even if the font fails: system font is the fallback.
  useFonts({ NotoNaskhArabic_400Regular, NotoNaskhArabic_700Bold });
  const ready = useSyncExternalStore(subscribeToHydration, useApp.persist.hasHydrated, () => false);
  useEffect(() => {
    void initAudio();
    return () => stopClip();
  }, []);
  if (!ready) return null;
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      <GlobalSheets />
    </SafeAreaProvider>
  );
}
