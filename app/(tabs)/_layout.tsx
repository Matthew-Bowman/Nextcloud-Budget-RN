import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/build/native-tabs';

export default function TabsLayout() {

    // return (
    //     <NativeTabs>
    //         <NativeTabs.Trigger name="home">
    //             <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
    //             <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
    //         </NativeTabs.Trigger>
    //         <NativeTabs.Trigger name="settings">
    //             <NativeTabs.Trigger.Icon sf="gear" md="settings" />
    //             <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
    //         </NativeTabs.Trigger>
    //     </NativeTabs>
    // );

    return (
        <Tabs
            screenOptions={({ route }) => ({
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

                headerShown: false,
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