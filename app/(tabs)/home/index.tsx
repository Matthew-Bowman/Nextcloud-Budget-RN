import { View, Text, useColorScheme } from 'react-native';
import { useTheme } from '../../../src/Theme/ThemeProvider';

export default function Home() {

  const sysTheme = useColorScheme()
  const { theme, preference, isLoading, colors } = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Text style={{color: colors.mainText}}>Theme - {theme}</Text>
      <Text style={{color: colors.mainText}}>Preference - {preference}</Text>
      <Text style={{color: colors.mainText}}>Is Loading - {isLoading ? 'True' : 'False'}</Text>
      <Text style={{color: colors.mainText}}>System Theme - {sysTheme}</Text>
    </View>
  );
}