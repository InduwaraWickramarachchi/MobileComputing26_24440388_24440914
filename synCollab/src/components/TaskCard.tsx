import { CloudSlashIcon } from 'phosphor-react-native';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import { Task, TaskPriority, TaskStatus } from '../types/types';

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export const isUnsynced = (task: Task) =>
  task.updated_at === null || task.client_updated_at > task.updated_at;

type TaskCardProps = {
  task: Task;
  onPress: (task: Task) => void;
};

function TaskCardBase({ task, onPress }: TaskCardProps) {
  const priorityColor = theme.statusColors.priority[task.priority];
  const statusColor = theme.statusColors.taskStatus[task.status];
  const unsynced = isUnsynced(task);
  const completed = task.status === 'completed';

  return (
    <Pressable
      onPress={() => onPress(task)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${task.title}, ${PRIORITY_LABEL[task.priority]} priority, ${STATUS_LABEL[task.status]}${unsynced ? ', not synced' : ''}`}
    >
      <View style={[styles.priorityStrip, { backgroundColor: priorityColor }]} />

      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={[styles.title, completed && styles.titleCompleted]} numberOfLines={1}>
            {task.title}
          </Text>
          <View style={[styles.badge, { backgroundColor: priorityColor + '22' }]}>
            <Text style={[styles.badgeText, { color: priorityColor }]}>
              {PRIORITY_LABEL[task.priority]}
            </Text>
          </View>
        </View>

        {!!task.description && (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.row}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={styles.status}>{STATUS_LABEL[task.status]}</Text>
          </View>

          {unsynced && (
            <View style={styles.row}>
              <CloudSlashIcon size={14} color={theme.colors.rose} />
              <Text style={styles.notSynced}>Not synced</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

// memo: avoids re-rendering every card when the list re-renders.
export const TaskCard = memo(TaskCardBase);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.backgrounds.white,
    borderRadius: theme.radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray,
    marginBottom: 12,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.7,
  },
  priorityStrip: {
    width: 4,
  },
  body: {
    flex: 1,
    padding: 14,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: theme.fonts.size.body,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.textLight,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.radius.xxs,
  },
  badgeText: {
    fontSize: theme.fonts.size.small,
    fontWeight: theme.fonts.weight.semibold,
  },
  description: {
    fontSize: theme.fonts.size.caption,
    color: theme.colors.darkLight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  status: {
    fontSize: theme.fonts.size.small,
    color: theme.colors.darkLight,
  },
  notSynced: {
    fontSize: theme.fonts.size.small,
    color: theme.colors.rose,
  },
});
