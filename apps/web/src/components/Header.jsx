import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import './Header.css';
import UserDetails from './UserDetails';

function Header() {
  const { summonerName } = useParams();

  return (
    <Stack padding="24px" paddingBottom="0" direction="row" justifyContent="center">
      <Stack position="absolute" left="24px">
        <UserDetails summonerName={summonerName} />
      </Stack>
      
      <Stack>
        <Typography variant="h2">Luniverse</Typography>
        <Typography variant="h4">rARAM</Typography> 
      </Stack>
    </Stack>
  );
}

export default Header;
