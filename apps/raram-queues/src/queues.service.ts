import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class QueuesService {
  // TODO: shared array of users in a game. Allows for easier scalability with multiple microservices.

  @Cron(CronExpression.EVERY_5_MINUTES)
  inQueueHandle() {
    console.log('what to do with queuing players');
  }
}
