import { Pressable, StyleSheet } from 'react-native';
import { colors, sizes } from '../theme/tokens';
import { useT } from '../theme/wire';
import { AppText } from './AppText';

export function StuckButton({ onPress }: { onPress: () => void }) {
  const label = useT()('stuck');
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}>
      <AppText bold color={colors.calmInk} style={styles.label}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: sizes.tap, borderRadius: 14, backgroundColor: colors.calm, borderWidth: 2, borderColor: colors.calmInk, paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'center' },
  label: { textAlign: 'center' },
  pressed: { opacity: 0.8, borderWidth: 4 },
});
