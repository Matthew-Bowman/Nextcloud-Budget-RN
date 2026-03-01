import { ScrollView, View } from "react-native";
import MainPageLayout from "@/layouts/MainPageLayout";
import Text from "@/components/ui/Text";
import { useTheme } from "@/theme/ThemeProvider";
import Button from "@/components/ui/Button";
import { useAuth } from "@/auth/AuthProvider";
import { spacing } from "@/theme/tokens";

export default function HomescreenScreen() {

    const { isLoggedIn, signOut } = useAuth()

    return (
        <View style={{gap: spacing.lg}}>
            <Text variant="title">{isLoggedIn ? "Logged In" : "Not Logged In"}</Text>

            <Button
                title="Logout"
                onPress={() => {
                    console.log('Login Pressed and signIn called');
                    signOut();
                }}
            />
        </View>
    );
}