import { Injectable } from '@nestjs/common';

import { ChampionRepository } from './repositories/champion.repository';
import { GameRepository } from './repositories/game.repository';
import { PlayedChampionRepository } from './repositories/played-champion.repository';
import { PlayerRepository } from './repositories/player.repository';

@Injectable()
export class StatsService {
  constructor(
    private readonly championRepository: ChampionRepository,
    private readonly gameRepository: GameRepository,
    private readonly playedChampRepository: PlayedChampionRepository,
    private readonly playerRepository: PlayerRepository,
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

      // Write champion data
      await this.championRepository.findOneAndUpdate(
        { id: player.championId },
        {
          $set: { id: player.championId, name: player.champion },
          $inc: {
            gamesPlayed: 1,
            gamesWon: gameWon ? 1 : 0,

            pointsWon: gameWon ? player.poroPointsGain : 0,
            pointsLost: gameWon ? 0 : player.poroPointsGain * -1,

            totalDamageDone: player.damageDone,
            totalDamageTaken: player.damageTaken,
            totalHealed: player.healed,

            totalKillParticipation: player.kills + player.assists,
            doubleKills: player.doubleKills,
            tripleKills: player.tripleKills,
            quadraKills: player.quadraKills,
            pentaKills: player.pentaKills,
          },
        },
        true,
      );

      // Write player data
      await this.playerRepository.findOneAndUpdate(
        {
          discordId: player.discordId,
        },
        {
          $set: { discordId: player.discordId },
          $inc: {
            rankedGames: 1,
            wins: gameWon ? 1 : 0,
            poroPoints: player.poroPointsGain,

            pointsWon: gameWon ? player.poroPointsGain : 0,
            pointsLost: gameWon ? 0 : player.poroPointsGain * -1,

            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,

            damageDone: player.damageDone,
            damageTaken: player.damageTaken,
            healed: player.healed,

            doubleKills: player.doubleKills,
            tripleKills: player.tripleKills,
            quadraKills: player.quadraKills,
            pentaKills: player.pentaKills,
          },
        },
        true,
      );

      // Write played-champion data
      await this.playedChampRepository.findOneAndUpdate(
        {
          championId: player.championId,
          discordId: player.discordId,
        },
        {
          $set: { championId: player.championId, discordId: player.discordId },
          $inc: { gamesPlayed: 1, gamesWon: gameWon ? 1 : 0 },
        },
        true,
      );
    }
  }
}