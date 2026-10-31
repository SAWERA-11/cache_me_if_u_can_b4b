import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, sizes } from '../theme/tokens';
import { looksLikeSecret, matchChip, matchQuestion, useApp, useT, type KBEntry } from '../theme/wire';
import { useDir } from '../theme/useDir';
import { useTextSize } from '../theme/useTextSize';
import { AppText } from './AppText';
import { AudioButton } from './AudioButton';
import { BigButton } from './BigButton';
import { Sheet } from './Sheet';

const CHIPS: [string, string][] = [
  ['chip_word', 'What does this word mean?'], ['chip_box', 'What does this box want?'],
  ['chip_error', 'The page shows an error'], ['chip_logged_out', 'I was logged out'],
  ['chip_safe', 'Is this safe?'],
];

type Props = { visible: boolean; onClose: () => void; fieldKinds?: unknown[] };
type View_ = { kind: 'none' } | { kind: 'secret' } | { kind: 'unsure' } | { kind: 'answer'; entry: KBEntry };

export function HelperSheet({ visible, onClose }: Props) {
  const t = useT();
  const lang = useApp((s) => s.language);
  const { align } = useDir();
  const { body } = useTextSize();
  const [text, setText] = useState('');
  const [view, setView] = useState<View_>({ kind: 'none' });

  const ask = (q: string) => {
    if (looksLikeSecret(q)) return setView({ kind: 'secret' });
    const entry = matchQuestion(q);
    setView(entry ? { kind: 'answer', entry } : { kind: 'unsure' });
  };
  // Chips use Ahmer's chip-to-entry map; free text and follow-up chips go through the matcher.
  const askChip = (key: string) => {
    const entry = matchChip(key);
    setView(entry ? { kind: 'answer', entry } : { kind: 'unsure' });
  };
  const label = (key: string, fallback: string) => (t(key) === key ? fallback : t(key));
  const close = () => { setText(''); setView({ kind: 'none' }); onClose(); };

  return (
    <Sheet visible={visible} onClose={close} title={t('helper_title')}>
      {CHIPS.map(([key, fallback]) => (
        <BigButton key={key} variant="secondary" label={label(key, fallback)} onPress={() => askChip(key)} />
      ))}
      <TextInput
        accessibilityLabel={t('helper_title')} value={text} onChangeText={setText}
        style={[styles.input, { fontSize: body, textAlign: align }]} placeholderTextColor={colors.muted}
      />
      <BigButton label={t('next')} disabled={!text.trim()} onPress={() => ask(text)} />
      {view.kind === 'secret' ? <AppText bold>{t('secret_warning')}</AppText> : null}
      {view.kind === 'unsure' ? <AppText bold>{t('helper_unsure')}</AppText> : null}
      {view.kind === 'answer' ? (
        <View style={styles.answer}>
          <AppText size="heading">{view.entry.answer[lang] || view.entry.answer.en}</AppText>
          <AudioButton clipId={view.entry.audio} />
          <AppText bold>{view.entry.tryNext[lang] || view.entry.tryNext.en}</AppText>
          {(view.entry.chips ?? []).map((c) => (
            <BigButton key={c} variant="calm" label={label(c, c)} onPress={() => ask(label(c, c))} />
          ))}
        </View>
      ) : null}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  input: { minHeight: sizes.tap, borderWidth: 2, borderColor: colors.ink, borderRadius: 14, backgroundColor: colors.card, paddingHorizontal: 16, color: colors.ink },
  answer: { gap: 12, backgroundColor: colors.card, borderRadius: 16, borderWidth: 2, borderColor: colors.line, padding: 16 },
});
