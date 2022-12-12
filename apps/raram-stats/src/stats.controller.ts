import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { StatsService } from './stats.service';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern('game_analyzed')
  async writeAnalysis(@Payload() data: any) {
    return this.statsService.write(data);
  }
}
