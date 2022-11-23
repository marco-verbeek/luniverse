import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DiscordUserGuard } from './discord-user.guard';

@Injectable()
export class DiscordAdminGuard extends DiscordUserGuard {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    super.canActivate(context);

    const user = context.switchToHttp().getRequest().user;

    if (user?.discordId !== this.configService.get('ADMIN_DISCORD_ID')) {
      throw new UnauthorizedException('Request must be made by an admin');
    }

    return true;
  }
}
