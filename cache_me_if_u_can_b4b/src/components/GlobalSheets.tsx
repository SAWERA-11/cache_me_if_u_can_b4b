import { useEffect, useState } from 'react';
import { uiBus } from '../theme/wire';
import { HelperSheet } from './HelperSheet';
import { JargonSheet } from './JargonSheet';

export function GlobalSheets() {
  const [term, setTerm] = useState<string | null>(null);
  const [helperKinds, setHelperKinds] = useState<unknown[] | null>(null);

  useEffect(() => {
    const offJargon = uiBus.on('jargon', (p) => setTerm(typeof p === 'string' ? p : null));
    const offHelper = uiBus.on('helper', (p) => setHelperKinds(Array.isArray(p) ? p : []));
    return () => { offJargon(); offHelper(); };
  }, []);

  return (
    <>
      <JargonSheet termId={term} onClose={() => setTerm(null)} />
      <HelperSheet visible={helperKinds !== null} fieldKinds={helperKinds ?? []} onClose={() => setHelperKinds(null)} />
    </>
  );
}
