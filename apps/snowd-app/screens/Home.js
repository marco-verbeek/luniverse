import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { PageType } from './page-types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LuniLogo = require('../assets/adaptive-icon.png');

export default function Home({ setPage, setSession }) {
  const createSession = async () => {
    const req = await fetch('http://192.168.86.46:2999/sessions', {
      method: 'POST',
    });

    const session = await req.json();
    setSession(session);

    setPage(PageType.PLAY);
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={LuniLogo} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Snowdown</Text>
      </View>

      <View>
        <Button label="PLAY" onPress={createSession} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
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
});
