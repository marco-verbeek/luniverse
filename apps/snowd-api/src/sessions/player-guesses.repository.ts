import { AbstractRepository } from '@luni/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PlayerGuess } from './schemas/player-guess.schema';

@Injectable()
export class PlayerGuessRepository extends AbstractRepository<PlayerGuess> {
  constructor(@InjectModel(PlayerGuess.name) guessModel: Model<PlayerGuess>) {
    super(guessModel);
  }
}
