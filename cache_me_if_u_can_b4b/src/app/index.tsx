import { Redirect } from 'expo-router';
import { useApp } from '../theme/wire';

export default function Index() {
  const consented = useApp((s) => s.consented);
  return <Redirect href={consented ? '/home' : '/consent'} />;
}
