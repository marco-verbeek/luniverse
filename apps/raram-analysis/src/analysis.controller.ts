import { Controller, Get, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from '@luni/common';

import { AnalysisService } from './analysis.service';
import { GetCurrentUser } from './decorators/get-user.decorator';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('last')
  @UseGuards(DiscordAuthGuard)
  getLastGameAnalysis(@GetCurrentUser() user) {
    console.log('getLastGameAnalysis request by user', user);
    return { success: true, user };
  }
}
