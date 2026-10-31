import { useApp, useT, HICCUPS, type HiccupId } from '../theme/wire';
import { AppText } from './AppText';
import { AudioButton } from './AudioButton';
import { BigButton } from './BigButton';
import { Sheet } from './Sheet';
import { colors } from '../theme/tokens';

type Props = { hiccup: HiccupId | null; onResolve: () => void };

export function HiccupSheet({ hiccup, onResolve }: Props) {
  const t = useT();
  const lang = useApp((s) => s.language);
  const h = hiccup ? HICCUPS[hiccup] : undefined;
  return (
    <Sheet visible={!!h} onClose={onResolve} dismissable={false} hideClose title={t('take_a_moment')}>
      {h ? (
        <>
          <AppText color={colors.muted}>{h.happened[lang] || h.happened.en}</AppText>
          <AppText size="big" bold color={colors.ink}>{h.habit[lang] || h.habit.en}</AppText>
          <AudioButton clipId={h.audio} />
          <BigButton label={t('got_it')} onPress={onResolve} />
        </>
      ) : null}
    </Sheet>
  );
}
