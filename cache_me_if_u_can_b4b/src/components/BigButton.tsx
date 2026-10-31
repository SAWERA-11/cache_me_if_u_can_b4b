import { Pressable, StyleSheet } from 'react-native';
import { colors, lift, radius, sizes } from '../theme/tokens';
import { AppText } from './AppText';

type Props = {
  label: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'calm'; disabled?: boolean;
};

const look = {
  primary: { bg: colors.primary, ink: colors.primaryInk, border: colors.primaryDark },
  secondary: { bg: colors.card, ink: colors.ink, border: colors.ink },
  calm: { bg: colors.calm, ink: colors.calmInk, border: colors.calmInk },
} as const;

export function BigButton({ label, onPress, variant = 'primary', disabled }: Props) {
  const v = look[variant];
  return (
    <Pressable
      accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled: !!disabled }}
      disabled={disabled} onPress={onPress}
      style={({ pressed }) => [
        styles.base, variant !== 'secondary' && lift,
        { backgroundColor: v.bg, borderColor: v.border },
        pressed && styles.pressed, disabled && styles.disabled,
      ]}
    >
      <AppText size="heading" bold color={v.ink} style={styles.label}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: sizes.tap, borderRadius: radius.button, borderWidth: 2, paddingVertical: 12, paddingHorizontal: 20, justifyContent: 'center' },
  label: { textAlign: 'center' },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }], borderWidth: 4 },
  disabled: { opacity: 0.5 },
});
