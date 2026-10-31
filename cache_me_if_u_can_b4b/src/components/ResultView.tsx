import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/tokens';
import { useApp, useT, type LessonResultView } from '../theme/wire';
import { AppText } from './AppText';
import { BigButton } from './BigButton';
import { Card } from './Card';
import { Ladder } from './Ladder';

type Props = { lessonId: string; result: LessonResultView | null };

export function ResultView({ lessonId, result }: Props) {
  const t = useT();
  const lang = useApp((s) => s.language);
  const [answered, setAnswered] = useState(false);
  if (!result) return <AppText>{t('take_a_moment')}</AppText>;

  const answer = (n: number) => {
    const { comfort, set } = useApp.getState();
    set({ comfort: [...comfort, { lessonId, after: n }] });
    setAnswered(true);
  };
  return (
    <>
      <AppText size="big" bold color={colors.ink}>{t('result_title')}</AppText>
      <Card style={styles.hero}>
        <Ladder rung={result.rung} />
        <AppText size="heading" color={colors.calmInk}>{result.strength[lang] || result.strength.en}</AppText>
      </Card>
      {result.hiccupsRecovered > 0 ? (
        // TODO(UR-review): needs a STRINGS key; English literal until Savera adds one.
        <AppText color={colors.muted}>{`You handled ${result.hiccupsRecovered} surprises`}</AppText>
      ) : null}
      {answered ? null : (
        <Card style={styles.comfort}>
          <AppText bold>{t('comfort_q')}</AppText>
          <BigButton variant="calm" label={t('comfort_ok')} onPress={() => answer(2)} />
          <BigButton variant="secondary" label={t('comfort_unsure')} onPress={() => answer(1)} />
          <BigButton variant="secondary" label={t('comfort_notyet')} onPress={() => answer(0)} />
        </Card>
      )}
      {/* TODO: next_lesson / practise_again need real lesson ids and a runner reset from Ahmer. */}
      <BigButton label={t('next_lesson')} onPress={() => router.replace('/home')} />
      <BigButton variant="secondary" label={t('practise_again')} onPress={() => router.replace(`/lesson/${lessonId}`)} />
      <BigButton variant="secondary" label={t('fridge_card')} onPress={() => router.push('/fridge')} />
    </>
  );
}

const styles = StyleSheet.create({
  comfort: { gap: 12 },
  hero: { gap: 16, backgroundColor: colors.calm, borderColor: colors.brand },
});
