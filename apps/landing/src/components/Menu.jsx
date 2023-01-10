import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import './Menu.css';

export default function Menu() {
  return (
    <div className="menu">
      <Stack spacing={3} padding="0px 5vw">
        <Typography variant="h1" color="#ed6c02">
          Luniverse
        </Typography>

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
              sx={{
                input: {
                  color: '#ed6c02',
                  borderColor: '#ed6c02',
                },
                label: { color: '#ed6c02' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ed6c02',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ed6c02',
                  },
                },
              }}
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
