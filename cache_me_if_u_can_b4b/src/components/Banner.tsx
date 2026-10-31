import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import { useT } from '../theme/wire';
import { AppText } from './AppText';
import { Row } from './Row';

export function Banner() {
  const text = useT()('practice_banner');
  return (
    <View accessibilityRole="header" style={styles.bar}>
      <Row style={styles.row}>
        <View style={styles.dot} />
        <AppText bold color={colors.warmInk} style={styles.text}>{text}</AppText>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: colors.warm, borderBottomWidth: 2, borderColor: colors.warmInk, paddingVertical: 10, paddingHorizontal: 16 },
  row: { justifyContent: 'center', gap: 10 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.warmInk },
  text: { textAlign: 'center' },
});
