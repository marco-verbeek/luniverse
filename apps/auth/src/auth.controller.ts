import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsersService } from './users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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

  @Get('users/:summonerName/profile')
  async getPlayerProfile(@Param('summonerName') summonerName: string) {
    return this.authService.getPlayerProfile(summonerName);
  }

  @Get('users/queuing')
  async getQueuingUsers() {
    return this.usersService.getQueuingUsers();
  }
}
