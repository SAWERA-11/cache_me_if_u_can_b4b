import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, Switch, TextInput } from 'react-native';
import { router } from 'expo-router';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SERVICES_FORM_HTML } from '../src/forms/servicesForm';
import { WALLET_FORM_HTML } from '../src/forms/walletForm';
import { RIDE_FORM_HTML } from '../src/forms/rideForm';
import { handleGuideMessage } from '../src/guide/bridge';
import { buildLens } from '../src/guide/lens';
import { useApp } from '../src/store/useApp';
import { AppText } from '../src/components/AppText';
import { Row } from '../src/components/Row';
import { useDir } from '../src/theme/useDir';
import { useT } from '../src/lib/t';
import { normalizeAddress } from '../src/guide/address';
import { useTextSize } from '../src/theme/useTextSize';

// Desktop-tested demo forms; Android WebView acceptance is still pending.
export const PUBLIC_FORMS: { label: string; url: string }[] = [
  { label: 'Demo web form', url: 'https://www.selenium.dev/selenium/web/web-form.html' },
  { label: 'Demo contact fields', url: 'https://httpbin.org/forms/post' },
];
const OFF = "window.__mashq && window.__mashq.receive({type:'SET_GUIDE',on:false}); true;";

function GuideButton({ label, onPress }: { label: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} style={styles.button} onPress={onPress}><AppText color="#fff">{label}</AppText></Pressable>;
}

export default function GuideScreen() {
  // WebView 14 defaults its extra-props generic to undefined, which intersects
  // with its declared props as never in strict TypeScript. Use object explicitly.
  const ref = useRef<WebView<object>>(null);
  const guideOn = useApp(state => state.guideOn);
  const language = useApp(state => state.language);
  const t = useT();
  const { row } = useDir();
  const [ready, setReady] = useState(false);
  const enabled = ready && guideOn;
  const [canGoBack, setCanGoBack] = useState(false);
  const { body } = useTextSize();
  const { align } = useDir();
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState<string | null>(null);
  const openAddress = () => {
    const result = normalizeAddress(address);
    if (!result.ok) { setAddressError(result.reason === 'secret' ? t('guide_address_secret') : t('guide_address_invalid')); return; }
    setAddressError(null);
    setSource({ uri: result.url });
  };
  const [source, setSource] = useState<{ html: string; baseUrl: string } | { uri: string }>({ html: SERVICES_FORM_HTML, baseUrl: 'https://practice.mashq.local/' });
  useEffect(() => { useApp.getState().set({ guideOn: false }); return () => { useApp.getState().set({ guideOn: false }); }; }, []);
  useEffect(() => { ref.current?.injectJavaScript(OFF + (enabled ? buildLens(language) : '')); }, [enabled, language]);
  const leave = useCallback(() => { ref.current?.stopLoading(); useApp.getState().set({ guideOn: false }); router.back(); }, []);
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack) ref.current?.goBack(); else leave();
      return true;
    });
    return () => subscription.remove();
  }, [canGoBack, leave]);
  return <SafeAreaView style={styles.screen}>
    <Row style={styles.row}><AppText size="heading" style={styles.title}>{t('guide_me')}</AppText><Switch accessibilityLabel={t('guide_me')} value={enabled} onValueChange={on => useApp.getState().set({ guideOn: on })} /></Row>
    {enabled && <AppText style={styles.badge}>{t('guide_on_badge')}</AppText>}
    <Row style={styles.row}>
      <TextInput accessibilityLabel={t('guide_address_hint')} placeholder={t('guide_address_hint')} value={address}
        onChangeText={setAddress} onSubmitEditing={openAddress} autoCapitalize="none" autoCorrect={false}
        keyboardType="url" returnKeyType="go" style={[styles.address, { fontSize: body, textAlign: align }]} />
      <GuideButton label={t('guide_open')} onPress={openAddress} />
    </Row>
    {addressError && <AppText style={styles.error}>{addressError}</AppText>}
    <ScrollView horizontal style={styles.shortcuts} contentContainerStyle={[styles.shortcutContent, { flexDirection: row }]}>
      <GuideButton label={t('practice_form_1')} onPress={() => setSource({ html: SERVICES_FORM_HTML, baseUrl: 'https://practice.mashq.local/' })} />
      <GuideButton label={t('practice_form_2')} onPress={() => setSource({ html: WALLET_FORM_HTML, baseUrl: 'https://practice.mashq.local/' })} />
      <GuideButton label={t('practice_form_3')} onPress={() => setSource({ html: RIDE_FORM_HTML, baseUrl: 'https://practice.mashq.local/' })} />
      {PUBLIC_FORMS.map(form => <GuideButton key={form.url} label={form.label} onPress={() => setSource({ uri: form.url })} />)}
    </ScrollView>
    <WebView<object> ref={ref} style={styles.web} source={source} originWhitelist={['*']} javaScriptEnabled domStorageEnabled setSupportMultipleWindows={false} incognito
      injectedJavaScript={enabled ? buildLens(language) : 'true;'}
      onLoadEnd={() => setReady(true)}
      onMessage={(event: { nativeEvent: { data: string } }) => {
        if (!enabled) return;
        try { if (JSON.parse(event.nativeEvent.data)?.type === 'GUIDE_OFF') { useApp.getState().set({ guideOn: false }); return; } } catch { return; }
        handleGuideMessage(event.nativeEvent.data);
      }}
      onNavigationStateChange={(navigation: { canGoBack: boolean }) => setCanGoBack(navigation.canGoBack)}
      onShouldStartLoadWithRequest={(request: { url: string }) => /^(https?:|about:blank)/i.test(request.url)} />
    <Row style={styles.row}>
      <GuideButton label={t('back')} onPress={() => { if (canGoBack) ref.current?.goBack(); else leave(); }} />
      <GuideButton label={t('reload')} onPress={() => ref.current?.reload()} />
      <GuideButton label={t('close_and_clear')} onPress={leave} />
    </Row>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f7f4' }, web: { flex: 1 },
  row: { alignItems: 'center', flexWrap: 'wrap', gap: 8, padding: 8 },
  address: { flex: 1, minWidth: 160, minHeight: 56, borderWidth: 2, borderColor: '#186458', borderRadius: 8, backgroundColor: '#fff', paddingHorizontal: 12, color: '#10233F' },
  error: { paddingHorizontal: 16, color: '#5B3A00' },
  title: { flex: 1 }, badge: { color: '#186458', paddingHorizontal: 16 },
  shortcuts: { flexGrow: 0 }, shortcutContent: { alignItems: 'center', gap: 8, padding: 8 },
  button: { minHeight: 56, padding: 12, backgroundColor: '#186458', justifyContent: 'center', borderRadius: 8, flexShrink: 1 },
});
