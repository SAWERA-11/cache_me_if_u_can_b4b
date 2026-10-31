import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { colors, sizes } from '../theme/tokens';
import { useDir } from '../theme/useDir';
import { useTextSize } from '../theme/useTextSize';
import { useApp, useT, type Step } from '../theme/wire';
import { AppText } from './AppText';
import { BigButton } from './BigButton';
import { Row } from './Row';

type Props = { step: Step; value: string; onChange: (v: string) => void; highlighted: boolean };

function Box({ highlighted, style, ...rest }: TextInputProps & { highlighted: boolean }) {
  const { align } = useDir();
  const { body } = useTextSize();
  return (
    <TextInput
      placeholderTextColor={colors.muted}
      {...rest}
      style={[styles.input, { fontSize: body, textAlign: align }, highlighted && styles.highlight, style]}
    />
  );
}

export function FieldInput({ step, value, onChange, highlighted }: Props) {
  const t = useT();
  const lang = useApp((s) => s.language);
  const label = step.label[lang] || step.label.en;
  // DOB boxes keep their own parts so typing in one box never clears another.
  const dob = value.split('-');
  const setPart = (i: 0 | 1 | 2, v: string) => {
    const next = [...dob] as [string, string, string];
    next[i] = v.replace(/\D/g, '');
    onChange(next.some(Boolean) ? next.join('-') : '');
  };

  switch (step.fieldKind) {
    case 'choice':
    case 'file':
      return (
        <View style={styles.gap}>
          {(step.choices ?? []).map((c, i) => {
            const text = c.label[lang] || c.label.en;
            const on = value === c.id;
            if (step.fieldKind === 'choice') {
              return <BigButton key={c.id} variant={on ? 'primary' : 'secondary'} label={text} onPress={() => onChange(c.id)} />;
            }
            // Sample photos are drawn with Views; they are not real images.
            return (
              <View key={c.id} style={[styles.photo, on && styles.highlight]}>
                <View style={styles.photoArt}><View style={[styles.photoSun, { opacity: 0.4 + i * 0.3 }]} /></View>
                <BigButton variant={on ? 'primary' : 'secondary'} label={text} onPress={() => onChange(c.id)} />
              </View>
            );
          })}
        </View>
      );
    case 'dob':
      return (
        <Row style={styles.gap2}>
          {([['DD', 2], ['MM', 2], ['YYYY', 4]] as const).map(([ph, max], i) => (
            <View key={ph} style={{ flex: max }}>
              <Box highlighted={highlighted} accessibilityLabel={`${label} ${ph}`} placeholder={ph} maxLength={max}
                keyboardType="number-pad" value={dob[i] ?? ''} onChangeText={(v) => setPart(i as 0 | 1 | 2, v)} />
            </View>
          ))}
        </Row>
      );
    case 'code':
      return (
        <View style={styles.gap}>
          <View style={styles.sms} accessible>
            <AppText bold color={colors.calmInk}>{t('sms_banner').replace('{code}', step.example ?? '')}</AppText>
          </View>
          <Box highlighted={highlighted} accessibilityLabel={label} keyboardType="number-pad" value={value} onChangeText={onChange} />
        </View>
      );
    default:
      return (
        <Box highlighted={highlighted} accessibilityLabel={label} value={value} onChangeText={onChange}
          placeholder={step.example}
          keyboardType={step.fieldKind === 'phone' ? 'phone-pad' : step.fieldKind === 'id_number' ? 'number-pad' : 'default'} />
      );
  }
}

const styles = StyleSheet.create({
  input: { minHeight: sizes.tap, borderWidth: 2, borderColor: colors.ink, borderRadius: 14, backgroundColor: colors.card, paddingHorizontal: 16, color: colors.ink },
  highlight: { borderWidth: 5, borderColor: colors.ink },
  gap: { gap: 12 },
  gap2: { gap: 8 },
  photo: { gap: 8, padding: 8, borderRadius: 14, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.card },
  photoArt: { height: 80, borderRadius: 10, backgroundColor: colors.calm, alignItems: 'center', justifyContent: 'center' },
  photoSun: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.calmInk },
  sms: { backgroundColor: colors.calm, borderRadius: 14, borderWidth: 2, borderColor: colors.calmInk, padding: 14 },
});
