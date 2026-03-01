import { ScrollView, View } from "react-native";
import { Slot } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/theme/tokens";

export default function MainPageLayout() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        padding: spacing.md,
      }}
    >
      <Slot />
    </ScrollView>
  );
}