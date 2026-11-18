import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Tasks' }} />
      <Stack.Screen name="task/new" options={{ title: 'New Task' }} />
      <Stack.Screen name="task/[id]/index" options={{ title: 'Task' }} />
      <Stack.Screen name="task/[id]/edit" options={{ title: 'Edit Task' }} />
      <Stack.Screen name="settings" options={{ title: 'Dev Settings' }} />
    </Stack>
  );
}
