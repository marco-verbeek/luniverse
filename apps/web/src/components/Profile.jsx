import { Stack } from '@mui/material';
import './Profile.css';
import UserDetails from './UserDetails';

function Profile() {
  return (
    <Stack direction="column" spacing={2}>
      <UserDetails />
      {/*<Stack direction="row">
        <TopPlayedChampions/>
        <MatchHistory/>
      </Stack> */}
    </Stack>
  );
}

export default Profile;
