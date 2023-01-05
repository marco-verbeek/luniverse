import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Champion from './Champion';

function TopPlayedChampions() {
  const { summonerName } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['topPlayedChampions'],
    queryFn: () =>
      fetch(`http://localhost:80/stats/players/${summonerName}/champions`).then(
        (res) => res.json(),
      ),
    keepPreviousData: true,
  });

  if (isLoading || error) {
    return <></>;
  }

  // console.log(data);

  return (
    <Stack direction="column" spacing="12px" width="40%">
      <Typography
        variant="h5"
        display="flex"
        justifyContent="center"
        padding={1}
        border="1px solid #596680"
        borderRadius="5px"
      >
        Top Played Champions
      </Typography>

      {data.map((champion) => (
        <Champion champion={champion} />
      ))}
    </Stack>
  );
}

export default TopPlayedChampions;
