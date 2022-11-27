import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { DiscordUserGuard } from './discord-user.guard';

@Injectable()
export class VerifiedAccountGuard extends DiscordUserGuard {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    super.canActivate(context);

    const user =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest().user
        : context.switchToRpc().getData().user;

    const dbUser = await this.usersService.findByDiscordId(user.discordId);
    if (!dbUser) {
      throw new UnauthorizedException('User does not have an account');
    }

    if (!dbUser.verified) {
      throw new ForbiddenException('User account is not verified');
    }

    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = dbUser;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = dbUser;
    }

    return true;
  }
}
