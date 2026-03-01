import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { AuthProvider, useAuth } from "@/auth/AuthProvider";

function AppContent() {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>

        <Stack.Protected guard={!!isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>


        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

      </Stack>
    </>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}