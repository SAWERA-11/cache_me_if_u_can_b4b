import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/tokens';
import { useApp, useT, type LessonResultView } from '../theme/wire';
import { LESSONS } from '../content';
import { AppText } from './AppText';
import { BigButton } from './BigButton';
import { Card } from './Card';
import { Ladder } from './Ladder';

type Props = { lessonId: string; result: LessonResultView | null; onRetry: () => void };

export function ResultView({ lessonId, result, onRetry }: Props) {
  const t = useT();
  const lang = useApp((s) => s.language);
  const [answered, setAnswered] = useState(false);
  if (!result) return <AppText>{t('take_a_moment')}</AppText>;

  const answer = (n: number) => {
    const { comfort, set } = useApp.getState();
    const index = comfort.findLastIndex((item) => item.lessonId === lessonId && item.before !== undefined && item.after === undefined);
    set({ comfort: index < 0 ? [...comfort, { lessonId, after: n }]
      : comfort.map((item, i) => i === index ? { ...item, after: n } : item) });
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
        <AppText color={colors.muted}>{t('handled_surprises').replace('{n}', String(result.hiccupsRecovered))}</AppText>
      ) : null}
      {answered ? null : (
        <Card style={styles.comfort}>
          <AppText bold>{t('comfort_q')}</AppText>
          <BigButton variant="calm" label={t('comfort_ok')} onPress={() => answer(2)} />
          <BigButton variant="secondary" label={t('comfort_unsure')} onPress={() => answer(1)} />
          <BigButton variant="secondary" label={t('comfort_notyet')} onPress={() => answer(0)} />
        </Card>
      )}
      <BigButton label={t(Object.keys(LESSONS)[Object.keys(LESSONS).indexOf(lessonId) + 1] ? 'next_lesson' : 'home_title')}
        onPress={() => { const next = Object.keys(LESSONS)[Object.keys(LESSONS).indexOf(lessonId) + 1];
          if (next) router.replace({ pathname: '/lesson/[id]', params: { id: next } }); else router.replace('/home'); }} />
      <BigButton variant="secondary" label={t('practise_again')} onPress={onRetry} />
      <BigButton variant="secondary" label={t('fridge_card')} onPress={() => router.push('/fridge')} />
    </>
  );
}

const styles = StyleSheet.create({
  comfort: { gap: 12 },
  hero: { gap: 16, backgroundColor: colors.calm, borderColor: colors.brand },
});
