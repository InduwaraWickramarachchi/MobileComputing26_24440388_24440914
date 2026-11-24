import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="tasks" options={{ title: 'Tasks' }} />
      <Stack.Screen name="task/[id]" options={{ title: 'Task' }} />
      <Stack.Screen name="settings" options={{ title: 'Dev Settings' }} />
    </Stack>
  );
}
