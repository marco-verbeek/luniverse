import { MatchHistory } from './matchHistory';
import { TopChampion } from './topChampion';

export interface SummonerProfile {
  iconUrl: string,
  summonerName: string,
  level: number,
  snax: number,
  topChampions: TopChampion[],
  matchHistory: MatchHistory[],
}