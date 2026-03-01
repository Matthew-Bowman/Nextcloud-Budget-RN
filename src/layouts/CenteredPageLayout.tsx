import { ScrollView, View } from "react-native";
import { Slot } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/theme/tokens";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function CenteredPageLayout() {
    const { colors } = useTheme();
    const { top, bottom, left, right } = useSafeAreaInsets();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background,
            }}
        >
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: spacing.md,
                }}
            >
                <Slot />
            </View>
        </SafeAreaView>
    );
}