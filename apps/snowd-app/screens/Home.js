import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { PageType } from '../data/page-types';

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
  textContainer: {
    marginTop: -50,
  },
  text: {
    fontSize: 28,
  },
});
