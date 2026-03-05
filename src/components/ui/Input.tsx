import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    StyleProp,
    ViewStyle,
    ActivityIndicator,
} from 'react-native';
import Text from './Text';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';

export type StatusType = 'idle' | 'loading' | 'success' | 'error';

type Props = TextInputProps & {
    label?: string;
    error?: string;
    hint?: string;
    status?: StatusType,
    containerStyle?: StyleProp<ViewStyle>;
};

export default function Input({
    label,
    error,
    hint,
    status = 'idle',
    containerStyle,
    style,
    editable = true,
    ...props
}: Props) {
    const { colors } = useTheme();
    const [focused, setFocused] = React.useState(false);

    const statusStyles = {
        success: {
            background: colors.success,
            foreground: colors.onSuccess,
            icon: 'checkmark',
        },
        error: {
            background: colors.danger,
            foreground: colors.onDanger,
            icon: 'close',
        },
        loading: {
            background: colors.warning,
            foreground: colors.onWarning,
            icon: 'remove',
        },
    } as const;

    const statusConfig =
        status !== 'idle' ? statusStyles[status] : undefined;

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

            <View style={{ position: 'relative', justifyContent: 'center' }}>
                <TextInput
                    {...props}
                    editable={editable}
                    style={[
                        styles.input,
                        {
                            borderColor,
                            backgroundColor: editable ? colors.surface : colors.decoration,
                            color: colors.mainText,
                            paddingRight: spacing.md * 2 + 10,
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

                {statusConfig && (
                    <View pointerEvents="none" style={styles.statusWrapper}>
                        <View
                            style={[
                                styles.statusBadge,
                                { backgroundColor: statusConfig.background },
                            ]}
                        >
                            <Ionicons
                                name={statusConfig.icon}
                                size={12}
                                color={statusConfig.foreground}
                            />
                        </View>
                    </View>
                )}
            </View>

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
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        padding: spacing.md,
        fontSize: 16,
    },
    statusWrapper: {
        position: 'absolute',
        right: spacing.md,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBadge: {
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
});