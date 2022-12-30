import { Injectable } from '@nestjs/common';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

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
}
