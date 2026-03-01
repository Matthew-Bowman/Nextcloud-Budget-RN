import { View } from "react-native";
import { Slot } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";

export default function MainPageLayout() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
      }}
    >
      <Slot />
    </View>
  );
}