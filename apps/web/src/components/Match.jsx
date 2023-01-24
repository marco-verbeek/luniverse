import { Avatar, Stack, Typography } from '@mui/material';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import PoroSnax from '../assets/images/poro-snax.png';
import './Match.css';


function Match({ match }) {
  const { summonerName } = useParams();
  const isVictory = match.win;
  const playedAgoTime = moment(match.gameCreation).fromNow();
  const gameDuration = moment.utc(match.gameDuration * 1000).format('mm:ss');
  const currentSummonerGame = match.players.find(
    (match) => match.summonerName === summonerName,
  );
  
  const kda = Math.round((currentSummonerGame.kills +
  currentSummonerGame.assists / currentSummonerGame.deaths) *100) /100;
  
  const teamOne = match.players.slice(0, 5);
  const teamTwo = match.players.slice(5, 10);
  
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor={
        isVictory ? 'rgba(104, 204, 144, 0.5)' : 'rgba(171, 95, 84, 0.5)'
      }
      borderRadius="5px"
      padding="8px 12px"
    >
      {/* Time */}
      <Stack direction="column" spacing="4px" marginTop="15px">
        <Typography
          variant="body2"
          borderBottom="1px solid #596680"
          color="rgba(255, 255, 255, 0.6)"
          paddingBottom="4px"
          textTransform={"capitalize"}
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
      
      {/* Champion */}
      <Stack direction="row" spacing="12px">
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
            {kda} KDA
          </Typography>
        </Stack>
      </Stack>
      
      {/* Poro Snax */}
      <Stack direction="row" alignItems="center" spacing="8px">
      <Avatar sx={{ width: 32, height: 32 }} src={PoroSnax} />
      <Typography variant="h6">{currentSummonerGame.snaxGain}</Typography>
      </Stack>
      
      {/* Players */}
      <Stack direction="row" spacing="24px">
        <Stack spacing="4px">
        {teamOne.map((player) => (
          <Stack direction="row" spacing="8px">
            <Avatar
              variant="square"
              sx={{ width: 24, height: 24 }}
              src={player.championIconURL}
            ></Avatar>
            <Stack direction="row" spacing="8px">
              <Typography minWidth="150px">{player.summonerName}</Typography>
              <Typography color={ player.snaxGain > 0 ? 'rgba(104, 204, 144, 0.8)' : 'rgba(171, 95, 84, 1)'} variant="body1">{player.snaxGain}</Typography>
            </Stack>
          </Stack>
        ))}
        </Stack>
        <Stack spacing="4px">
        {teamTwo.map((player) => (
          <Stack direction="row" spacing="8px">
            <Avatar
              variant="square"
              sx={{ width: 24, height: 24 }}
              src={player.championIconURL}
            ></Avatar>
            <Stack direction="row" spacing="8px">
              <Typography minWidth="150px">{player.summonerName}</Typography>
              <Typography color={ player.snaxGain > 0 ? 'rgba(104, 204, 144, 0.8)' : 'rgba(171, 95, 84, 1)'} variant="body1">{player.snaxGain}</Typography>
            </Stack>
          </Stack>
        ))}
        </Stack>
      </Stack>
      
    </Stack>
  );
}

export default Match;
