import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetCurrentUser } from '@luni/common';

import { AuthService } from './auth.service';
import { ConfirmLeagueLinkDTO } from './dtos/confirm-league-link.dto';
import { LinkLeagueAccountDTO } from './dtos/link-league-account.dto';
import { DiscordUserGuard } from './guards/discord-user.guard';
import { DiscordAdminGuard } from './guards/discord-admin.guard';
import { GetDiscordUserId } from './decorators/get-discord-user-id.decorator';
import { User } from './users/schemas/user.schema';
import { VerifiedAccountGuard } from './guards/verified-account.guard';
import { DiscordIdBySummonerNameDTO } from './dtos/get-user-by-summoner-name.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('link')
  @UseGuards(DiscordUserGuard)
  async linkLeagueAccount(
    @GetDiscordUserId() discordId: string,
    @Body() data: LinkLeagueAccountDTO,
  ) {
    return this.authService.createLeagueLink(discordId, data.summonerName);
  }

  @Post('link/confirm')
  @UseGuards(DiscordAdminGuard)
  async confirmLinkLeagueAccount(@Body() data: ConfirmLeagueLinkDTO) {
    return this.authService.confirmLeagueLink(data.accountId);
  }

  @Get('users')
  async getUsersBySummonerNames(@Query() data: DiscordIdBySummonerNameDTO) {
    return this.authService.getAccountsBySummonerNames(data.summonerNames);
  }

  @UseGuards(VerifiedAccountGuard)
  @MessagePattern('validate_user')
  async validateUser(@GetCurrentUser() user: User) {
    return user;
  }
}
