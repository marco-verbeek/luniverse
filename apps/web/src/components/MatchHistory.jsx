import { Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Match from './Match';

function MatchHistory() {
  const { summonerName } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['matchHistory'],
    queryFn: () =>
      fetch(
        `http://localhost:80/analysis/players/${summonerName}/history`,
      ).then((res) => res.json()),
    keepPreviousData: true,
  });

  if (isLoading || error) {
    return <></>;
  }

  return (
    <Stack direction="column" spacing="12px" width="fill-available">
      <Typography
        variant="h5"
        display="flex"
        justifyContent="center"
        padding={1}
        border="1px solid #596680"
        borderRadius="5px"
      >
        Match History
      </Typography>
      {data.map((match) => (
        <Match match={match} />
      ))}
    </Stack>
  );
}
export default MatchHistory;
