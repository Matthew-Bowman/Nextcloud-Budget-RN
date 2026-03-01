import React from 'react';
import { ScrollView, View } from 'react-native';
import { spacing } from '@/theme/tokens';
import Text from '@/components/ui/Text';
import Input from '@/components/ui/Input';

export default function InputShowcaseScreen() {
  const [basic, setBasic] = React.useState('');
  const [withHint, setWithHint] = React.useState('');
  const [withError, setWithError] = React.useState('');
  const [disabledValue, setDisabledValue] = React.useState('Can’t edit me');
  const [email, setEmail] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [multiline, setMultiline] = React.useState('');
  const [long, setLong] = React.useState('');

  return (
    <View style={{ gap: spacing.lg }}>
      <Text variant="title">Input states</Text>

      {/* 1) Default with label */}
      <Input
        label="Default"
        placeholder="Type something…"
        value={basic}
        onChangeText={setBasic}
      />

      {/* 2) No label */}
      <Input
        placeholder="No label input…"
        value={long}
        onChangeText={setLong}
      />

      {/* 3) With hint */}
      <Input
        label="With hint"
        placeholder="https://cloud.example.com"
        hint="We’ll verify this server before signing in."
        autoCapitalize="none"
        value={withHint}
        onChangeText={setWithHint}
      />

      {/* 4) With error */}
      <Input
        label="With error"
        placeholder="Username"
        error="That username is not valid."
        autoCapitalize="none"
        value={withError}
        onChangeText={setWithError}
      />

      {/* 5) Disabled */}
      <Input
        label="Disabled"
        placeholder="Disabled"
        editable={false}
        value={disabledValue}
        onChangeText={setDisabledValue}
        hint="This field is disabled."
      />

      {/* 6) Email keyboard */}
      <Input
        label="Email"
        placeholder="name@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={setEmail}
      />

      {/* 7) URL keyboard */}
      <Input
        label="URL"
        placeholder="https://example.com"
        autoCapitalize="none"
        keyboardType="url"
        value={url}
        onChangeText={setUrl}
      />

      {/* 8) Numeric keyboard */}
      <Input
        label="Number"
        placeholder="123"
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      {/* 9) Password / secure */}
      <Input
        label="App password"
        placeholder="••••••••••"
        secureTextEntry
        autoCapitalize="none"
        textContentType="password"
        value={password}
        onChangeText={setPassword}
        hint="Generate this in Nextcloud: Settings → Security."
      />

      {/* 10) Multiline */}
      <Input
        label="Multiline"
        placeholder="Write a longer note…"
        multiline
        value={multiline}
        onChangeText={setMultiline}
        style={{
          height: 110,
          paddingTop: spacing.sm,
          textAlignVertical: 'top', // Android
        }}
        hint="Multiline uses the same component—just adjust height."
      />

      {/* 11) Container style example */}
      <Input
        label="Custom container spacing"
        placeholder="Container style demo"
        containerStyle={{ marginTop: spacing.md }}
      />
    </View>
  );
}