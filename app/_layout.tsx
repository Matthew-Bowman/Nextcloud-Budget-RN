import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style='dark' />
        <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}