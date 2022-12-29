import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FetchUserByName, UserProfileDTO } from '@luni/common';

import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern('game_analyzed')
  async writeAnalysis(@Payload() data: any) {
    return this.statsService.write(data);
  }

  @Get('players/:summonerName/champions')
  async getPlayerChampionStats(@FetchUserByName() user: UserProfileDTO) {
    return this.statsService.getPlayerChampionStats(user.puuid);
  }

  @Get('players/:summonerName')
  async getPlayerStats(@FetchUserByName() user: UserProfileDTO) {
    return this.statsService.getPlayerStats(user.puuid);
  }

  @Get('champions/:championId')
  async getChampionStats(@Param('championId') championId: string) {
    return this.statsService.getChampionStats(championId);
  }
}
