import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import { Row } from './Row';

// Calm "where am I" segments. Position only: no percentages, no score.
export function Progress({ index, total }: { index: number; total: number }) {
  return (
    <Row style={styles.row} accessibilityElementsHidden importantForAccessibility="no">
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.seg, i < index && styles.done, i === index && styles.now]} />
      ))}
    </Row>
  );
}

const styles = StyleSheet.create({
  row: { gap: 6 },
  seg: { flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.line },
  done: { backgroundColor: colors.brand },
  now: { backgroundColor: colors.primary },
});
