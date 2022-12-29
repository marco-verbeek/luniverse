import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MatchV5Service, SummonerV4Service } from '@luni/riot-api';
import { fetchUserByPuuid, STATS_QUEUE, UserProfileDTO } from '@luni/common';
import { RegionGroups, Regions } from 'twisted/dist/constants';

import { DTHAnalysisService } from './dth-analysis.service';
import { AnalysisRepository } from './analysis.repository';

@Injectable()
export class AnalysisService {
  constructor(
    @Inject(STATS_QUEUE) private statsClient: ClientProxy,
    private readonly matchV5Service: MatchV5Service,
    private readonly summonerV4Service: SummonerV4Service,
    private readonly dthAnalysisService: DTHAnalysisService,
    private readonly analysisRepository: AnalysisRepository,
  ) {}

  async lastGame(summonerName: string) {
    // Fetch the Riot Profile associated with the summoner name.
    const {
      response: { puuid },
    } = await this.summonerV4Service.getSummonerByName(
      summonerName,
      Regions.EU_WEST,
    );

    // Fetch the user's last ARAM game
    const userLastGame = await this.matchV5Service.listMatches(
      puuid,
      RegionGroups.EUROPE,
      { queue: 450, count: 1 },
    );

    const lastGameId = userLastGame.response[0];

    // See if the game has already been analyzed in the past
    const alreadyAnalyzed = await this.analysisRepository.findOne({
      gameId: lastGameId,
    });

    if (alreadyAnalyzed) {
      return alreadyAnalyzed;
    }

    // Fetch official match data
    const match = await this.matchV5Service.getMatchById(
      lastGameId,
      RegionGroups.EUROPE,
    );

    // Apply DTH Analysis on official data
    const gameAnalysis = this.dthAnalysisService.performMatchAnalysis(
      match.response,
    );

    // Set the luniId of each player, if they have a Luni account.
    for (const player of gameAnalysis.players) {
      const luniAcc = await fetchUserByPuuid(player.puuid);

      if (luniAcc) {
        player.luniId = luniAcc.luniId;
      }
    }

    // Add the analysis to the db
    await this.analysisRepository.create(gameAnalysis);

    // Emit event for raram-stats to process
    await this.statsClient.emit('game_analyzed', gameAnalysis);

    return gameAnalysis;
  }

  async getPlayerProfile(summonerName: string) {
    const {
      response: { profileIconId, summonerLevel },
    } = await this.summonerV4Service.getSummonerByName(
      summonerName,
      Regions.EU_WEST,
    );

    return {
      name: summonerName,
      level: summonerLevel,
      iconId: profileIconId,
    };
  }

  async getPlayerHistory(user: UserProfileDTO) {
    const history = await this.analysisRepository.find(
      {
        'players.puuid': user.puuid,
      },
      { limit: 10, sort: { _id: -1 } },
    );

    if (!history) {
      return [];
    }

    const formattedHistory = [];
    for (const game of history) {
      const { id: winningTeamId } = game.teams.find((team) => team.win);
      const { teamId: playerTeamId } = game.players.find(
        (player) => player.summonerName === user.summonerName,
      );

      // Format players to only keep certain properties.
      const players = game.players.map((player) => ({
        championId: player.championId,
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        summonerName: player.summonerName,
        snaxGain: player.poroSnaxGain,
      }));

      formattedHistory.push({
        win: playerTeamId === winningTeamId,
        players,
      });
    }

    return formattedHistory;
  }
}
