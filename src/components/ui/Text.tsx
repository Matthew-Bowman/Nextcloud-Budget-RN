import React from "react";
import {
    Platform,
    Text as RNText,
    TextProps as RNTextProps,
    StyleSheet,
    TextStyle,
} from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export type TextVariant = "title" | "heading" | "subheading" | "body" | "caption";

export interface TextProps extends RNTextProps {
    variant?: TextVariant;
    muted?: boolean;
    color?: string;
}

const variantStyles: Record<TextVariant, TextStyle> = StyleSheet.create({
    body: {},

    subheading: {
        fontFamily: Platform.select({
            ios: 'Inter-SemiBold',
            android: 'Inter_600SemiBold',
        }),
    },

    heading: {
        fontSize: 24,

        fontFamily: Platform.select({
            ios: 'Inter-SemiBold',
            android: 'Inter_600SemiBold',
        }),

        lineHeight: 30,
    },

    title: {
        fontSize: 30,

        fontFamily: Platform.select({
            ios: 'Inter-Regular',
            android: 'Inter_400Regular',
        }),

        lineHeight: 36,
    },

    caption: {
        fontSize: 13,

        fontFamily: Platform.select({
            ios: 'Inter-Regular',
            android: 'Inter_400Regular',
        }),

        lineHeight: 18,
    },
});

const baseStyles = StyleSheet.create({
    base: {
        fontSize: 16,

        fontFamily: Platform.select({
            ios: 'Inter-Regular',
            android: 'Inter_400Regular',
        }),

        lineHeight: 22,
    },
});

export default function Text({
    variant = "body",
    muted = false,
    color,
    style,
    ...props
}: TextProps) {
    const { colors } = useTheme();

    const resolvedColor = color ?? (muted ? colors.mutedText : colors.mainText);

    return (
        <RNText
            {...props}
            style={[baseStyles.base, variantStyles[variant], { color: resolvedColor }, style]}
        />
    );
}