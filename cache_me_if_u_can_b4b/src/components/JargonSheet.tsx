import { GLOSSARY, useApp, useT } from '../theme/wire';
import { AppText } from './AppText';
import { AudioButton } from './AudioButton';
import { Sheet } from './Sheet';
import { colors } from '../theme/tokens';

type Props = { termId: string | null; onClose: () => void };

export function JargonSheet({ termId, onClose }: Props) {
  const t = useT();
  const lang = useApp((s) => s.language);
  const term = termId ? GLOSSARY.find((g) => g.id === termId) : undefined;
  return (
    <Sheet visible={termId !== null} onClose={onClose} title={t('jargon_title')}>
      {term ? (
        <>
          <AppText size="big" bold color={colors.ink}>{term.term[lang] || term.term.en}</AppText>
          <AppText size="heading">{term.plain[lang] || term.plain.en}</AppText>
          <AppText color={colors.muted}>{term.analogy[lang] || term.analogy.en}</AppText>
          <AudioButton clipId={term.audio} />
        </>
      ) : (
        <AppText>{t('helper_unsure')}</AppText>
      )}
    </Sheet>
  );
}
