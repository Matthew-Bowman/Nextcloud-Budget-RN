import { Stack } from "expo-router";
import { useTheme } from "../../../src/Theme/ThemeProvider";

export default function HomeLayout() {

    const {colors} = useTheme();

    return (
        <Stack
            screenOptions={{
                title: 'Home',
                
                headerStyle: {
                    backgroundColor: colors.surface,
                },

                headerTitleStyle: {
                    color: colors.mainText
                }
                 
            }}
        />
    );
}