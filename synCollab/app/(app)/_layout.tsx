import { Stack } from 'expo-router';
import { Alert, Pressable, Text } from 'react-native';
import { signOut } from '../../src/auth/AuthProvider';

const confirmSignOut = () => {
  Alert.alert('Sign out', 'Are you sure you want to sign out?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Sign out',
      style: 'destructive',
      onPress: async () => {
        const { error } = await signOut();
        if (error) Alert.alert('Sign out failed', error);
      },
    },
  ]);
};

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          headerRight: () => (
            <Pressable style={styles.button} onPress={confirmSignOut} hitSlop={8}>
              <Text style={styles.buttonText}>Sign out</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="task/[id]" options={{ title: 'Task' }} />
      <Stack.Screen name="settings" options={{ title: 'Dev Settings' }} />
    </Stack>
  );
}

const styles = {
  button: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
};
