import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class DiscordUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const headers = context.switchToHttp().getRequest().headers;

    if (!headers.authorization?.includes('discordId')) {
      throw new UnauthorizedException('No discordId provided');
    }

    const discordId: string = headers.authorization.split('discordId ')[1];
    if (discordId.length !== 18) {
      throw new UnauthorizedException('DiscordId must be 18 characters long');
    }

    context.switchToHttp().getRequest().user = { discordId };
    return true;
  }
}
