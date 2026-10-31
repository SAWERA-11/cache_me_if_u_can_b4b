import { Pressable, StyleSheet } from 'react-native';
import { colors, sizes } from '../theme/tokens';
import { hasClip, playClip, useApp, useT } from '../theme/wire';
import { AppText } from './AppText';
import { Row } from './Row';

type Props = { clipId?: string; label?: string };

export function AudioButton({ clipId, label }: Props) {
  const t = useT();
  const speed = useApp((s) => s.audioSpeed);
  const text = label ?? t('listen');
  // The text is always the source of truth: without a clip the button is a quiet no-op.
  const onPress = () => { if (hasClip(clipId)) playClip(clipId, speed); };
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={text} onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}>
      <Row style={styles.row}>
        <AppText size="heading" color={colors.calmInk} style={styles.icon}>{'\u{1F50A}'}</AppText>
        <AppText bold color={colors.calmInk}>{text}</AppText>
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: sizes.tap, borderRadius: 14, backgroundColor: colors.calm, borderWidth: 2, borderColor: colors.calmInk, paddingHorizontal: 16, justifyContent: 'center', alignSelf: 'flex-start' },
  row: { gap: 10 },
  icon: { includeFontPadding: false },
  pressed: { opacity: 0.8, borderWidth: 4 },
});
