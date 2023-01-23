import { Injectable } from '@nestjs/common';

import { AbstractModeHandler } from '../abstract-mode-handler';
import { AbstractTypeHandler } from '../abstract-type-handler';
import { Session } from './schemas/session.schema';
import { SessionsRepository } from './sessions.repository';

@Injectable()
export class HardSessionHandler extends AbstractModeHandler {
  override async correct(
    typeHandler: AbstractTypeHandler,
    sessionsRepository: SessionsRepository,
    session: Session,
  ): Promise<{ session: Session; data: any }> {
    const hGuess = await typeHandler.create();

    await sessionsRepository.findOneAndUpdate(
      { id: session.id },
      { $inc: { streak: 1 }, $set: { guessId: hGuess.id } },
    );

    return {
      session: { ...session, streak: session.streak + 1 },
      data: hGuess.data,
    };
  }

  override async incorrect(
    typeHandler: AbstractTypeHandler,
    sessionsRepository: SessionsRepository,
    session: Session,
  ): Promise<{ session: Session; data: any }> {
    await sessionsRepository.findOneAndUpdate(
      { id: session.id },
      { $set: { finished: true } },
    );

    return { session: { ...session, finished: true }, data: null };
  }
}
