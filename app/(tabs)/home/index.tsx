import { View, Text, useColorScheme } from 'react-native';
import { useTheme } from '../../../src/Theme/ThemeProvider';

export default function Home() {

  const sysTheme = useColorScheme()
  const { theme, preference, setPreference, isLoading } = useTheme();

  return (
    <View>
      <Text>Home Screen - {theme}</Text>
      <Text>Home Screen - {preference}</Text>
      <Text>Home Screen - {isLoading ? 'True' : 'False'}</Text>
      <Text>Home Screen - {sysTheme}</Text>
    </View>
  );
}