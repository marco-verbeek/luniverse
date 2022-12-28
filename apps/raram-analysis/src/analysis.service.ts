import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MatchV5Service, SummonerV4Service } from '@luni/riot-api';
import { STATS_QUEUE } from '@luni/common';
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

    // Add the analysis to the db
    await this.analysisRepository.create(gameAnalysis);

    // Emit event for raram-stats to process
    await this.statsClient.emit('game_analyzed', gameAnalysis);

    return gameAnalysis;
  }

  async getPlayerHistory(summonerName: string) {
    // Fetch the Riot Profile associated with the summoner name.
    const {
      response: { puuid },
    } = await this.summonerV4Service.getSummonerByName(
      summonerName,
      Regions.EU_WEST,
    );

    const history = await this.analysisRepository.find(
      {
        'players.puuid': puuid,
      },
      { limit: 10, sort: { _id: -1 } },
    );

    if (!history || history.length === 0) {
      throw new NotFoundException('Player has not yet played a rARAM');
    }

    const formattedHistory = [];

    for (const game of history) {
      const { id: winningTeamId } = game.teams.find((team) => team.win);
      const { teamId: playerTeam } = game.players.find(
        (player) => player.summonerName === summonerName,
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
        win: playerTeam === winningTeamId,
        players,
      });
    }

    return formattedHistory;
  }
}
