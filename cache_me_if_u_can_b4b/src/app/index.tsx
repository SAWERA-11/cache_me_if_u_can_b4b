import { Redirect } from 'expo-router';
import { useApp } from '../theme/wire';

export default function Index() {
  const consented = useApp((s) => s.consented);
  // RootLayout gates every route until the persisted store is hydrated.
  return <Redirect href={consented ? '/home' : '/consent'} />;
}
