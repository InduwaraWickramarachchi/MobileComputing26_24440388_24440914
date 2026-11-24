import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Signup() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign up</Text>
      <Link href="/login" style={{ marginTop: 20 }}>
        Already have an account? Log in
      </Link>
    </View>
  );
}
