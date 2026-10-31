import { useEffect, useRef, useState } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SERVICES_FORM_HTML } from '../src/forms/servicesForm';
import { WALLET_FORM_HTML } from '../src/forms/walletForm';
import { handleGuideMessage } from '../src/guide/bridge';
import { buildLens } from '../src/guide/lens';
import { useApp } from '../src/store/useApp';

// TODO: Maaz must supply URLs after actual Android WebView tests. Do not claim desktop results as phone results.
export const PUBLIC_FORMS: { label: string; url: string }[] = [];
const OFF = "window.__mashq && window.__mashq.receive({type:'SET_GUIDE',on:false}); true;";

export default function GuideScreen() {
  const ref = useRef<WebView>(null);
  const guideOn = useApp(state => state.guideOn);
  const language = useApp(state => state.language);
  const [canGoBack, setCanGoBack] = useState(false);
  const [source, setSource] = useState<{ html: string; baseUrl: string } | { uri: string }>({ html: SERVICES_FORM_HTML, baseUrl: 'https://practice.mashq.local/' });
  useEffect(() => { useApp.getState().set({ guideOn: false }); return () => { useApp.getState().set({ guideOn: false }); }; }, []);
  useEffect(() => { ref.current?.injectJavaScript(OFF + (guideOn ? buildLens(language) : '')); }, [guideOn, language]);
  function leave() { ref.current?.stopLoading(); useApp.getState().set({ guideOn: false }); router.back(); }
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack) ref.current?.goBack(); else leave();
      return true;
    });
    return () => subscription.remove();
  }, [canGoBack]);
  function action(label: string, onPress: () => void) {
    return <Pressable key={label} accessibilityRole="button" style={styles.button} onPress={onPress}><Text style={styles.buttonText}>{label}</Text></Pressable>;
  }
  return <SafeAreaView style={styles.screen}>
    <View style={styles.row}><Text style={styles.text}>Guide me</Text><Switch accessibilityLabel="Guide me" value={guideOn} onValueChange={on => useApp.getState().set({ guideOn: on })} /></View>
    {guideOn && <Text style={styles.badge}>Guide is ON</Text>}
    <ScrollView horizontal style={styles.shortcuts} contentContainerStyle={styles.row}>
      {action('Practice form 1', () => setSource({ html: SERVICES_FORM_HTML, baseUrl: 'https://practice.mashq.local/' }))}
      {action('Practice form 2', () => setSource({ html: WALLET_FORM_HTML, baseUrl: 'https://practice.mashq.local/' }))}
      {PUBLIC_FORMS.map(form => action(form.label, () => setSource({ uri: form.url })))}
    </ScrollView>
    <WebView ref={ref} style={styles.web} source={source} originWhitelist={['*']} javaScriptEnabled domStorageEnabled setSupportMultipleWindows={false} incognito
      injectedJavaScript={guideOn ? buildLens(language) : 'true;'}
      onMessage={event => handleGuideMessage(event.nativeEvent.data)}
      onNavigationStateChange={navigation => setCanGoBack(navigation.canGoBack)}
      onShouldStartLoadWithRequest={request => /^(https?:|about:blank)/i.test(request.url)} />
    <View style={styles.row}>
      {action('Back', () => { if (canGoBack) ref.current?.goBack(); else leave(); })}
      {action('Reload', () => ref.current?.reload())}
      {action('Close and clear', leave)}
    </View>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f7f4' }, web: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, padding: 8 },
  text: { fontSize: 24, color: '#203830' }, badge: { fontSize: 20, color: '#186458', paddingHorizontal: 16 },
  shortcuts: { flexGrow: 0, maxHeight: 100 },
  button: { minHeight: 56, padding: 12, backgroundColor: '#186458', justifyContent: 'center', borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 20 },
});
