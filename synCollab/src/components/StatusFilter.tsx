import { StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { theme } from '../constants/theme';
import { TaskStatus } from '../types/types';

const OPTIONS: { label: string; value?: TaskStatus }[] = [
  { label: 'All', value: undefined },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
];

export function StatusFilter({
  value,
  onChange,
}: {
  value?: TaskStatus;
  onChange: (v?: TaskStatus) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}
    >
      {OPTIONS.map(opt => {
        const selected = value === opt.value;
        return (
          <Pressable
            key={opt.label}
            onPress={() => onChange(opt.value)}
            style={({ pressed }) => [
              styles.chip,
              selected && styles.chipSelected,
              pressed && !selected && styles.chipPressed,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected }}
          >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  row: {
    gap: 8,
    paddingVertical: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    backgroundColor: theme.backgrounds.white,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipPressed: {
    backgroundColor: theme.backgrounds.lightGray,
  },
  chipText: {
    fontSize: theme.fonts.size.caption,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.darkLight,
  },
  chipTextSelected: {
    color: theme.colors.textWhite,
  },
});
