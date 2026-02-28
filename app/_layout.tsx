import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from '../src/Theme/ThemeProvider';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>

        <StatusBar style='dark' />
        <Stack screenOptions={{ headerShown: false }} />
      
      </ThemeProvider>
    </SafeAreaProvider>
  );
}