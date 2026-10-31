import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import { useT } from '../theme/wire';
import { AppText } from './AppText';
import { BigButton } from './BigButton';

type Props = {
  visible: boolean; onClose: () => void; title: string; children?: ReactNode;
  // The hiccup sheet must be dismissed with its own button, not by tapping outside.
  dismissable?: boolean; hideClose?: boolean;
};

export function Sheet({ visible, onClose, title, children, dismissable = true, hideClose }: Props) {
  const t = useT();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={dismissable ? onClose : undefined}>
      <View style={styles.root}>
        <Pressable accessibilityLabel={t('back')} style={styles.backdrop} onPress={dismissable ? onClose : undefined} />
        <View style={styles.sheet}>
          <AppText size="heading" bold color={colors.ink}>{title}</AppText>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>{children}</ScrollView>
          {hideClose ? null : <BigButton variant="secondary" label={t('back')} onPress={onClose} />}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0, backgroundColor: 'rgba(17,24,39,0.5)' },
  sheet: { maxHeight: '88%', backgroundColor: colors.bg, borderTopStartRadius: 24, borderTopEndRadius: 24, padding: 24, gap: 16 },
  scroll: { flexGrow: 0 },
  content: { gap: 16, paddingBottom: 8 },
});
