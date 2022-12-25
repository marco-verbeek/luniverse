import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@luni/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AnalyzedGame } from '../schemas/game.schema';

@Injectable()
export class GameRepository extends AbstractRepository<AnalyzedGame> {
  constructor(@InjectModel(AnalyzedGame.name) gameModel: Model<AnalyzedGame>) {
    super(gameModel);
  }
}
