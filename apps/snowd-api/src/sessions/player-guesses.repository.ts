import { AbstractRepository, nanoid } from '@luni/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PlayerGuess } from './schemas/player-guess.schema';

@Injectable()
export class PlayerGuessRepository extends AbstractRepository<PlayerGuess> {
  constructor(@InjectModel(PlayerGuess.name) guessModel: Model<PlayerGuess>) {
    super(guessModel);
  }

  async addGuess(guessId: string, playerGuess: string, correct: boolean) {
    await this.model.updateOne(
      { guessId: guessId, guessed: playerGuess },
      {
        $set: {
          id: nanoid(),
          guessId: guessId,
          guessed: playerGuess,
          correct,
        },
        $inc: {
          amount: 1,
        },
      },
      { upsert: true },
    );
  }
}
