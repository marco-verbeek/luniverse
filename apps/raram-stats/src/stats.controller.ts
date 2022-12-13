import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern('game_analyzed')
  async writeAnalysis(@Payload() data: any) {
    return this.statsService.write(data);
  }

  @Get('users/:discordId')
  async getUserStatsById(@Param('discordId') discordId: string) {
    return this.statsService.getUserStatsById(discordId);
  }

  @Get('champions/:championId')
  async getChampionStatsById(@Param('championId') championId: string) {
    return this.statsService.getChampionStatsById(championId);
  }
}
