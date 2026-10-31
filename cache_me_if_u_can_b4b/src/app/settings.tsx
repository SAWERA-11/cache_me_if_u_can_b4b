import { router } from 'expo-router';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { AppText } from '../components/AppText';
import { BigButton } from '../components/BigButton';
import { Card } from '../components/Card';
import { Row } from '../components/Row';
import { Screen } from '../components/Screen';
import { Sheet } from '../components/Sheet';
import { colors, sizes } from '../theme/tokens';
import { useApp, useT } from '../theme/wire';
import { useState } from 'react';

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <AppText size="heading" bold color={colors.ink}>{title}</AppText>
      {children}
    </View>
  );
}

function Choices<T extends string | number>({ options, value, onPick }: { options: [T, string][]; value: T; onPick: (v: T) => void }) {
  return (
    <Row style={styles.choices}>
      {options.map(([v, label]) => (
        <View key={String(v)} style={styles.flex}>
          <BigButton variant={v === value ? 'primary' : 'secondary'} label={label} onPress={() => onPick(v)} />
        </View>
      ))}
    </Row>
  );
}

export default function Settings() {
  const t = useT();
  const { textLevel, audioSpeed, language, shareProgress, set } = useApp((s) => s);
  const [confirm, setConfirm] = useState(false);
  return (
    <Screen bottom={<BigButton variant="secondary" label={t('back')} onPress={() => router.back()} />}>
      <AppText size="big" bold color={colors.ink}>{t('settings')}</AppText>
      <Group title={t('settings_text_size')}>
        <Choices options={[[0, '20'], [1, '24'], [2, '28']]} value={textLevel} onPick={(v) => set({ textLevel: v as 0 | 1 | 2 })} />
      </Group>
      <Group title={t('settings_audio_speed')}>
        <Choices options={[[0.8, '0.8x'], [1, '1x']]} value={audioSpeed} onPick={(v) => set({ audioSpeed: v as 0.8 | 1 })} />
      </Group>
      <Group title={t('settings_language')}>
        <Choices options={[['ur', 'اردو'], ['en', 'English']]} value={language} onPick={(v) => set({ language: v })} />
      </Group>
      <Pressable accessibilityRole="switch" accessibilityLabel={t('settings_share_progress')} accessibilityState={{ checked: shareProgress }}
        onPress={() => set({ shareProgress: !shareProgress })} style={styles.toggle}>
        <Row style={styles.choices}>
          <View style={styles.flex}><AppText size="heading" bold color={colors.ink}>{t('settings_share_progress')}</AppText></View>
          <Switch value={shareProgress} onValueChange={(v) => set({ shareProgress: v })} />
        </Row>
      </Pressable>
      <BigButton variant="secondary" label={t('consent_title')} onPress={() => router.push('/consent')} />
      <BigButton variant="calm" label={t('settings_reset')} onPress={() => setConfirm(true)} />
      <AppText>{t('settings_about')}</AppText>
      <Card style={styles.privacy}>
        <AppText bold color={colors.ink}>{t('guide_privacy_title')}</AppText>
        {[1, 2, 3, 4, 5].map((n) => <AppText key={n}>{t('guide_privacy_' + n)}</AppText>)}
      </Card>
      <Sheet visible={confirm} onClose={() => setConfirm(false)} title={t('settings_reset')}>
        <BigButton label={t('yes')} onPress={() => { setConfirm(false); useApp.getState().reset(); router.replace('/consent'); }} />
        <BigButton variant="secondary" label={t('no')} onPress={() => setConfirm(false)} />
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  group: { gap: 12 },
  choices: { gap: 12 },
  flex: { flex: 1 },
  privacy: { gap: 8 },
  toggle: { minHeight: sizes.tap, justifyContent: 'center' },
});
