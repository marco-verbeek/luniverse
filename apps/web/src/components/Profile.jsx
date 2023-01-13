import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import MatchHistory from './MatchHistory';
import './Profile.css';
import TopPlayedChampions from './TopPlayedChampions';
import UserDetails from './UserDetails';

function Profile() {
  const { summonerName } = useParams();

  return (
    <Stack direction="column" spacing={5} padding="24px">
      <UserDetails summonerName={summonerName} />
      <Stack direction="row" spacing="12px">
        <TopPlayedChampions />
        <MatchHistory />
      </Stack>
    </Stack>
  );
}

export default Profile;
