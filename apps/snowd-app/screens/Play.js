import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '../components/Button';
import { PageType } from './page-types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LuniLogo = require('../assets/adaptive-icon.png');

export default function Play({ setPage, session, setSession }) {
  const [guessText, setGuessText] = useState('');
  const [quoteSound, setQuoteSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync({
      uri: session.data.quoteUrl,
    });
    setQuoteSound(sound);

    await sound.playAsync();
  };

  const submitGuess = async () => {
    const request = await fetch(
      `http://192.168.86.46:2999/sessions/${session.id}/guess`,
      {
        method: 'POST',
        body: JSON.stringify({ answer: guessText.trim() }),
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const data = await request.json();
    if (!data.correct) {
      setPage(PageType.HOME);
      return;
    }

    setSession(data);
    setGuessText('');
  };

  // Unload the sound once finished.
  useEffect(() => {
    return quoteSound
      ? () => {
          quoteSound.unloadAsync();
        }
      : undefined;
  }, [quoteSound]);

  // Play the session's quote upon session update.
  useEffect(() => {
    playSound();
  }, [session]);

  return (
    <>
      <View style={styles.centeredContainer}>
        <Image source={LuniLogo} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Current streak: {session.streak}</Text>
      </View>

      <View>
        <Button label="PLAY QUOTE" onPress={playSound} />
      </View>

      <View style={styles.centeredContainer}>
        <TextInput
          onChangeText={setGuessText}
          value={guessText}
          placeholder="Champion name"
        />
        <Button label="SUBMIT" onPress={submitGuess} />
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
});
