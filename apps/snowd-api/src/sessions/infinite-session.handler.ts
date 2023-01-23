import { Injectable } from '@nestjs/common';

import { AbstractModeHandler } from '../abstract-mode-handler';
import { AbstractTypeHandler } from '../abstract-type-handler';
import { Session } from './schemas/session.schema';
import { SessionsRepository } from './sessions.repository';

@Injectable()
export class InfiniteSessionHandler extends AbstractModeHandler {
  override async correct(
    typeHandler: AbstractTypeHandler,
    sessionsRepository: SessionsRepository,
    session: Session,
  ): Promise<{ session: Session; data: any }> {
    const newGuess = await typeHandler.create();

    await sessionsRepository.findOneAndUpdate(
      { id: session.id },
      { $inc: { streak: 1 }, $set: { guessId: newGuess.id } },
    );

    return {
      session: { ...session, streak: session.streak + 1 },
      data: newGuess.data,
    };
  }

  override async incorrect(
    typeHandler: AbstractTypeHandler,
    sessionsRepository: SessionsRepository,
    session: Session,
  ): Promise<{ session: Session; data: any }> {
    const newGuess = await typeHandler.create();

    await sessionsRepository.findOneAndUpdate(
      { id: session.id },
      { $set: { guessId: newGuess.id, streak: 0 } },
    );

    return {
      session: { ...session, streak: 0 },
      data: newGuess.data,
    };
  }
}
