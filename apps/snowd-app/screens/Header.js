import { Image, StyleSheet, View } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LuniLogo = require('../assets/adaptive-icon.png');

export default function Header() {
  return (
    <>
      <View style={styles.centeredContainer}>
        <Image source={LuniLogo} style={styles.image} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
  },
  image: {
    width: 256,
    height: 256,
  },
});
