import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { AudioButton } from '../components/AudioButton';
import { BigButton } from '../components/BigButton';
import { Brand } from '../components/Brand';
import { Card, IconTile } from '../components/Card';
import { Row } from '../components/Row';
import { Screen } from '../components/Screen';
import { colors } from '../theme/tokens';
import { useApp, useT } from '../theme/wire';

// Drawn glyphs: practice mark, calm mark, privacy mark.
const GLYPHS = ['✎', '♡', '•••'];

export default function Consent() {
  const t = useT();
  const lines = ['consent_line1', 'consent_line2', 'consent_line3'] as const;
  const start = () => { useApp.getState().set({ consented: true }); router.replace('/home'); };
  return (
    <Screen bottom={<BigButton label={t('start')} onPress={start} />}>
      <View style={styles.hero}><Brand big /></View>
      <AppText size="big" bold color={colors.ink} style={styles.center}>{t('consent_title')}</AppText>
      <Card style={styles.card}>
        {lines.map((k, i) => (
          <Row key={k} style={styles.row}>
            <IconTile glyph={GLYPHS[i]} tint={i === 2 ? colors.warm : colors.calm} ink={i === 2 ? colors.warmInk : colors.calmInk} />
            <View style={styles.text}><AppText size="heading">{t(k)}</AppText></View>
          </Row>
        ))}
      </Card>
      <View style={styles.audio}><AudioButton clipId="ui_consent" /></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingTop: 16 },
  center: { textAlign: 'center' },
  card: { gap: 20, padding: 20 },
  row: { gap: 16, alignItems: 'center' },
  text: { flex: 1 },
  audio: { alignItems: 'center' },
});
