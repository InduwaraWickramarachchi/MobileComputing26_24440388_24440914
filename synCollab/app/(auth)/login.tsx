import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Login() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <Link href="/signup" style={{ marginTop: 20 }}>
        Don't have an account? Sign up
      </Link>
    </View>
  );
}
