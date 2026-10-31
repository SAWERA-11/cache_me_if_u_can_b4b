import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import { STRINGS, useApp, useT, type Step } from '../theme/wire';
import { AppText } from './AppText';
import { AudioButton } from './AudioButton';
import { BigButton } from './BigButton';
import { Card } from './Card';

export type Answer = { step: Step; value: string };
type Props = { answers: Answer[]; highlightField: string | null; vagueError: boolean; onSubmit: () => void };

export function ReviewView({ answers, highlightField, vagueError, onSubmit }: Props) {
  const t = useT();
  const lang = useApp((s) => s.language);
  const banner = STRINGS.vague_error_banner ? t('vague_error_banner') : 'There was a problem with your submission';
  return (
    <>
      <AppText size="big" bold color={colors.ink}>{t('review_title')}</AppText>
      {vagueError ? (
        <View style={styles.banner} accessible><AppText bold color={colors.warmInk}>{banner}</AppText></View>
      ) : null}
      {/* TODO: wire to real hook. runner.answers is not in the contract, so answers are captured
          from runner.input as each step completes. Tap-to-jump needs a runner navigation action. */}
      {answers.map(({ step, value }) => {
        const shown = step.choices?.find((c) => c.id === value)?.label;
        return (
          <Card key={step.id} style={[styles.row, highlightField === step.id && styles.rowOn]}>
            <AppText color={colors.muted}>{step.label[lang] || step.label.en}</AppText>
            <AppText size="big" bold color={colors.ink}>{shown ? shown[lang] || shown.en : value}</AppText>
            <AudioButton clipId={step.audio?.asks} label={t('read_aloud')} />
          </Card>
        );
      })}
      <BigButton label={t('submit')} onPress={onSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: colors.warm, borderRadius: 14, borderWidth: 2, borderColor: colors.warmInk, padding: 14 },
  row: { gap: 8 },
  rowOn: { borderWidth: 5, borderColor: colors.ink },
});
