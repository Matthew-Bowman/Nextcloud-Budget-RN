import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors, ColorTokens } from '@/theme/tokens';

type ThemePreference = "system" | "light" | "dark";
type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme,
    preference: ThemePreference,
    setPreference: (value: ThemePreference) => void;
    isLoading: boolean;
    colors: ColorTokens;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "theme.preference";

export function ThemeProvider({ children }: { children: React.ReactNode }) {

    const systemTheme = useColorScheme();

    const [preference, setPreferenceState] = useState<ThemePreference>("system");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            if (saved === "system" || saved === "light" || saved === "dark") {
                setPreferenceState(saved);
            }

            setIsLoading(false);
        })();
    }, []);

    const theme: Theme = preference === "system" ? systemTheme === "dark" ? "dark" : "light" : preference;

    const setPreference = async (value: ThemePreference) => {
        setPreferenceState(value);
        await AsyncStorage.setItem(STORAGE_KEY, value);
    }

    const value = useMemo(
        () => ({ theme, preference, setPreference, isLoading, colors: colors[theme] }),
        [theme, preference, isLoading]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider")
    }

    return context;
}