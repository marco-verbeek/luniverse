import { Avatar, Stack, Typography } from '@mui/material';
import PoroSnax from '../assets/images/poro-snax.png';
import './UserDetails.css';

function UserDetails() {
  return (
    <div className="userDetails">
      <Stack
        direction="row"
        spacing={3}
        bgcolor="rgba(89, 102, 128, 0.5)"
        padding="24px"
        borderRadius="5px"
        width="fit-content"
      >
        <Avatar
          sx={{ width: 96, height: 96 }}
          src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/3873.jpg"
        />
        <Stack direction="column" spacing={1}>
          <Typography variant="h4">ItsNexty</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={PoroSnax} />
            <Typography variant="h5">130 Snax</Typography>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default UserDetails;
