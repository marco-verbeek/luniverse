import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard, GetCurrentUser } from '@luni/common';

import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('last')
  @UseGuards(DiscordAuthGuard)
  async getLastGameAnalysis(@GetCurrentUser() user) {
    return this.analysisService.lastGame(user);
  }

  @Get('history')
  @UseGuards(DiscordAuthGuard)
  async getMatchHistory(@GetCurrentUser() user) {
    console.log(user);
    return this.analysisService.getMatchHistory(user);
  }

  @Get(':gameId')
  @UseGuards(DiscordAuthGuard)
  async getGameAnalysis(@Param('gameId') gameId: string) {
    return this.analysisService.analyzeByGameId(gameId);
  }
}
