import { NotImplementedException } from '@nestjs/common';

import { AbstractTypeHandler } from './abstract-type-handler';
import { Session } from './sessions/schemas/session.schema';
import { SessionsRepository } from './sessions/sessions.repository';

export abstract class AbstractModeHandler {
  async correct(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    typeHandler: AbstractTypeHandler,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sessionsRepository: SessionsRepository,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    session: Session,
  ): Promise<{ session: Session; data: any }> {
    throw new NotImplementedException();
  }

  async incorrect(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    typeHandler: AbstractTypeHandler,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sessionsRepository: SessionsRepository,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    session: Session,
  ): Promise<{ session: Session; data: any }> {
    throw new NotImplementedException();
  }
}
