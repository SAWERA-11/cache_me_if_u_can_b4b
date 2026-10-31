import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import { AppText } from './AppText';

// App mark: Urdu word for "practice" on a green seal. No real logo or organisation.
export function Brand({ big }: { big?: boolean }) {
  const d = big ? 96 : 64;
  return (
    <View accessible accessibilityLabel="Mashq" style={styles.wrap}>
      <View style={[styles.seal, { width: d, height: d, borderRadius: d / 2 }]}>
        <AppText bold color="#FFFFFF" style={{ fontFamily: 'NotoNaskhArabic_700Bold', fontSize: big ? 38 : 26, lineHeight: big ? 64 : 44, textAlign: 'center', includeFontPadding: false }}>
          {'مشق'}
        </AppText>
      </View>
      <AppText bold color={colors.brand} style={styles.word}>Mashq</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 6 },
  seal: { backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: colors.calm },
  word: { textAlign: 'center', letterSpacing: 1 },
});
