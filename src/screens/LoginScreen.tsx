import { View } from "react-native";
import Text from "@/components/ui/Text";
import { useTheme } from "@/theme/ThemeProvider";
import Button from "@/components/ui/Button";
import { useAuth } from "@/auth/AuthProvider";

export default function LoginScreen() {

    const { colors } = useTheme();
    const { signIn } = useAuth();

    return (
        <View style={{width: '100%'}}>
            {/* BODY (default) */}
            <Text>
                This is default body text.
            </Text>

            <Button
                title="Login"
                onPress={() => {
                    console.log('Login Pressed and signIn called');
                    signIn();
                }}
            />
        </View>
    );
}