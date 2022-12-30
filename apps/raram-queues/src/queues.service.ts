import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SummonerV4Service } from '@luni/riot-api';

@Injectable()
export class QueuesService {
  constructor(private readonly summonerV4Service: SummonerV4Service) {}

  // TODO: shared array of users in a game. Allows for easier scalability with multiple microservices?
  // TODO: or even better, rework this when needed. We might not have to scale this if we keep it between friends!

  // TODO: logger for easier debugging.

  @Cron(CronExpression.EVERY_5_MINUTES)
  inQueueHandle() {
    console.log('skip player if already in active game');
    console.log('check if players are in an active game');
    console.log('if they are, add them to a shared array of in-game players');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  inGameHandle() {
    console.log('check if player still in game');
    console.log('if not, analyze latest game');
  }
}
