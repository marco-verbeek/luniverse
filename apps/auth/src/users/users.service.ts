import { Injectable } from '@nestjs/common';
import { LolAccount } from './schemas/lol-account.schema';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByDiscordId(discordId: string): Promise<User> {
    return this.usersRepository.findOne({ discordId });
  }

  async create(discordId: string, summonerName: string): Promise<User> {
    return this.usersRepository.create({
      discordId,
      summonerName,
      verified: false,
      leagueAccount: null,
    });
  }

  async updateSummonerName(
    discordId: string,
    summonerName: string,
  ): Promise<User> {
    return this.usersRepository.findOneAndUpdate(
      { discordId },
      { $set: { summonerName } },
    );
  }

  async confirmAccountVerification(
    discordId: string,
    leagueAccount: LolAccount,
  ): Promise<User> {
    return this.usersRepository.findOneAndUpdate(
      { discordId },
      { $set: { verified: true, leagueAccount } },
    );
  }
}
