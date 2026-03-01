import React from 'react';
import {
    Pressable,
    StyleSheet,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Text from './Text';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing } from '@/theme/tokens';

type Props = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
};

export default function Button({
    title,
    onPress,
    loading,
    disabled,
    style,
}: Props) {
    const { colors } = useTheme();
    const isDisabled = !!disabled || !!loading;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            style={({ pressed }) => [
                styles.base,
                {
                    backgroundColor: isDisabled
                        ? colors.disabled
                        : pressed
                            ? colors.accentDark
                            : colors.accent,
                },
                style,
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: !!loading }}
        >
            {loading ? (
                <ActivityIndicator color={colors.onAccent} />
            ) : (
                <Text variant="subheading" style={{
                    color: colors.onAccent,
                }}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        padding: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});