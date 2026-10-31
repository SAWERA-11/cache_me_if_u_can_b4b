import { Text, type TextProps } from 'react-native';
import { colors } from '../theme/tokens';
import { useDir } from '../theme/useDir';
import { useTextSize } from '../theme/useTextSize';

type Props = TextProps & { size?: 'body' | 'heading' | 'big'; bold?: boolean; color?: string };

export function AppText({ size = 'body', bold, color = colors.body, style, ...rest }: Props) {
  const { align, rtl } = useDir();
  const sizes = useTextSize();
  const fontSize = sizes[size];
  return (
    <Text
      {...rest}
      style={[
        {
          color, fontSize, lineHeight: Math.round(fontSize * (rtl ? 1.7 : 1.4)), textAlign: align,
          fontFamily: rtl ? (bold ? 'NotoNaskhArabic_700Bold' : 'NotoNaskhArabic_400Regular') : undefined,
          fontWeight: rtl ? undefined : bold ? '700' : '400',
        },
        style,
      ]}
    />
  );
}
