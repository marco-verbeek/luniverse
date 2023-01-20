import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import ChampionIconList from '../components/ChampionIconList';
import TextWithImage from '../components/TextWithImage';
import { PageType } from '../data/page-types';

export default function Play({ setPage, session, setSession }) {
  const [guessText, setGuessText] = useState(0);
  const [prevGuessText, setPrevGuessText] = useState(0);
  const [quoteSound, setQuoteSound] = useState();
  const [selectedIcon, setSelectedIcon] = useState(0);

  const playSound = async () => {
    if (!session?.quoteUrl) {
      return;
    }

    const { sound } = await Audio.Sound.createAsync({
      uri: session.quoteUrl,
    });
    setQuoteSound(sound);

    await sound.playAsync();
  };

  const onIconClick = (id) => {
    setSelectedIcon(id);
    setGuessText(id);
  };

  const submitGuess = async () => {
    if (!guessText || guessText === 0) {
      return;
    }

    const request = await fetch(
      `http://192.168.86.46:2999/sessions/${session.id}/guess`,
      {
        method: 'POST',
        body: JSON.stringify({ answer: JSON.stringify(guessText) }),
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const data = await request.json();
    setSession(data);

    if (session.mode === 'SessionMode.HARD' && !data.correct) {
      setPage(PageType.DEFEAT);
      return;
    }

    setPrevGuessText(guessText);
    setGuessText(0);
    setSelectedIcon(0);
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
      <View style={styles.textContainer}>
        <Text style={styles.textStreak}>Current streak: {session.streak}</Text>
        <Text style={styles.textPrevious}>
          {session.solution && (
            <View style={{ marginLeft: 12 }}>
              <Text>
                <TextWithImage
                  text="Guessed > "
                  textAfterImg={false}
                  imageSource={{
                    uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${prevGuessText}.png`,
                  }}
                />
                {' x '}
                <TextWithImage
                  text=" < Solution"
                  textAfterImg={true}
                  imageSource={{
                    uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${session.solution}.png`,
                  }}
                />
              </Text>
            </View>
          )}
        </Text>
        <Button label="PLAY QUOTE" onPress={playSound} />
      </View>

      <View style={styles.centeredContainer}>
        <ChampionIconList onPress={onIconClick} selectedIcon={selectedIcon} />
        <Button label="SUBMIT" onPress={submitGuess} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
  },
  textContainer: {
    marginTop: -50,
    marginBottom: -24,
    alignItems: 'center',
  },
  textStreak: {
    fontSize: 28,
  },
  textPrevious: {
    fontSize: 22,
  },
});
