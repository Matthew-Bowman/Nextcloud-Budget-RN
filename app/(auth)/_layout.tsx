import { Stack } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import Text from '@/components/ui/Text';

export default function AuthLayout() {

    const { colors } = useTheme();

    return (

        <Stack
            screenOptions={() => ({
                // Header
                headerShown: true,

                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerShadowVisible: false,

                headerTitle: ({ children }) => (
                    <Text variant='heading'>
                        {children}
                    </Text>
                ),
            })}
        >

            <Stack.Screen
                name='login'
                options={{ title: 'Login' }}
            />

        </Stack>
    );
}