import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class QueuesService {
  @Cron(CronExpression.EVERY_10_MINUTES)
  inQueueHandle() {
    console.log('check if players are in queue');
  }
}
