import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { AudioButton } from '../../components/AudioButton';
import { Banner } from '../../components/Banner';
import { Card } from '../../components/Card';
import { Progress } from '../../components/Progress';
import { BigButton } from '../../components/BigButton';
import { FieldInput } from '../../components/FieldInput';
import { HiccupSheet } from '../../components/HiccupSheet';
import { IdCard } from '../../components/IdCard';
import { OopsCard } from '../../components/OopsCard';
import { ReceiptView } from '../../components/ReceiptView';
import { ResultView } from '../../components/ResultView';
import { type Answer, ReviewView } from '../../components/ReviewView';
import { Row } from '../../components/Row';
import { Screen } from '../../components/Screen';
import { StuckButton } from '../../components/StuckButton';
import { colors } from '../../theme/tokens';
import { GLOSSARY, type Step, uiBus, useApp, useRunner, useT } from '../../theme/wire';

type LayerName = 'asks' | 'where' | 'format' | 'ifUnsure';
const LAYERS: [LayerName, string][] = [
  ['asks', 'layer_asks'], ['where', 'layer_where'], ['format', 'layer_format'], ['ifUnsure', 'layer_unsure'],
];

type Highlight = 'name' | 'father' | 'dob' | 'id' | 'phone';
const CARD_MAP: Record<string, { highlight: Highlight; side: 'front' | 'back' }> = {
  name: { highlight: 'name', side: 'front' },
  father: { highlight: 'father', side: 'front' },
  dob: { highlight: 'dob', side: 'front' },
  id: { highlight: 'id', side: 'back' },
  phone: { highlight: 'phone', side: 'front' },
};

const pick = (b: { ur: string; en: string } | undefined, lang: 'ur' | 'en') => (b ? b[lang] || b.en : '');

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const runner = useRunner(id ?? 'lesson1');
  const { step, actions } = runner;
  const t = useT();
  const lang = useApp((s) => s.language);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const prev = useRef<{ index: number; step: Step; input: string } | null>(null);

  // Capture each answer as its step completes (the runner does not expose answers yet).
  useEffect(() => {
    const p = prev.current;
    if (p && runner.stepIndex > p.index && p.step.kind === 'field') {
      setAnswers((a) => [...a.filter((x) => x.step.id !== p.step.id), { step: p.step, value: p.input }]);
    }
    prev.current = { index: runner.stepIndex, step, input: runner.input };
  }, [runner.stepIndex, runner.input, step]);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => { actions.backPressed(); return true; });
    return () => sub.remove();
  }, [actions]);

  const fieldSteps = runner.lesson.steps.filter((s) => s.kind === 'field');
  const fieldIndex = fieldSteps.findIndex((s) => s.id === step.id);

  let body: React.ReactNode;
  let bottom: React.ReactNode = null;

  if (runner.done && runner.receiptNo && !showResult) {
    body = <ReceiptView receiptNo={runner.receiptNo} onContinue={() => setShowResult(true)} />;
  } else if (showResult) {
    body = <ResultView lessonId={runner.lesson.id} result={runner.result} />;
  } else if (step.kind === 'info') {
    const loggedOut = step.hiccup?.id === 'logged_out';
    body = (
      <>
        <AppText size="big" bold color={colors.ink}>{loggedOut ? pick(step.label, lang) : pick(runner.lesson.title, lang)}</AppText>
        {loggedOut ? <AppText size="heading">{t('session_expired')}</AppText> : <AppText size="heading">{pick(step.asks, lang)}</AppText>}
        {loggedOut ? <AudioButton clipId={step.audio?.asks} /> : null}
        {(step.id === 'ready' ? runner.lesson.ready : []).map((r) => (
          <Card key={r.id} style={styles.item}>
            <AppText size="heading">{pick(r.text, lang)}</AppText>
            <AudioButton clipId={r.audio} />
          </Card>
        ))}
      </>
    );
    bottom = <BigButton label={loggedOut ? t('log_in_again') : t('next')} onPress={actions.submit} />;
  } else if (step.kind === 'field') {
    const card = CARD_MAP[step.id];
    body = (
      <>
        <Progress index={fieldIndex} total={fieldSteps.length} />
        <AppText bold color={colors.muted}>
          {t('step_of').replace('{n}', String(fieldIndex + 1)).replace('{total}', String(fieldSteps.length))}
        </AppText>
        <Card style={styles.question}>
          <AppText size="big" bold color={colors.ink}>{pick(step.label, lang)}</AppText>
          <AppText size="heading">{pick(step.asks, lang)}</AppText>
        </Card>
        {runner.openLayers.where && card ? (
          <IdCard key={step.id} persona={runner.lesson.persona} side={card.side} highlight={card.highlight} />
        ) : null}
        {(step.glossary ?? []).map((gid) => {
          const term = GLOSSARY.find((g) => g.id === gid);
          return term ? (
            <BigButton key={gid} variant="calm" label={pick(term.term, lang)} onPress={() => uiBus.emit('jargon', gid)} />
          ) : null;
        })}
        {runner.oops ? (
          <OopsCard oops={runner.oops} onTryAgain={actions.dismissOops} onUndo={actions.undo} />
        ) : (
          <FieldInput step={step} value={runner.input} onChange={actions.setInput} highlighted={runner.highlightField === step.id} />
        )}
        <View style={styles.grid}>
          {LAYERS.map(([layer, key]) => (
            <View key={layer} style={styles.cell}>
              <BigButton variant={runner.openLayers[layer] ? 'calm' : 'secondary'} label={t(key)} onPress={() => actions.openLayer(layer)} />
            </View>
          ))}
        </View>
        {LAYERS.filter(([layer]) => runner.openLayers[layer]).map(([layer, key]) => (
          <Card key={layer} style={styles.panel}>
            <AppText bold color={colors.calmInk}>{t(key)}</AppText>
            <AppText size="heading">{pick(step[layer], lang)}</AppText>
            <AudioButton clipId={step.audio?.[layer]} />
          </Card>
        ))}
        <Row style={styles.gap}>
          <StuckButton onPress={actions.stuck} />
          {runner.canUndo ? <View style={styles.flex}><BigButton variant="secondary" label={t('undo')} onPress={actions.undo} /></View> : null}
        </Row>
      </>
    );
    bottom = <BigButton label={t('next')} onPress={actions.submit} />;
  } else {
    body = (
      <ReviewView answers={answers} highlightField={runner.highlightField} vagueError={runner.highlightField !== null}
        title={pick(step.label, lang)} buttonKey={step.kind === 'submit' ? 'submit' : 'next'} onSubmit={actions.submit} />
    );
  }

  return (
    <Screen top={showResult ? null : <Banner />} bottom={bottom}>
      {body}
      <HiccupSheet hiccup={runner.hiccup} onResolve={actions.resolveHiccup} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: { gap: 10 },
  question: { gap: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  cell: { flexBasis: '47%', flexGrow: 1 },
  panel: { gap: 8, backgroundColor: colors.calm, borderColor: colors.calmInk },
  gap: { gap: 12 },
  flex: { flex: 1 },
});
