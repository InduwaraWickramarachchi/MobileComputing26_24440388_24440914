import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function TaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Task {id}</Text>
    </View>
  );
}
