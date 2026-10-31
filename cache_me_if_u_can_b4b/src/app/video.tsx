import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { AppText } from '../components/AppText';
import { BigButton } from '../components/BigButton';
import { Row } from '../components/Row';
import { Screen } from '../components/Screen';
import { Sheet } from '../components/Sheet';
import { colors, sizes } from '../theme/tokens';
import { useDir } from '../theme/useDir';
import { useTextSize } from '../theme/useTextSize';
import { fetchVideos, looksLikeSecret, uiBus, useT } from '../theme/wire';

type Item = { id: string; title: string; channel?: string; checked?: boolean };
type Source = 'curated' | 'cache' | 'live' | 'none';

const CHIPS: [string, string][] = [
  ['chip_word', 'What does this word mean?'], ['chip_box', 'What does this box want?'],
  ['chip_error', 'The page shows an error'], ['chip_logged_out', 'I was logged out'],
];

export default function VideoScreen() {
  const t = useT();
  const { align } = useDir();
  const { body } = useTextSize();
  const [text, setText] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [source, setSource] = useState<Source | null>(null);
  const [secret, setSecret] = useState(false);
  const [playing, setPlaying] = useState<Item | null>(null);
  const [after, setAfter] = useState(false);
  const [helped, setHelped] = useState<boolean | null>(null);
  const label = (k: string, f: string) => (t(k) === k ? f : t(k));

  const search = async (q: string) => {
    if (looksLikeSecret(q)) { setSecret(true); setItems([]); setSource(null); return; }
    setSecret(false);
    const r = await fetchVideos(q);
    setItems(r.items.slice(0, 3)); setSource(r.source);
  };
  const close = () => { setPlaying(null); setAfter(true); setHelped(null); };

  return (
    <Screen bottom={<BigButton variant="secondary" label={t('back')} onPress={() => router.back()} />}>
      <AppText size="big" bold color={colors.ink}>{t('find_video_title')}</AppText>
      <AppText bold color={colors.warmInk} style={styles.note}>{t('video_banner')}</AppText>
      {CHIPS.map(([k, f]) => (
        <BigButton key={k} variant="secondary" label={label(k, f)} onPress={() => search(label(k, f))} />
      ))}
      <TextInput accessibilityLabel={t('find_video_title')} value={text} onChangeText={setText}
        style={[styles.input, { fontSize: body, textAlign: align }]} />
      <BigButton label={t('next')} disabled={!text.trim()} onPress={() => search(text)} />
      {secret ? <AppText bold>{t('secret_warning')}</AppText> : null}
      {source === 'none' ? <AppText bold>{t('helper_unsure')}</AppText> : null}
      {items.map((v) => (
        <Pressable key={v.id} accessibilityRole="button" accessibilityLabel={v.title} onPress={() => setPlaying(v)} style={styles.card}>
          <Image accessibilityIgnoresInvertColors source={{ uri: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` }} style={styles.thumb} />
          <AppText size="heading" bold color={colors.ink}>{v.title}</AppText>
          <AppText color={colors.calmInk}>{v.checked ? t('checked_by_team') : t('from_youtube')}</AppText>
        </Pressable>
      ))}
      {after ? (
        <View style={styles.after}>
          <BigButton label={'Try it now'} onPress={() => uiBus.emit('helper', [])} />
          <AppText bold>{t('video_helped_q')}</AppText>
          <Row style={styles.row}>
            <View style={styles.flex}><BigButton variant={helped === true ? 'primary' : 'secondary'} label={t('yes')} onPress={() => setHelped(true)} /></View>
            <View style={styles.flex}><BigButton variant={helped === false ? 'primary' : 'secondary'} label={t('no')} onPress={() => setHelped(false)} /></View>
          </Row>
        </View>
      ) : null}
      <Sheet visible={!!playing} onClose={close} title={playing?.title ?? ''}>
        {playing ? (
          <View style={styles.player}>
            <WebView source={{ uri: `https://www.youtube.com/embed/${playing.id}?rel=0&playsinline=1` }} allowsFullscreenVideo />
          </View>
        ) : null}
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: { backgroundColor: colors.warm, padding: 12, borderRadius: 12 },
  input: { minHeight: sizes.tap, borderWidth: 2, borderColor: colors.ink, borderRadius: 14, backgroundColor: colors.card, paddingHorizontal: 16, color: colors.ink },
  card: { gap: 8, backgroundColor: colors.card, borderRadius: 16, borderWidth: 2, borderColor: colors.line, padding: 12 },
  thumb: { width: '100%', aspectRatio: 16 / 9, borderRadius: 10, backgroundColor: colors.line },
  after: { gap: 12 },
  row: { gap: 12 },
  flex: { flex: 1 },
  player: { height: 240, borderRadius: 12, overflow: 'hidden' },
});
