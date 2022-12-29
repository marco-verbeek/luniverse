import {
  ExecutionContext,
  createParamDecorator,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserProfileDTO } from './user-profile.dto';

export const FetchUserByName = createParamDecorator(
  async (data: undefined, ctx: ExecutionContext): Promise<UserProfileDTO> => {
    const request = ctx.switchToHttp().getRequest();

    const summonerName =
      request.query?.summonerName ?? request.params?.summonerName ?? '';

    if (summonerName === '') {
      throw new UnprocessableEntityException(
        'Could not fetch user, missing query or param summonerName',
      );
    }

    const userReq = await fetch(
      `http://auth:3001/auth/users?summonerName=${summonerName}`,
    );
    const user = await userReq.json();

    return user as UserProfileDTO;
  },
);
