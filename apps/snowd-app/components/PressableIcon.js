import { Image, Pressable, View } from 'react-native';

export default function PressableIcon({ id, onPress }) {
  const onPressAction = () => {
    console.log('pressed', id);
    return onPress(id);
  };

  return (
    <View>
      <Pressable onPress={onPressAction}>
        <Image
          style={{ width: 64, height: 64, margin: 10 }}
          source={{
            uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${id}.png`,
          }}
        />
      </Pressable>
    </View>
  );
}
