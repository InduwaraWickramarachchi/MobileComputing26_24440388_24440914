// app/(app)/tasks.tsx
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function TasksScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Tasks</Text>
      <Link href="/settings">Go to settings</Link>
    </View>
  );
}
