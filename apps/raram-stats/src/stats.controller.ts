import { Controller } from '@nestjs/common';

import { StatsService } from './stats.service';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  // MessagePattern
  // writeAnalysis
}
