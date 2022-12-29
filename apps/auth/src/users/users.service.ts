import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserBySummonerName(summonerName: string) {
    return this.usersRepository.findOne({ summonerName, verified: true });
  }

  async getUserByPuuid(puuid: string) {
    return this.usersRepository.findOne({ puuid, verified: true });
  }
}
