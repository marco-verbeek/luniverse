import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserProfileDTO } from '@luni/common';
import { SummonerV4Service } from '@luni/riot-api';
import { GameModes, Regions } from 'twisted/dist/constants';

@Injectable()
export class QueuesService {
  constructor(private readonly summonerV4Service: SummonerV4Service) {}

  private readonly logger = new Logger(QueuesService.name);

  // Map of Players that are in an active game with their puuid as key.
  // Note: A shared array between microservices would probably allow for easier scalability.
  IN_GAME: Map<string, UserProfileDTO> = new Map();

  @Cron(CronExpression.EVERY_MINUTE)
  async inQueueHandle() {
    const playersInQueue = await this.fetchPlayersQueuing();

    for (const player of playersInQueue) {
      if (this.IN_GAME.has(player.puuid)) {
        continue;
      }

      const inActiveGame = await this.isPlayerInActiveARAMGame(
        player.summonerId,
      );

      if (inActiveGame) {
        this.IN_GAME.set(player.puuid, player);
        continue;
      }
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async inGameHandle() {
    for (const [, player] of this.IN_GAME.entries()) {
      const inActiveGame = await this.isPlayerInActiveARAMGame(
        player.summonerId,
      );

      if (inActiveGame) {
        continue;
      }

      // TODO: start analysis
      this.logger.log(
        `Player ${player.summonerName} has finished their ARAM game!`,
      );
    }
  }

  private async fetchPlayersQueuing(): Promise<UserProfileDTO[]> {
    const usersReq = await fetch('http://auth:3001/auth/users/queuing');

    if (usersReq.status !== 200) {
      return [];
    }

    const users = await usersReq.json();
    return users as UserProfileDTO[];
  }

  // TODO: refactor to return active game data, use gameId in analysis-by-id?
  private async isPlayerInActiveARAMGame(summonerId: string): Promise<boolean> {
    try {
      const activeGame = await this.summonerV4Service.getActiveGame(
        summonerId,
        Regions.EU_WEST,
      );

      // Note: weirdly, 'instanceof APIResponse' is not working here.
      if (activeGame.hasOwnProperty('response')) {
        return activeGame['response'].gameMode === GameModes.ARAM;
      }
    } catch (err) {
      // Note: getActiveGame throws a 404 if player not in active game.
    }

    return false;
  }
}
