import { nanoid, SessionType } from '@luni/common';
import {
  BadRequestException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AbstractGuessHandler } from '../abstract-guess-handler';
import { GuessDTO } from '../dtos/guess.dto';
import { GuessQuotesService } from '../quotes/guessing/guess-quotes.service';
import { SessionsRepository } from './sessions.repository';

@Injectable()
export class SessionsService {
  constructor(
    private readonly sessionsRepository: SessionsRepository,
    private readonly quotesHandler: GuessQuotesService,
  ) {}

  getHandlerByType(type: string): AbstractGuessHandler {
    switch (type) {
      case SessionType.GUESS_QUOTE:
        return this.quotesHandler;
    }

    throw new BadRequestException();
  }

  async create(type: string) {
    const handler = this.getHandlerByType(type);
    const guess = await handler.create();

    // Create the game session
    const session = await this.sessionsRepository.create({
      id: nanoid(),
      guessId: guess.id,
      type,
    });

    return { session: { ...session, _id: undefined }, data: guess.data };
  }

  async guess(sessionId: string, guess: GuessDTO) {
    const session = await this.sessionsRepository.findOne({ id: sessionId });
    if (!session) {
      throw new NotFoundException('Session could not be found');
    }

    if (session.finished) {
      throw new GoneException('Session is already finished');
    }

    // TODO: add guess to database

    const handler = this.getHandlerByType(session.type);
    const response = await handler.verify(session.guessId, guess);

    if (response.correct) {
      const guess = await handler.create();

      await this.sessionsRepository.findOneAndUpdate(
        { id: session.id },
        { $inc: { streak: 1 }, $set: { guessId: guess.id } },
      );

      return { ...response, data: guess.data };
    } else {
      await this.sessionsRepository.findOneAndUpdate(
        { id: session.id },
        { $set: { finished: true } },
      );
    }

    return response;
  }
}
