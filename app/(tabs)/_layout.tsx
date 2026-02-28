import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from '../../src/Theme/ThemeProvider';

export default function TabsLayout() {

    const { colors } = useTheme();

    return (

        <Tabs
            screenOptions={({ route }) => ({
                // Tab Bar
                tabBarActiveTintColor: colors.accent,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.decoration,
                },

                tabBarIcon: ({ color, size }) => {
                    let iconName: any;

                    switch (route.name) {
                        case 'home':
                            iconName = 'home';
                            break;
                        case 'settings':
                            iconName = 'settings';
                            break;
                        default:
                            iconName = 'help';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },

                // Header
                headerShown: true,

                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerShadowVisible: false,

                headerTitleStyle: {
                    color: colors.mainText
                }
            })}
        >
            <Tabs.Screen
                name="home"
                options={{ title: 'Home' }}
            />
            <Tabs.Screen
                name="settings"
                options={{ title: 'Settings' }}
            />
        </Tabs>
    );
}