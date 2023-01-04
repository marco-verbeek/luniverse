import { Avatar, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import PoroSnax from '../assets/images/poro-snax.png';
import './UserDetails.css';

function UserDetails({ summonerName }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () =>
      fetch(`http://localhost:80/auth/users/${summonerName}/profile`).then(
        (res) => res.json(),
      ),
    keepPreviousData: true,
  });

  if (isLoading || error) {
    return <></>;
  }

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
        <Avatar sx={{ width: 96, height: 96 }} src={data.iconURL} />
        <Stack direction="column" spacing={1}>
          <Typography variant="h4">{data.name}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <div className="avatar">
              <Avatar src={PoroSnax} />
              {/* TODO: data.level */}
            </div>
            <Typography variant="h5">130 Snax</Typography>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default UserDetails;
