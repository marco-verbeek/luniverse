import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import './Menu.css';

export default function Menu() {
  return (
    <div className="menu">
      <Stack spacing={3} padding="0px 10vw">
        <Typography variant="h1">Luniverse</Typography>

        <Stack spacing={6}>
          <Stack spacing={2}>
            <Button size="large" variant="outlined" color="warning">
              Play Snowdown
            </Button>
            <Button size="large" variant="outlined" color="warning">
              Play Hilo
            </Button>
          </Stack>

          <Stack spacing={2}>
            <TextField
              label="Summoner Name"
              variant="outlined"
              color="warning"
            />
            <Button size="large" variant="outlined" color="warning">
              My rARAM
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
