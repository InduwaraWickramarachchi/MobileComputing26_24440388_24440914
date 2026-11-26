import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Pressable, Text, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import PrimaryTextInput from '../../src/components/PrimaryTextInput';
import { EnvelopeSimpleIcon, LockSimpleIcon } from 'phosphor-react-native';
import { signIn } from '../../src/auth/AuthProvider';
import { useHeaderHeight } from 'expo-router/build/react-navigation/index.js';
import { theme } from '../../src/constants/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const headerHeight = useHeaderHeight();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      alert('Please enter both email and password.');
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) Alert.alert('Login Error', error);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Hey, Welcome Back</Text>

        <Text style={styles.captionText}>Please login to continue</Text>
        <PrimaryTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={EnvelopeSimpleIcon}
        />
        <PrimaryTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          leftIcon={LockSimpleIcon}
        />
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Link href="/signup" style={styles.link}>
          Don&apos;t have an account? Sign up
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: theme.fonts.size.title,
    color: theme.colors.text,
    fontWeight: theme.fonts.weight.semibold,
  },
  captionText: {
    fontSize: theme.fonts.size.caption,
    color: theme.colors.text,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  pressable: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  link: {
    marginTop: 10,
    color: '#007AFF',
  },
});
