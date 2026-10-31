import { useFonts, NotoNaskhArabic_400Regular, NotoNaskhArabic_700Bold } from '@expo-google-fonts/noto-naskh-arabic';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalSheets } from '../components/GlobalSheets';

export default function RootLayout() {
  // Render even if the font fails: system font is the fallback.
  useFonts({ NotoNaskhArabic_400Regular, NotoNaskhArabic_700Bold });
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      <GlobalSheets />
    </SafeAreaProvider>
  );
}
