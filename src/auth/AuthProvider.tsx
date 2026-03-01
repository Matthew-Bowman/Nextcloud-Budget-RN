import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

type AuthContextValue = {
    isLoggedIn: boolean;
    isLoading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
};

const KEY = "debug_isLoggedIn";

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const raw = await AsyncStorage.getItem(KEY);
                const value = raw === "1";
                if (!cancelled) setIsLoggedIn(value);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const signIn = async () => {
        setIsLoggedIn(true);
        await AsyncStorage.setItem(KEY, "1");
    };

    const signOut = async () => {
        setIsLoggedIn(false);
        await AsyncStorage.setItem(KEY, "0");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const context = React.useContext(AuthContext);

    if (!context)
        throw new Error('useAuth must be used inside AuthProvider');

    return context;
}