import { Stack, Typography } from '@mui/material';
import './Header.css';

function Header() {
  return (
    <Stack className="header" alignItems="center">
      <Typography variant="h2">Luniverse</Typography>
      <Typography variant="h4">rARAM</Typography>
    </Stack>
  );
}

export default Header;
