import { Avatar, Stack, Typography } from '@mui/material';
import './Champion.css';

function Champion({ champion }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="rgba(89, 102, 128, 0.25)"
      borderRadius="5px"
      padding="12px 12px"
    >
      {/* Avatar */}
      <Stack direction="column">
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={champion.championIconURL}
        ></Avatar>
        <Typography variant="body2" width="fit-content" minWidth="100px">
          {champion.championName}
        </Typography>
      </Stack>
      {/* KDA */}
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography variant="body1">
          {((champion.kills + champion.assists) / champion.deaths).toFixed(2)}{' '}
          KDA
        </Typography>
        <Typography variant="body2">
          {champion.kills / champion.gamesPlayed} /{' '}
          {champion.deaths / champion.gamesPlayed} /{' '}
          {champion.assists / champion.gamesPlayed}
        </Typography>
      </Stack>
      {/* Stats */}
      <Stack direction="column" justifyContent="center" alignItems="flex-end">
        <Typography variant="body1">
          {(champion.gamesWon / champion.gamesPlayed) * 100}%
        </Typography>
        <Typography variant="body2">{champion.gamesPlayed} played</Typography>
      </Stack>
    </Stack>
  );
}

export default Champion;
