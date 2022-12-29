import { Controller, Get, NotFoundException, Query } from '@nestjs/common';

import { UsersService } from './users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async getUser(
    @Query('summonerName') summonerName: string,
    @Query('puuid') puuid: string,
  ) {
    const user = await this.usersService.getUser({ summonerName, puuid });
    if (!user) {
      throw new NotFoundException('User does not have a Luni account');
    }

    return user;
  }
}
