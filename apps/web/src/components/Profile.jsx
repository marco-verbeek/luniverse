import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import './Profile.css';
import UserDetails from './UserDetails';

function Profile() {
  const { summonerName } = useParams();

  return (
    <Stack direction="column" spacing={2}>
      <UserDetails summonerName={summonerName} />
      {/*<Stack direction="row">
        <TopPlayedChampions/>
        <MatchHistory/>
      </Stack> */}
    </Stack>
  );
}

export default Profile;
