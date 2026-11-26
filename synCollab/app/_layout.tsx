import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuthentication } from '../src/auth/AuthProvider';
import { migrate } from '../src/db/migrate';

export default function RootLayout() {
  const [dbReady, setDbReady] = useState(false);
  useEffect(() => {
    migrate().then(() => setDbReady(true));
  }, []);
  if (!dbReady) return <Loading />;

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { session, loading } = useAuthentication();
  if (loading) return <Loading />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

const Loading = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);
