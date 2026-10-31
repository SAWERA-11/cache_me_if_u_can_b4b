import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { router } from 'expo-router';
import { Linking } from 'react-native';
import { AppText } from '../components/AppText';
import { BigButton } from '../components/BigButton';
import { buildFridgeHtml } from '../components/fridgeCard';
import { Screen } from '../components/Screen';
import { colors } from '../theme/tokens';
import { useApp, useT } from '../theme/wire';

export default function Fridge() {
  const t = useT();
  const lang = useApp((s) => s.language);

  const share = async () => {
    // Embed the Urdu font as base64 so the PDF does not depend on the phone's fonts.
    let font: string | undefined;
    try {
      const asset = await Asset.fromModule(require('../../assets/fonts/NotoNaskhArabic-Regular.ttf')).downloadAsync();
      if (asset.localUri) font = await new File(asset.localUri).base64();
    } catch {
      font = undefined; // fall back to the system font
    }
    const { uri } = await Print.printToFileAsync({ html: buildFridgeHtml(lang, font) });
    if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(uri);
  };
  const whatsapp = (key: string) => Linking.openURL('https://wa.me/?text=' + encodeURIComponent(t(key)));

  return (
    <Screen bottom={<BigButton variant="secondary" label={t('back')} onPress={() => router.back()} />}>
      <AppText size="big" bold color={colors.ink}>{t('fridge_card')}</AppText>
      <AppText size="heading">{t('wa_training_wheels')}</AppText>
      <BigButton label={t('fridge_card')} onPress={share} />
      <BigButton variant="calm" label={t('wa_training_wheels')} onPress={() => whatsapp('wa_training_wheels')} />
      <BigButton variant="calm" label={t('wa_share_app')} onPress={() => whatsapp('wa_share_app')} />
    </Screen>
  );
}
