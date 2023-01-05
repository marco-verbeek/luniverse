const BASE_URL = 'http://localhost:80';

const PLAYER_NAME = 'ItsNexty';
const GAME_IDS = [
  'EUW1_6212183059',
  'EUW1_6211673228',
  'EUW1_6211642177',
  'EUW1_6211563579',
  'EUW1_6207362439',
  'EUW1_6207349480',
  'EUW1_6207314080',
  'EUW1_6207282650',
  'EUW1_6206719573',
  'EUW1_6206679909',
  'EUW1_6203892829',
  'EUW1_6156733439',
];

(async () => {
  // Register the user
  await fetch(`${BASE_URL}/auth/users/register`, {
    method: 'POST',
    body: JSON.stringify({ summonerName: PLAYER_NAME }),
  });

  const analysisRequests = [];

  // Analyze the ARAM games by their ID.
  for (const gameId of GAME_IDS) {
    analysisRequests.push(
      fetch(`${BASE_URL}/analysis/games/${gameId}`, { method: 'POST' }),
    );
  }

  await Promise.allSettled(analysisRequests);

  console.log('Done!');
})();
