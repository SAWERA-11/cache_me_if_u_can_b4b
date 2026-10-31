// Dev-only: render <Gallery /> from any screen to check every component at all three text levels.
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { colors } from '../theme/tokens';
import { LESSON1, useApp } from '../theme/wire';
import { AppText } from './AppText';
import { AudioButton } from './AudioButton';
import { Banner } from './Banner';
import { BigButton } from './BigButton';
import { IdCard } from './IdCard';
import { OopsCard } from './OopsCard';
import { Row } from './Row';
import { Sheet } from './Sheet';
import { StuckButton } from './StuckButton';

export function Gallery() {
  const level = useApp((s) => s.textLevel);
  const [open, setOpen] = useState(false);
  const noop = () => {};
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16, backgroundColor: colors.bg }}>
      <Row style={{ gap: 8 }}>
        {([0, 1, 2] as const).map((l) => (
          <View key={l} style={{ flex: 1 }}>
            <BigButton variant={l === level ? 'primary' : 'secondary'} label={String(20 + l * 4)}
              onPress={() => useApp.getState().set({ textLevel: l })} />
          </View>
        ))}
      </Row>
      <Banner />
      <AppText size="big" bold>Heading</AppText>
      <AppText>Body text sample for checking clipping at every size.</AppText>
      <BigButton label="Primary" onPress={noop} />
      <BigButton variant="secondary" label="Secondary" onPress={noop} />
      <BigButton variant="calm" label="Calm" onPress={noop} />
      <BigButton label="Disabled" disabled onPress={noop} />
      <AudioButton clipId="demo" />
      <StuckButton onPress={noop} />
      <IdCard persona={LESSON1.persona} highlight="name" />
      <OopsCard oops={{ consequence: { en: 'The page may ask again.', ur: '' }, fix: { en: 'Type it once more.', ur: '' } }}
        onTryAgain={noop} onUndo={noop} />
      <BigButton label="Open sheet" onPress={() => setOpen(true)} />
      <Sheet visible={open} onClose={() => setOpen(false)} title="Sheet title">
        <AppText>Sheet content</AppText>
      </Sheet>
    </ScrollView>
  );
}
