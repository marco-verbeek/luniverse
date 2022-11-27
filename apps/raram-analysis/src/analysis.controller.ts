import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
