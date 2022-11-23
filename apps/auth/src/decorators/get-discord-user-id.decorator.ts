import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetDiscordUserId = createParamDecorator(
  (data: undefined, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    return request.user['discordId'];
  },
);
