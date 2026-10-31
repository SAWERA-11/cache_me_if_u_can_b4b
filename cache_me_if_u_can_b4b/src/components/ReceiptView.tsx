import { colors } from '../theme/tokens';
import { ltr, useT } from '../theme/wire';
import { AppText } from './AppText';
import { AudioButton } from './AudioButton';
import { BigButton } from './BigButton';
import { Card } from './Card';

type Props = { receiptNo: string; onContinue: () => void };

export function ReceiptView({ receiptNo, onContinue }: Props) {
  const t = useT();
  return (
    <>
      <AppText size="big" bold color={colors.ink}>{t('receipt_title')}</AppText>
      <Card style={{ alignItems: 'center', gap: 12, paddingVertical: 28, backgroundColor: colors.primarySoft }}>
        <AppText bold color={colors.primary} style={{ fontSize: 40, lineHeight: 56, textAlign: 'center' }}>{ltr(receiptNo)}</AppText>
        <AppText size="heading" style={{ textAlign: 'center' }}>{t('receipt_save')}</AppText>
      </Card>
      <AudioButton clipId="ui_receipt" />
      <BigButton label={t('next')} onPress={onContinue} />
    </>
  );
}
