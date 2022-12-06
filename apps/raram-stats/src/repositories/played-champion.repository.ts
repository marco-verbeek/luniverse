import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@luni/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PlayedChampion } from '../schemas/played-champion.schema';

@Injectable()
export class PlayedChampionRepository extends AbstractRepository<PlayedChampion> {
  constructor(
    @InjectModel(PlayedChampion.name)
    playedChampionModel: Model<PlayedChampion>,
  ) {
    super(playedChampionModel);
  }
}
