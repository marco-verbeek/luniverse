import { Controller, Get, Param } from '@nestjs/common';

import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get(':summonerName/latest')
  async getLastGameAnalysis(@Param('summonerName') summonerName: string) {
    return this.analysisService.lastGame(summonerName);
  }

  @Get(':summonerName/history')
  async getPlayerHistory(@Param('summonerName') summonerName: string) {
    return this.analysisService.getPlayerHistory(summonerName);
  }
}
