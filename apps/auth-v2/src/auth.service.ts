import { Injectable } from '@nestjs/common';
import { SummonerV4Service } from '@luni/riot-api';

import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly summonerV4: SummonerV4Service,
    private readonly usersService: UsersService,
  ) {}

  // TODO
}
