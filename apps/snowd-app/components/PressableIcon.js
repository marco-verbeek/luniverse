import { Image, Pressable, StyleSheet, View } from 'react-native';

export default function PressableIcon({ id, onPress, isSelected }) {
  return (
    <View>
      <Pressable onPress={() => onPress(id)}>
        <Image
          style={[styles.container, isSelected ? styles.selectedBorder : {}]}
          source={{
            uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${id}.png`,
          }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    margin: 10,
  },
  selectedBorder: {
    borderColor: '#85A1F2',
    borderWidth: 2,
  },
});
