import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { PageType } from './data/page-types';
import Defeat from './screens/Defeat';
import Header from './screens/Header';
import Home from './screens/Home';
import Play from './screens/Play';

export default function App() {
  const [page, setPage] = useState(PageType.HOME);
  const [session, setSession] = useState(null);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Header />

        {page === PageType.HOME && (
          <Home setPage={setPage} setSession={setSession} />
        )}

        {page === PageType.PLAY && (
          <Play setPage={setPage} session={session} setSession={setSession} />
        )}

        {page === PageType.DEFEAT && (
          <Defeat setPage={setPage} session={session} />
        )}
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
});
