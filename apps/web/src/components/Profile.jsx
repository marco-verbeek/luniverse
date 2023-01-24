import { Stack } from '@mui/material';
import Header from './Header';
import MatchHistory from './MatchHistory';
import './Profile.css';
import TopPlayedChampions from './TopPlayedChampions';

function Profile() {
  return (
    <Stack direction="column" spacing={8} padding="24px">
      <Header />

      <Stack direction="row" spacing="12px">
        <TopPlayedChampions />
        <MatchHistory />
      </Stack>
    </Stack>
  );
}

export default Profile;
