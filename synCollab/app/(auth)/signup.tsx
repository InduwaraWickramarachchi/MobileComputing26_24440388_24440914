import { Link } from 'expo-router';
import { EnvelopeSimpleIcon, LockSimpleIcon, UserIcon } from 'phosphor-react-native';
import { StyleSheet, Pressable, Text, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import PrimaryTextInput from '../../src/components/PrimaryTextInput';
import { useState } from 'react';
import { signUp } from '../../src/auth/AuthProvider';
import { useHeaderHeight } from 'expo-router/build/react-navigation/index.js';
import { theme } from '../../src/constants/theme';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const headerHeight = useHeaderHeight();

  const handleSignup = async () => {
    if (!email.trim() || !password || !name.trim()) {
      Alert.alert('Sign Up Error', 'Please fill all fields.');
      return;
    }
    setLoading(true);
    const { error } = await signUp(name, email, password);
    setLoading(false);
    if (error) Alert.alert('Sign Up Error', error);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Let&apos;s Get Started</Text>
        <Text style={styles.captionText}>Please fill the details to create account</Text>
        <PrimaryTextInput
          value={name}
          onChangeText={setName}
          placeholder="Username"
          keyboardType="default"
          autoCapitalize="none"
          leftIcon={UserIcon}
        />
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
          onPress={handleSignup}
          disabled={loading}
          style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Link href="/login" style={styles.link}>
          Already have an account? Log in
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
