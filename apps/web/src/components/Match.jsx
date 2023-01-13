import { Avatar, Stack, Typography } from '@mui/material';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import './Match.css';

function Match({ match }) {
  const { summonerName } = useParams();
  const isVictory = match.win;
  const playedAgoTime = moment(match.gameCreation).fromNow();
  const gameDuration = moment.utc(match.gameDuration * 1000).format('mm:ss');
  const currentSummonerGame = match.players.find(
    (match) => match.summonerName === summonerName,
  );

  const kda = console.log(match);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor={
        isVictory ? 'rgba(104, 204, 144, 0.5)' : 'rgba(171, 95, 84, 0.5)'
      }
      borderRadius="5px"
      padding="0px 12px"
    >
      {/* Avatar */}
      <Stack direction="column" spacing="4px" marginTop="15px">
        <Typography
          variant="body2"
          borderBottom="1px solid #596680"
          color="rgba(255, 255, 255, 0.6)"
        >
          {playedAgoTime}
        </Typography>
        <Stack direction="column">
          <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
            {match.win ? 'Victory' : 'Defeat'}
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
            {gameDuration}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row">
        {/* Champion Icon - level */}
        <Stack direction="column">
          <Avatar
            variant="square"
            sx={{ width: 32, height: 32 }}
            src={currentSummonerGame.championIconURL}
          ></Avatar>
          <Typography className="championLevel" variant="body2">
            {currentSummonerGame.championLevel}
          </Typography>
        </Stack>
        {/* Champion KDA */}
        <Stack direction="column">
          <Typography variant="body1">
            {currentSummonerGame.kills} / {currentSummonerGame.deaths} /{' '}
            {currentSummonerGame.assists}
          </Typography>
          <Typography variant="body2">
            {currentSummonerGame.kills +
              currentSummonerGame.assists / currentSummonerGame.deaths}{' '}
            KDA
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Match;
