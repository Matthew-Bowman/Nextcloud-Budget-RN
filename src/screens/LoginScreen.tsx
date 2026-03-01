import { Alert, StyleSheet, View } from "react-native";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { spacing } from "@/theme/tokens";
import { useState } from "react";
import Text from "@/components/ui/Text";
import { useAuth } from "@/auth/AuthProvider";

type FormState = {
    host: string;
    username: string;
    appPassword: string;
};

export default function LoginScreen() {

    const { signIn } = useAuth();

    const [form, setForm] = useState<FormState>({
        host: '',
        username: '',
        appPassword: '',
    });

    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [loading, setLoading] = useState(false);

    const setField = (key: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const normalizeHost = (raw: string) => {
        const trimmed = raw.trim();
        if (!trimmed) return '';
        // assume https:// if missing
        if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
        // Strip trailing slash for consistency
        return trimmed.replace(/\/+$/, '');
    };

    const validate = () => {
        const next: Partial<FormState> = {};
        const host = normalizeHost(form.host);

        if (!host) next.host = 'Nextcloud server host is required.';
        else {
            try {
                console.log(new URL(host));
                new URL(host);
            } catch {
                next.host = 'Please enter a valid URL (e.g. https://cloud.example.com).';
            }
        }

        if (!form.username.trim()) next.username = 'Username is required.';
        if (!form.appPassword.trim()) next.appPassword = 'App password is required.';

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const onSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            const payload = {
                host: normalizeHost(form.host),
                username: form.username.trim(),
                appPassword: form.appPassword,
            };

            // TODO: Replace with real auth / connectivity check.
            await new Promise((r) => setTimeout(r, 500));

            Alert.alert('Submitted', JSON.stringify(payload, null, 2));
            signIn();
        } finally {
            setLoading(false);
        }
    };

    const isDisabled =
        loading ||
        !form.host.trim() ||
        !form.username.trim() ||
        !form.appPassword.trim();

    return (
        <View style={styles.container}>
            <Text variant="title">Account Login</Text>
            <Input
                label="Nextcloud Server Host"
                placeholder="https://cloud.example.com"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                textContentType="URL"
                value={form.host}
                onChangeText={(t) => setField('host', t)}
                error={errors.host}
                hint="Include https:// (we’ll add it if you don’t)."
                returnKeyType="next"
            />

            <Input
                label="Username"
                placeholder="jane.doe"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="username"
                value={form.username}
                onChangeText={(t) => setField('username', t)}
                error={errors.username}
                returnKeyType="next"
            />

            <Input
                label="App Password"
                placeholder="••••••••••••••••"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                textContentType="password"
                value={form.appPassword}
                onChangeText={(t) => setField('appPassword', t)}
                error={errors.appPassword}
                returnKeyType="done"
                onSubmitEditing={onSubmit}
            />

            <Button
                title={'Connect'}
                onPress={onSubmit}
                loading={loading}
                disabled={isDisabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: spacing.md,
    },
});