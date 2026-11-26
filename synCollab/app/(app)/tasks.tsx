// app/(app)/tasks.tsx
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { TaskCard } from '../../src/components/TaskCard';
import { PlusIcon } from 'phosphor-react-native';
import { theme } from '../../src/constants/theme';

export default function TasksScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>SynCollab Tasks</Text>
      {/* Sample TaskCard for development */}
      <TaskCard
        task={{
          id: '1312',
          title: 'Sample Task',
          description: 'This is a sample task.',
          priority: 'medium',
          status: 'pending',
          created_by: 'sample-user',
          client_updated_at: '2024-06-01T12:00:00Z',
          deleted: false,
          updated_at: null,
        }}
        onPress={() => {}}
      />
      <Pressable onPress={() => router.push('/task/new')} style={styles.plusButton}>
        <PlusIcon size={24} color={theme.colors.textWhite} weight="bold" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 100,
    padding: 16,
  },
});
