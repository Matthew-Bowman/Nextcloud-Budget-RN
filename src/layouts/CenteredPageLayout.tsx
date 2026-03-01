import { ScrollView, View } from "react-native";
import { Slot } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/theme/tokens";

export default function CenteredPageLayout() {
    const { colors } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.background,
                padding: spacing.md,
            }}
        >
            <Slot />
        </View>
    );
}