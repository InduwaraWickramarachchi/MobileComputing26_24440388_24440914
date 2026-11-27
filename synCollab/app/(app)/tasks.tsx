import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import { router } from 'expo-router';
import { TaskCard } from '../../src/components/TaskCard';
import { PlusIcon } from 'phosphor-react-native';
import { theme } from '../../src/constants/theme';
import { useMemo, useState } from 'react';
import { Task, TaskStatus } from '../../src/types/types';
import { StatusFilter } from '../../src/components/StatusFilter';

// Sample data for development — replace with tasks loaded from SQLite later.
const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design login screen',
    description: 'Inputs, button and sign-up link.',
    priority: 'high',
    status: 'completed',
    created_by: 'sample-user',
    client_updated_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-20T10:00:00Z',
    deleted: false,
  },
  {
    id: '2',
    title: 'Build task list',
    description: 'FlatList with TaskCard and a status filter.',
    priority: 'medium',
    status: 'in_progress',
    created_by: 'sample-user',
    client_updated_at: '2026-11-26T09:00:00Z',
    updated_at: '2026-11-25T09:00:00Z',
    deleted: false,
  },
  {
    id: '3',
    title: 'Offline sync',
    description: 'Push local changes to Supabase when back online.',
    priority: 'high',
    status: 'pending',
    created_by: 'sample-user',
    client_updated_at: '2026-11-26T12:00:00Z',
    updated_at: null,
    deleted: false,
  },
  {
    id: '4',
    title: 'Write README',
    description: null,
    priority: 'low',
    status: 'pending',
    created_by: 'sample-user',
    client_updated_at: '2026-11-24T08:00:00Z',
    updated_at: '2026-11-24T08:00:00Z',
    deleted: false,
  },
  {
    id: '5',
    title: 'Deleted task (should be hidden)',
    description: null,
    priority: 'low',
    status: 'pending',
    created_by: 'sample-user',
    client_updated_at: '2026-11-22T08:00:00Z',
    updated_at: '2026-11-22T08:00:00Z',
    deleted: true,
  },
];

export default function TasksScreen() {
  // Held in state so it can later be replaced by data loaded from the database.
  const [tasks] = useState<Task[]>(SAMPLE_TASKS);
  const [status, setStatus] = useState<TaskStatus | undefined>(undefined);

  const visibleTasks = useMemo(
    () => tasks.filter(t => !t.deleted && (!status || t.status === status)),
    [tasks, status],
  );

  return (
    <View style={styles.container}>
      <StatusFilter value={status} onChange={setStatus} />
      <FlatList
        data={visibleTasks}
        keyExtractor={t => t.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onPress={t => router.push(`/task/${t.id}`)} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tasks in this status.</Text>}
        contentContainerStyle={styles.listContent}
      />
      <Pressable
        onPress={() => router.push('/task/new')}
        style={({ pressed }) => [styles.plusButton, pressed && { opacity: 0.8 }]}
        accessibilityRole="button"
        accessibilityLabel="Add task"
      >
        <PlusIcon size={24} color={theme.colors.textWhite} weight="bold" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: theme.backgrounds.lightGray,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 120,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: theme.colors.textLight,
    fontSize: theme.fonts.size.caption,
  },
  plusButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
