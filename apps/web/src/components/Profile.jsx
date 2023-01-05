import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import './Profile.css';
import TopPlayedChampions from './TopPlayedChampions';
import UserDetails from './UserDetails';

function Profile() {
  const { summonerName } = useParams();

  return (
    <Stack direction="column" spacing={5} padding="24px">
      <UserDetails summonerName={summonerName} />
      {/*<Stack direction="row">*/}
      <TopPlayedChampions />
      {/* <MatchHistory/>
      </Stack>  */}
    </Stack>
  );
}

export default Profile;
