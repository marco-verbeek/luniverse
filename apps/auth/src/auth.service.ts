import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Regions } from 'twisted/dist/constants';
import { SummonerV4Service } from '@luni/riot-api';

import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly summonerV4: SummonerV4Service,
    private readonly usersService: UsersService,
  ) {}

  async createLeagueLink(discordId: string, summonerName: string) {
    let account = await this.usersService.findByDiscordId(discordId);

    // Account does not exist - create one.
    if (!account) {
      account = await this.usersService.create(discordId, summonerName);
    }

    if (account.verified) {
      throw new ConflictException('Account is already verified');
    }

    // TODO: check if different verified account with same name exists
    if (account.summonerName != summonerName) {
      account = await this.usersService.updateSummonerName(
        discordId,
        summonerName,
      );
    }

    return account;
  }

  async confirmLeagueLink(discordId: string) {
    const account = await this.usersService.findByDiscordId(discordId);

    if (!account) {
      throw new NotFoundException(
        'Could not find account with provided discordId',
      );
    }

    if (account.verified) {
      throw new ConflictException('Account is already verified');
    }

    const riotData = await this.summonerV4.getSummonerByName(
      account.summonerName,
      Regions.EU_WEST,
    );

    const lolAccount = {
      ...riotData.response,
      summonerId: riotData.response.id,
    };

    return this.usersService.confirmAccountVerification(discordId, lolAccount);
  }
}
