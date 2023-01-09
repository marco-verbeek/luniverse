import { Injectable, NotFoundException } from '@nestjs/common';

import { GameRepository } from './repositories/game.repository';
import { PlayedChampionRepository } from './repositories/played-champion.repository';
import { ChampionRepository } from './repositories/champion.repository';
import { PlayerRepository } from './repositories/player.repository';

@Injectable()
export class StatsService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playedChampRepository: PlayedChampionRepository,
    private readonly championRepository: ChampionRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async write(data: any) {
    const game = await this.gameRepository.findOne({ gameId: data.gameId });
    if (game) {
      throw new Error('Game stats have already been written!');
    }

    // Write game to db.games in order to not write stats twice.
    await this.gameRepository.create({ gameId: data.gameId });

    const players = data.players;
    const { id: winningTeamId } = data.teams.find((team) => team.win);

    // TODO: improve 'promises in for...of'
    for (const player of players) {
      // Only keep the players that have a Luni account.
      if (!player.luniId) {
        continue;
      }

      const gameWon = player.teamId === winningTeamId;

      const incrementStats = {
        gamesPlayed: 1,
        gamesWon: gameWon ? 1 : 0,
        poroSnaxWon: gameWon ? player.poroSnaxGain : 0,
        poroSnaxLost: gameWon ? 0 : Math.abs(player.poroSnaxGain),

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

        championLevel: player.championLevel,
        timePlayed: player.timePlayed,
        timeCCingOthers: player.timeCCingOthers,
        totalTimeSpentDead: player.totalTimeSpentDead,

        goldEarned: player.goldEarned,
        goldSpent: player.goldSpent,
        totalMinionsKilled: player.totalMinionsKilled,
        itemsPurchased: player.itemsPurchased,
      };

      // Write champion data
      await this.championRepository.findOneAndUpdate(
        { championId: player.championId },
        { $set: { championId: player.championId }, $inc: incrementStats },
        true,
      );

      // Write player data
      await this.playerRepository.findOneAndUpdate(
        { puuid: player.puuid },
        { $set: { puuid: player.puuid }, $inc: incrementStats },
        true,
      );

      // Write played-champion data
      await this.playedChampRepository.findOneAndUpdate(
        {
          championId: player.championId,
          puuid: player.puuid,
        },
        {
          $set: { championId: player.championId, puuid: player.puuid },
          $inc: incrementStats,
        },
        true,
      );
    }
  }

  async getPlayerStats(puuid: string) {
    const stats = await this.playerRepository.findOne({ puuid });

    if (!stats) {
      throw new NotFoundException('Player has not yet played a rARAM game');
    }

    return stats;
  }

  async getPlayerChampionStats(puuid: string) {
    const champStats = await this.playedChampRepository.find(
      { puuid },
      {
        limit: 10,
        sort: { gamesPlayed: -1, gamesWon: -1, poroSnaxWon: -1 },
        fields: {
          championId: 1,
          championName: 1,
          championIconURL: 1,

          gamesPlayed: 1,
          gamesWon: 1,
          poroSnaxWon: 1,
          poroSnaxLost: 1,
          poroSnax: 1,

          kills: 1,
          deaths: 1,
          assists: 1,
          kda: 1,
        },
      },
    );

    if (!champStats) {
      throw new NotFoundException('Player has not yet played a rARAM game');
    }

    return champStats;
  }

  async getChampionStats(championId: string) {
    const stats = await this.championRepository.findOne({
      championId: Number(championId),
    });

    if (!stats) {
      throw new NotFoundException('Champion has not yet been played');
    }

    return stats;
  }
}
