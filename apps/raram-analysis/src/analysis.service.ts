import { Injectable } from '@nestjs/common';
import { MatchV5Service } from '@luni/riot-api';
import { RegionGroups } from 'twisted/dist/constants';

import { DTHAnalysisService } from './dth-analysis.service';
import { AnalysisRepository } from './analysis.repository';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly matchV5Service: MatchV5Service,
    private readonly dthAnalysisService: DTHAnalysisService,
    private readonly analysisRepository: AnalysisRepository,
  ) {}

  async lastGame(user) {
    const userLastGame = await this.matchV5Service.listMatches(
      user.leagueAccount.puuid,
      RegionGroups.EUROPE,
      { queue: 450, count: 1 },
    );

    const lastGameId = userLastGame.response[0];

    const alreadyAnalysed = await this.analysisRepository.findOne({
      gameId: lastGameId,
    });

    if (alreadyAnalysed) {
      return alreadyAnalysed;
    }

    const match = await this.matchV5Service.getMatchById(
      lastGameId,
      RegionGroups.EUROPE,
    );

    const gameAnalysis = this.dthAnalysisService.performMatchAnalysis(
      match.response,
    );

    await this.analysisRepository.upsert(
      { gameId: gameAnalysis.gameId },
      gameAnalysis,
    );

    return gameAnalysis;
  }
}
