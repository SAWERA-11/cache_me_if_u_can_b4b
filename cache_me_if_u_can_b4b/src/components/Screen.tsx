import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/tokens';

type Props = { children: ReactNode; top?: ReactNode; bottom?: ReactNode };

// Shared page frame: safe area, optional fixed top strip (the Banner) and a scrolling body.
export function Screen({ children, top, bottom }: Props) {
  return (
    <SafeAreaView style={styles.root}>
      {top}
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>
      {bottom ? <View style={styles.bottom}>{bottom}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 16 },
  bottom: { padding: 16, gap: 12, borderTopWidth: 2, borderColor: colors.line, backgroundColor: colors.bg },
});
