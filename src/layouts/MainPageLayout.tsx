import { View } from "react-native";
import { Slot } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/theme/tokens";

export default function MainPageLayout() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.md,
      }}
    >
      <Slot />
    </View>
  );
}