import { Stack } from '@mui/material';
import Header from './components/Header';
import Profile from './components/Profile';

function App() {
  return (
    <Stack direction="column" spacing={4} bgcolor="#0a2647" height="100%">
      <Header />
      <Profile />
    </Stack>
  );
}

export default App;
