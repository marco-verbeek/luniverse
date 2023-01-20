import { nanoid, SessionMode, SessionType } from '@luni/common';
import {
  BadRequestException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AbstractModeHandler } from '../abstract-mode-handler';
import { AbstractTypeHandler } from '../abstract-type-handler';
import { GuessDTO } from '../dtos/guess.dto';
import { GuessQuotesService } from '../quotes/guessing/guess-quotes.service';
import { HardSessionHandler } from './hard-session.handler';
import { PlayerGuessRepository } from './player-guesses.repository';
import { SessionsRepository } from './sessions.repository';

@Injectable()
export class SessionsService {
  constructor(
    private readonly sessionsRepository: SessionsRepository,
    private readonly playerGuessRepository: PlayerGuessRepository,
    private readonly quotesHandler: GuessQuotesService,
    private readonly hardSessionHandler: HardSessionHandler,
  ) {}

  getTypeHandler(type: string): AbstractTypeHandler {
    switch (type) {
      case SessionType.GUESS_QUOTE:
        return this.quotesHandler;
    }

    throw new BadRequestException();
  }

  getModeHandler(mode: string): AbstractModeHandler {
    switch (mode) {
      case SessionMode.HARD:
        return this.hardSessionHandler;
      case SessionMode.INFINITE:
        return null;
    }

    throw new BadRequestException();
  }

  async create(type: string, mode: string) {
    const handler = this.getTypeHandler(type);
    const guess = await handler.create();

    // Create the game session
    const session = await this.sessionsRepository.create({
      id: nanoid(),
      guessId: guess.id,
      type,
      mode,
    });

    return { ...session, ...guess.data, _id: undefined };
  }

  async guess(sessionId: string, guess: GuessDTO) {
    const session = await this.sessionsRepository.findOne({ id: sessionId });
    if (!session) {
      throw new NotFoundException('Session could not be found');
    }

    if (session.finished) {
      throw new GoneException('Session is already finished');
    }

    const typeHandler = this.getTypeHandler(session.type);
    const verification = await typeHandler.verify(session.guessId, guess);

    // Note: add the player's guess for analytical purposes.
    await this.playerGuessRepository.addGuess(
      session.guessId,
      guess.answer,
      verification.correct,
    );

    const modeHandler = this.getModeHandler(session.mode);
    const modeHandling = verification.correct
      ? await modeHandler.correct(typeHandler, this.sessionsRepository, session)
      : await modeHandler.incorrect(
          typeHandler,
          this.sessionsRepository,
          session,
        );

    return { ...verification, ...modeHandling.session, ...modeHandling.data };
  }
}
