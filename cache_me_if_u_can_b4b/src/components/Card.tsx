import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, lift, radius } from '../theme/tokens';
import { AppText } from './AppText';
import { Row } from './Row';

// Round colored tile holding a simple glyph; decorative only.
export function IconTile({ glyph, tint = colors.primarySoft, ink = colors.primary }: { glyph: string; tint?: string; ink?: string }) {
  return (
    <View accessibilityElementsHidden importantForAccessibility="no" style={[styles.tile, { backgroundColor: tint }]}>
      <AppText size="heading" bold color={ink} style={styles.glyph}>{glyph}</AppText>
    </View>
  );
}

// Plain white surface with soft depth.
export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

// Large tappable home-style card: icon tile, label, optional trailing node.
export function TapCard({ label, hint, glyph, tint, ink, onPress, trailing }: {
  label: string; hint?: string; glyph: string; tint?: string; ink?: string; onPress: () => void; trailing?: ReactNode;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}
      style={({ pressed }) => [styles.card, styles.tap, pressed && styles.pressed]}>
      <Row style={styles.row}>
        <IconTile glyph={glyph} tint={tint} ink={ink} />
        <View style={styles.flex}>
          <AppText size="heading" bold color={colors.ink}>{label}</AppText>
          {hint ? <AppText color={colors.muted}>{hint}</AppText> : null}
        </View>
        {trailing}
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.card, padding: 16, borderWidth: 1, borderColor: colors.line, ...lift },
  tap: { minHeight: 80, justifyContent: 'center' },
  pressed: { borderColor: colors.ink, borderWidth: 3 },
  row: { gap: 14 },
  flex: { flex: 1 },
  tile: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  glyph: { textAlign: 'center', includeFontPadding: false },
});
