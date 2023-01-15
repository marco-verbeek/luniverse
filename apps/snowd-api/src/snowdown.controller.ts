import { SessionType } from '@luni/common';
import { Body, Controller, Param, Post } from '@nestjs/common';

import { GuessDTO } from './dtos/guess.dto';
import { SessionsService } from './sessions/sessions.service';

@Controller('sessions')
export class SnowdownController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async createSession() {
    const createdSession = await this.sessionsService.create(
      SessionType.GUESS_QUOTE,
    );

    return createdSession;
  }

  @Post(':sessionId/guess')
  guess(@Param('sessionId') sessionId: string, @Body() guess: GuessDTO) {
    return this.sessionsService.guess(sessionId, guess);
  }
}
