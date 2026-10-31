import { useState } from 'react';
import { colors } from '../theme/tokens';
import { HICCUPS, useApp, useT, type HiccupId } from '../theme/wire';
import { AppText } from './AppText';
import { AudioButton } from './AudioButton';
import { BigButton } from './BigButton';
import { Card } from './Card';
import { Sheet } from './Sheet';

type Props = { hiccup: HiccupId | null; onDone: () => void };

// Teach moment: after a surprise, the person advises a neighbour. No score, no "wrong" wording.
export function TeachSheet({ hiccup, onDone }: Props) {
  const t = useT();
  const lang = useApp((s) => s.language);
  const [picked, setPicked] = useState<string | null>(null);
  const h = hiccup ? HICCUPS[hiccup] : undefined;
  const done = () => { setPicked(null); onDone(); };
  if (!h || !hiccup) return <Sheet visible={false} onClose={done} title="" />;

  const habit = h.habit[lang] || h.habit.en;
  const options = [
    { id: 'right', text: habit },
    { id: 'w1', text: t('teach_wrong_1') },
    { id: 'w2', text: t('teach_wrong_2') },
  ];
  // Rotate by hiccup so the right answer is not always first.
  const shift = Object.keys(HICCUPS).indexOf(hiccup) % 3;
  const ordered = options.map((_, i) => options[(i + shift) % 3]);

  return (
    <Sheet visible onClose={done} dismissable={false} hideClose title={t('teach_title')}>
      <AppText color={colors.muted}>{t('teach_q')}</AppText>
      <Card><AppText size="heading" bold color={colors.ink}>{h.happened[lang] || h.happened.en}</AppText></Card>
      {picked === null ? (
        ordered.map((o) => (
          <BigButton key={o.id} variant="secondary" label={o.text} onPress={() => setPicked(o.id)} />
        ))
      ) : (
        <>
          <Card style={{ backgroundColor: colors.calm, borderColor: colors.calmInk, gap: 8 }}>
            <AppText bold color={colors.calmInk}>{picked === 'right' ? t('teach_right') : t('teach_gentle')}</AppText>
            {picked === 'right' ? null : <AppText size="heading" bold color={colors.ink}>{habit}</AppText>}
            <AudioButton clipId={h.audio} />
          </Card>
          <BigButton label={t('next')} onPress={done} />
        </>
      )}
      {picked === null ? <BigButton variant="calm" label={t('next')} onPress={done} /> : null}
    </Sheet>
  );
}
