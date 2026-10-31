import { router } from 'expo-router';
import { resumableLessonId } from '../engine/catalog';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Brand } from '../components/Brand';
import { TapCard } from '../components/Card';
import { Ladder } from '../components/Ladder';
import { Screen } from '../components/Screen';
import { colors, sizes } from '../theme/tokens';
import { LESSON1, LESSON_DELIVERY, uiBus, useApp, useT } from '../theme/wire';

export default function Home() {
  const t = useT();
  const lang = useApp((s) => s.language);
  const guideOn = useApp((s) => s.guideOn);
  const results = useApp((s) => s.results);
  const latest = (id: string) => results.filter((r) => r.lessonId === id).sort((a, b) => b.ts - a.ts)[0];
  const last = latest(LESSON1.id);
  const lastDelivery = latest(LESSON_DELIVERY.id);
  const exitedLessonId = useApp((state) => resumableLessonId(state.events));

  return (
    <Screen>
      <View style={styles.hero}>
        <Brand />
        <AppText size="big" bold color={colors.ink} style={styles.center}>{t('home_title')}</AppText>
      </View>
      {exitedLessonId ? (
        <TapCard glyph={'↻'} tint={colors.warm} ink={colors.warmInk} label={t('continue_card')}
          onPress={() => router.push(`/lesson/${exitedLessonId}`)} />
      ) : null}
      <TapCard glyph={'✎'} label={LESSON1.title[lang] || LESSON1.title.en} hint={t('lessons')}
        onPress={() => router.push(`/lesson/${LESSON1.id}`)}
        trailing={<Ladder rung={last ? last.rung : null} compact />} />
      <TapCard glyph={'🛵'} label={LESSON_DELIVERY.title[lang] || LESSON_DELIVERY.title.en} hint={t('lessons')}
        onPress={() => router.push(`/lesson/${LESSON_DELIVERY.id}`)}
        trailing={<Ladder rung={lastDelivery ? lastDelivery.rung : null} compact />} />
      <TapCard glyph="?" tint={colors.calm} ink={colors.calmInk} label={t('find_help')}
        onPress={() => uiBus.emit('helper', [])} />
      <TapCard glyph={'►'} tint={colors.warm} ink={colors.warmInk} label={t('find_video_title')}
        onPress={() => router.push('/video')} />
      <TapCard glyph={'⌖'} label={t('guide_me')} onPress={() => useApp.getState().set({ guideOn: !guideOn })}
        trailing={<Switch accessibilityLabel={t('guide_me')} value={guideOn} onValueChange={(v) => useApp.getState().set({ guideOn: v })} />} />
      {guideOn ? (
        <TapCard glyph={'✓'} tint={colors.calm} ink={colors.calmInk} label={t('guide_on_badge')}
          onPress={() => router.push('/guide')} />
      ) : null}
      <Pressable accessibilityRole="link" accessibilityLabel={t('settings')} onPress={() => router.push('/settings')} style={styles.link}>
        <AppText bold color={colors.primary}>{t('settings')}</AppText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: 12, paddingVertical: 8 },
  center: { textAlign: 'center' },
  link: { minHeight: sizes.tap, justifyContent: 'center', alignItems: 'center' },
});
