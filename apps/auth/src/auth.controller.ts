import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ConfirmLeagueLinkDTO } from './dtos/confirm-league-link.dto';
import { LinkLeagueAccountDTO } from './dtos/link-league-account.dto';
import { DiscordUserGuard } from './guards/discord-user.guard';
import { DiscordAdminGuard } from './guards/discord-admin.guard';
import { GetDiscordUserId } from './decorators/get-discord-user-id.decorator';

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
}
