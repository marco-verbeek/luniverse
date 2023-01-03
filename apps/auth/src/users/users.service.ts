import { ConflictException, Injectable } from '@nestjs/common';
import { SummonerV4Service } from '@luni/riot-api';
import { Regions } from 'twisted/dist/constants';
import { Types } from 'mongoose';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly summonerV4Service: SummonerV4Service,
  ) {}

  async getUser(filter: Partial<User>) {
    // Filter out the pairs where the value is null or undefined
    const query = Object.entries(filter).filter(([, value]) => value != null);

    // Convert the array of pairs back into an object
    const queryObject = Object.fromEntries(query);

    return this.usersRepository.findOne(queryObject);
  }

  async getQueuingUsers() {
    return this.usersRepository.find({ queuing: true });
  }

  async register(summonerName: string) {
    const user = await this.usersRepository.findOne({
      summonerName,
      verified: true,
    });

    // If a user with the provided summonerName already has a verified account, cancel.
    if (user) {
      throw new ConflictException('User with that summonerName already exists');
    }

    // Fetch the user's Riot data
    const {
      response: { accountId, id: summonerId, puuid },
    } = await this.summonerV4Service.getSummonerByName(
      summonerName,
      Regions.EU_WEST,
    );

    // Create the user account
    return await this.usersRepository.create({
      luniId: new Types.ObjectId(),
      summonerName,
      accountId,
      puuid,
      summonerId,
      verified: true,
      queuing: true,
    });
  }
}
