import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Text from './Text';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing } from '@/theme/tokens';

type Props = TextInputProps & {
    label?: string;
    error?: string;
    hint?: string;
    containerStyle?: StyleProp<ViewStyle>;
};

export default function Input({
    label,
    error,
    hint,
    containerStyle,
    style,
    editable = true,
    ...props
}: Props) {
    const { colors } = useTheme();
    const [focused, setFocused] = React.useState(false);

    const borderColor = error
        ? colors.danger
        : focused
            ? colors.accent
            : colors.decoration;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text variant="caption" style={{ color: colors.mutedText }}>
                    {label}
                </Text>
            )}

            <TextInput
                {...props}
                editable={editable}
                style={[
                    styles.input,
                    {
                        borderColor,
                        backgroundColor: editable ? colors.surface : colors.decoration,
                        color: colors.mainText,
                    },
                    style,
                ]}
                placeholderTextColor={colors.mutedText}
                onFocus={(e) => {
                    setFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                    props.onBlur?.(e);
                }}
            />

            {error ? (
                <Text variant="caption" style={{
                    color: colors.danger,
                }}>
                    {error}
                </Text>
            ) : hint ? (
                <Text variant="caption" style={{ color: colors.mutedText }}>
                    {hint}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.xs,
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        padding: spacing.md,
        fontSize: 16,
    },
});