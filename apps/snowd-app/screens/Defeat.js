import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { PageType } from '../data/page-types';

export default function Defeat({ setPage, session }) {
  return (
    <>
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
