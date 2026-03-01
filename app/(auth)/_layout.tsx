import { Stack } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';

export default function AuthLayout() {

    return (

        <Stack
            screenOptions={() => ({
                headerShown: false,
            })}
        />
    );
}