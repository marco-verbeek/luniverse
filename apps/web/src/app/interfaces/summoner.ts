import { MatchHistory } from './matchHistory';
import { TopChampion } from './topChampion';

export interface SummonerProfile {
  iconId: number
  summonerName: string,
  level: number,
  snax: number,
  topChampions: TopChampion[],
  matchHistory: MatchHistory[],
}