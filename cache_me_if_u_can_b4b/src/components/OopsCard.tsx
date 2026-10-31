import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import { useT, type Bi } from '../theme/wire';
import { useApp } from '../theme/wire';
import { AppText } from './AppText';
import { AudioButton } from './AudioButton';
import { BigButton } from './BigButton';

type Props = { oops: { consequence: Bi; fix: Bi }; audioId?: string; onTryAgain: () => void; onUndo: () => void };

export function OopsCard({ oops, audioId, onTryAgain, onUndo }: Props) {
  const t = useT();
  const lang = useApp((s) => s.language);
  return (
    <View style={styles.card}>
      <AppText size="heading" bold color={colors.warmInk}>{t('oops_title')}</AppText>
      <AppText color={colors.warmInk}>{oops.consequence[lang] || oops.consequence.en}</AppText>
      <AppText bold color={colors.warmInk}>{t('oops_fix')}</AppText>
      <AppText color={colors.warmInk}>{oops.fix[lang] || oops.fix.en}</AppText>
      {audioId ? <AudioButton clipId={audioId} /> : null}
      <BigButton label={t('try_again')} onPress={onTryAgain} />
      <BigButton variant="secondary" label={t('undo')} onPress={onUndo} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.warm, borderRadius: 16, borderWidth: 2, borderColor: colors.warmInk, padding: 16, gap: 12 },
});
