import { Controller, Get, Param, Post } from '@nestjs/common';
import { FetchUserByName, UserProfileDTO } from '@luni/common';

import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post(':gameId')
  async analyzeGameById(@Param('gameId') gameId: string) {
    return this.analysisService.analyzeGameById(gameId);
  }

  @Post(':summonerName/latest')
  async getLastGameAnalysis(@Param('summonerName') summonerName: string) {
    return this.analysisService.lastGame(summonerName);
  }

  @Get(':summonerName/history')
  async getPlayerHistory(@FetchUserByName() user: UserProfileDTO) {
    return this.analysisService.getPlayerHistory(user);
  }
}
