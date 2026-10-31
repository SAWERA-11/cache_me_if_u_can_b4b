import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { useApp } from '../theme/wire';

export default function Index() {
  const consented = useApp((s) => s.consented);
  // The store is persisted: wait for it to load so a returning user is not sent to consent.
  const [ready, setReady] = useState(useApp.persist.hasHydrated());
  useEffect(() => useApp.persist.onFinishHydration(() => setReady(true)), []);
  if (!ready) return null;
  return <Redirect href={consented ? '/home' : '/consent'} />;
}
