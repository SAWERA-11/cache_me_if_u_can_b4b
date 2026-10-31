import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import { useT } from '../theme/wire';
import { AppText } from './AppText';
import { Row } from './Row';

type Props = { rung: 0 | 1 | 2 | null; compact?: boolean };

// Three-rung independence ladder drawn with Views. Rungs up to the current one are filled.
// Never shows numbers.
export function Ladder({ rung, compact }: Props) {
  const t = useT();
  const rungs = [2, 1, 0] as const; // top rung first
  return (
    <View accessible accessibilityLabel={rung === null ? '' : t('rung_' + rung)} style={styles.col}>
      {rungs.map((r) => {
        const reached = rung !== null && r <= rung;
        const current = rung === r;
        return (
          <Row key={r} style={styles.row}>
            <View style={[styles.rung, compact && styles.rungSmall, reached && styles.rungReached, current && styles.rungNow]} />
            {compact ? null : (
              <AppText size="heading" bold={current} color={current ? colors.calmInk : colors.muted}>{t('rung_' + r)}</AppText>
            )}
          </Row>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  col: { gap: 8 },
  row: { gap: 12 },
  rung: { width: 88, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.card },
  rungSmall: { width: 40, height: 10, borderRadius: 5 },
  rungReached: { backgroundColor: colors.calm, borderColor: colors.brand },
  rungNow: { backgroundColor: colors.brand, borderColor: colors.brand },
});
