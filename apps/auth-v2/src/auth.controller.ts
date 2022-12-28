import { Controller, Get, Query } from '@nestjs/common';

import { UsersService } from './users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async getUser(
    @Query('summonerName') summonerName: string,
    @Query('puuid') puuid: string,
  ) {
    if (summonerName) {
      return this.usersService.getUserBySummonerName(summonerName);
    } else if (puuid) {
      return this.usersService.getUserByPuuid(puuid);
    }

    return null;
  }
}
