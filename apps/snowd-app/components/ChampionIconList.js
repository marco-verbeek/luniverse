import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import PressableIcon from './PressableIcon';

const DATA = [{ id: 150 }, { id: 266 }];

export default function ChampionIconList({ onPress }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <PressableIcon id={item.id} key={item.id} onPress={onPress} />
        )}
        horizontal={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    maxHeight: '40%',
  },
});
