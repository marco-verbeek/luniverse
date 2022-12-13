import { Injectable } from '@nestjs/common';

import { GameRepository } from './repositories/game.repository';
import { PlayedChampionRepository } from './repositories/played-champion.repository';

@Injectable()
export class StatsService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playedChampRepository: PlayedChampionRepository,
  ) {}

  async write(data: any) {
    const game = await this.gameRepository.findOne({ gameId: data.gameId });
    if (game) {
      throw new Error('Game stats have already been written!');
    }

    // Write game to db.games in order to not write stats twice.
    await this.gameRepository.create({ gameId: data.gameId });

    // Only keep the players that have a rARAM account.
    const players = data.players.filter((player) => !!player.discordId);
    const { id: winningTeamId } = data.teams.find((team) => team.win);

    // TODO: improve 'promises in for...of'
    for (const player of players) {
      const gameWon = player.team === winningTeamId;

      // Write played-champion data
      await this.playedChampRepository.findOneAndUpdate(
        {
          championId: player.championId,
          discordId: player.discordId,
        },
        {
          $set: { championId: player.championId, discordId: player.discordId },
          $inc: {
            gamesPlayed: 1,
            gamesWon: gameWon ? 1 : 0,
            pointsWon: gameWon ? player.poroPointsGain : 0,
            pointsLost: gameWon ? 0 : player.poroPointsGain * -1,

            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,

            doubleKills: player.doubleKills,
            tripleKills: player.tripleKills,
            quadraKills: player.quadraKills,
            pentaKills: player.pentaKills,

            firstBloodKills: player.firstBloodKill ? 1 : 0,
            firstBloodAssists: player.firstBloodAssist ? 1 : 0,

            damageDone: player.damageDone,
            damageTaken: player.damageTaken,
            healed: player.healed,

            spell1Casts: player.spell1Casts,
            spell2Casts: player.spell2Casts,
            spell3Casts: player.spell3Casts,
            spell4Casts: player.spell4Casts,

            champLevel: player.champLevel,
            timePlayed: player.timePlayed,
            timeCCingOthers: player.timeCCingOthers,
            totalTimeSpentDead: player.totalTimeSpentDead,

            goldEarned: player.goldEarned,
            goldSpent: player.goldSpent,
            totalMinionsKilled: player.totalMinionsKilled,
            itemsPurchased: player.itemsPurchased,
          },
        },
        true,
      );
    }
  }

  async getUserStatsById(discordId: string) {
    return this.playedChampRepository.getPlayerSums(discordId);
  }

  async getChampionStatsById(championId: string) {
    return null;
  }
}
