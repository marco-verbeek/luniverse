import { NotImplementedException } from '@nestjs/common';

import { GuessDTO } from './dtos/guess.dto';

export abstract class AbstractGuessHandler {
  async verify(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    guessId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    guess: GuessDTO,
  ): Promise<{ correct: boolean }> {
    throw new NotImplementedException();
  }

  async create(): Promise<{ id: string; data: object }> {
    throw new NotImplementedException();
  }
}
