import { View, type ViewProps } from 'react-native';
import { useDir } from '../theme/useDir';

export function Row({ style, ...rest }: ViewProps) {
  const { row } = useDir();
  return <View {...rest} style={[{ flexDirection: row, alignItems: 'center' }, style]} />;
}
