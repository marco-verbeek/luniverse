import { Player } from './player';

export interface MatchHistory {
  win: boolean,
  players: Player[],
}