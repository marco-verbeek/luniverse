import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { PageType } from '../data/page-types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LuniLogo = require('../assets/adaptive-icon.png');

export default function Home({ setPage, setSession }) {
  const createSessionHard = () => {
    createSession('SessionMode.HARD');
  };

  const createSessionInfinite = () => {
    createSession('SessionMode.INFINITE');
  };

  const createSession = async (mode) => {
    const req = await fetch('http://192.168.86.46:2999/sessions', {
      method: 'POST',
      body: JSON.stringify({ mode }),
      headers: { 'Content-Type': 'application/json' },
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
        <Button label="HARD MODE" onPress={createSessionHard} />
        <Button label="INFINITE MODE" onPress={createSessionInfinite} />
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
