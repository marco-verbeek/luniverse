import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Champions } from '../data/champions';
import PressableIcon from './PressableIcon';

export default function ChampionIconList({ onPress, selectedIcon }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.values(Champions)}
        renderItem={(data) => (
          <PressableIcon
            id={data.item}
            key={data.item}
            onPress={onPress}
            isSelected={selectedIcon === data.item}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        numColumns={4}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    maxHeight: '56%',
  },
});
