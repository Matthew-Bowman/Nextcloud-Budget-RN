import { Alert, StyleSheet, View } from "react-native";
import Button from "@/components/ui/Button";
import Input, { StatusType } from "@/components/ui/Input";
import { spacing } from "@/theme/tokens";
import { useState } from "react";
import Text from "@/components/ui/Text";
import { useAuth } from "@/auth/AuthProvider";
import { Auth, Server } from "@/features/nextcloud";
import { useFormValidation } from "@/hooks/useFormValidation";
import { HttpError } from "@/core/http/client";

type FormState = {
    host: string;
};

export default function LoginScreen() {

    const { signIn } = useAuth();

    const [form, setForm] = useState<FormState>({
        host: '',
    });

    const [hostStatus, setHostStatus] = useState<StatusType>();
    const [loading, setLoading] = useState(false);

    const setField = (key: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        clearError(key)
    };

    const { errors, validateField, validateAll, clearError } =
        useFormValidation(form, {
            host: {
                sync: Server.validateHostFormat,
                async: async (v: string) => {
                    const normalised = Server.normaliseHost(v)
                    if (!normalised) return "Nextcloud server host is required."

                    try {
                        await Server.getServerStatus(normalised)
                        return undefined
                    } catch {
                        return "Could not reach a valid Nextcloud server at this URL."
                    }
                },
            },
        });

    const onHostBlur = async () => {
        setHostStatus("loading")
        const ok = await validateField("host")
        setHostStatus(ok ? "success" : "error")
    }

    const onSubmit = async () => {
        setLoading(true);
        setHostStatus('loading');

        // Validate
        const validForm = await validateAll()
        if (!validForm) {
            setLoading(false);
            setHostStatus('error');
            return;
        }

        // Had to validate to please TSC
        const normalisedHost = Server.normaliseHost(form.host);
        if (typeof normalisedHost !== 'string') {
            setLoading(false);
            setHostStatus('error');
            return;
        }

        try {
            const payload = { host: normalisedHost };

            // Get Login URL
            const authResponse = await Auth.startLoginV2(normalisedHost);

            // Simulate processing
            await new Promise((r) => setTimeout(r, 5000));

            // Success
            Alert.alert('Submitted', JSON.stringify(payload, null, 2));
            signIn();
        } catch (err: unknown) {
            if (err instanceof TypeError) {
                // Network-level issues (DNS, TLS, offline, CORS)
                Alert.alert(
                    'Network Error',
                    'Unable to reach the server. Please check your internet connection or server address.'
                );
            } else if (err instanceof HttpError) {
                // Server responded with non-2xx
                Alert.alert(
                    `Server Error (${err.status})`,
                    `The server responded with an error:\n${JSON.stringify(err.body) || 'Unknown error'}`
                );
            } else if (err instanceof Error) {
                // JSON parse errors or validation errors (includes invalid LoginV2Response)
                Alert.alert(
                    'Unexpected Response',
                    err.message || 'The server returned an unexpected response.'
                );
            } else {
                // Fallback for unknown types
                Alert.alert('Unknown Error', 'An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const isDisabled =
        loading ||
        !form.host.trim()

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
                onBlur={onHostBlur}
                status={hostStatus}
                error={errors.host}
                hint="Include https:// (we'll add it if you don't)."
                returnKeyType="next"
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