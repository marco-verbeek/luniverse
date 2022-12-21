import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MatchV5Service } from '@luni/riot-api';
import { RegionGroups } from 'twisted/dist/constants';

import { DTHAnalysisService } from './dth-analysis.service';
import { AnalysisRepository } from './analysis.repository';
import { AnalysisDTO } from './types/analysis.type';

@Injectable()
export class AnalysisService {
  constructor(
    @Inject('RARAM_STATS') private statsClient: ClientProxy,
    private readonly matchV5Service: MatchV5Service,
    private readonly dthAnalysisService: DTHAnalysisService,
    private readonly analysisRepository: AnalysisRepository,
  ) {}

  async lastGame(user) {
    // Fetch the user's last ARAM game
    const userLastGame = await this.matchV5Service.listMatches(
      user.leagueAccount.puuid,
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

    return this.analyzeByGameId(lastGameId);
  }

  async analyzeByGameId(gameId: string) {
    // See if the game has already been analyzed in the past
    const alreadyAnalyzed = await this.analysisRepository.findOne({
      gameId,
    });

    if (alreadyAnalyzed) {
      return alreadyAnalyzed;
    }

    // Fetch official match data
    const match = await this.matchV5Service.getMatchById(
      gameId,
      RegionGroups.EUROPE,
    );

    // Apply DTH Analysis on official data
    const gameAnalysis = this.dthAnalysisService.performMatchAnalysis(
      match.response,
    );

    // Link players with their Luni accounts
    await this.addDiscordIdsToPlayers(gameAnalysis);

    // Add the analysis to the db
    await this.analysisRepository.create(gameAnalysis);

    // Emit event for raram-stats to process
    await this.statsClient.emit('game_analyzed', gameAnalysis);

    return gameAnalysis;
  }

  async getMatchHistory(user) {
    const history = await this.matchV5Service.listMatches(
      user.leagueAccount.puuid,
      RegionGroups.EUROPE,
      { queue: 450, count: 10 },
    );
    console.log(history);
    return history.response;
  }

  private async addDiscordIdsToPlayers(analysis: AnalysisDTO) {
    const summonerNames = analysis.players.map((player) => player.summonerName);
    const accounts = await this.fetchPlayerDiscordIds(summonerNames);

    for (const account of accounts) {
      const player = analysis.players.find(
        (player) => player.summonerName === account.summonerName,
      );

      player.discordId = account.discordId;
    }
  }

  private async fetchPlayerDiscordIds(summonerNames) {
    const url = new URL('http://auth:3001/auth/users');
    const params = new URLSearchParams();

    for (const name of summonerNames) {
      params.append('summonerNames', name);
    }

    url.search = params.toString();

    const req = await fetch(url);
    return await req.json();
  }
}
