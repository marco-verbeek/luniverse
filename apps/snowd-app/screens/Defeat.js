import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { PageType } from './page-types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LuniLogo = require('../assets/adaptive-icon.png');

export default function Defeat({ setPage, session }) {
  return (
    <>
      <View style={styles.centeredContainer}>
        <Image source={LuniLogo} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Your current streak was {session.streak}
        </Text>
        <Text style={styles.text}>The answer was {session.solution}</Text>
      </View>

      <View style={styles.backButton}>
        <Button label="BACK" onPress={() => setPage(PageType.HOME)} />
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
  textContainer: {
    marginTop: -50,
  },
  text: {
    fontSize: 28,
  },
  backButton: {
    marginTop: 40,
  },
});
