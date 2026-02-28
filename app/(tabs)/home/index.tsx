import { View, Text, useColorScheme } from 'react-native';
import { useTheme } from '../../../src/Theme/ThemeProvider';

export default function Home() {

  const sysTheme = useColorScheme()
  const { theme, preference, setPreference, isLoading } = useTheme();

  return (
    <View>
      <Text>Theme - {theme}</Text>
      <Text>Preference - {preference}</Text>
      <Text>Is Loading - {isLoading ? 'True' : 'False'}</Text>
      <Text>System Theme - {sysTheme}</Text>
    </View>
  );
}