import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import { ltr, useT, type Persona } from '../theme/wire';
import { AppText } from './AppText';
import { BigButton } from './BigButton';

type Highlight = 'name' | 'father' | 'dob' | 'id' | 'phone' | null;
type Props = {
  persona: Persona; side?: 'front' | 'back'; highlight?: Highlight; onFlip?: () => void;
};

function Line({ label, value, on }: { label: string; value: string; on: boolean }) {
  return (
    <View style={[styles.line, on && styles.lineOn]}>
      <AppText color={colors.muted}>{label}</AppText>
      <AppText bold color={colors.ink}>{value}</AppText>
    </View>
  );
}

export function IdCard({ persona, side, highlight = null, onFlip }: Props) {
  const t = useT();
  const [own, setOwn] = useState<'front' | 'back'>(side ?? 'front');
  const shown = onFlip ? side ?? 'front' : own;
  const title = t('card_title');
  const flip = () => (onFlip ? onFlip() : setOwn(own === 'front' ? 'back' : 'front'));
  return (
    <View style={styles.wrap}>
      <View style={styles.card} accessible accessibilityLabel={title}>
        <AppText bold color={colors.primary}>{title}</AppText>
        {shown === 'front' ? (
          <>
            <Line label={t('card_name')} value={persona.name} on={highlight === 'name'} />
            <Line label={t('card_father')} value={persona.father} on={highlight === 'father'} />
            <Line label={t('card_dob')} value={persona.dobWords} on={highlight === 'dob'} />
            <Line label={t('card_phone')} value={ltr(persona.phone)} on={highlight === 'phone'} />
          </>
        ) : (
          <Line label={t('card_id')} value={ltr(persona.idNumber)} on={highlight === 'id'} />
        )}
      </View>
      <BigButton variant="secondary" label={t('flip')} onPress={flip} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  card: { backgroundColor: colors.card, borderRadius: 16, borderWidth: 2, borderColor: colors.line, padding: 16, gap: 8 },
  line: { borderWidth: 3, borderColor: 'transparent', borderRadius: 10, paddingVertical: 4, paddingHorizontal: 8 },
  lineOn: { borderColor: colors.ink },
});
