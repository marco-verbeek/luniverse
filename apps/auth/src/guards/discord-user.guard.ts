import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class DiscordUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const auth =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest().headers.authentication
        : context.switchToRpc().getData().Authentication;

    if (!auth?.includes('discordId')) {
      throw new UnauthorizedException('No discordId provided');
    }

    const discordId: string = auth.split('discordId ')[1];
    if (discordId.length !== 18) {
      throw new UnauthorizedException('DiscordId must be 18 characters long');
    }

    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = { discordId };
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = { discordId };
    }

    return true;
  }
}
