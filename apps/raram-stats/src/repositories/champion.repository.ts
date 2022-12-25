import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@luni/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Champion } from '../schemas/champion.schema';

@Injectable()
export class ChampionRepository extends AbstractRepository<Champion> {
  constructor(
    @InjectModel(Champion.name)
    championModel: Model<Champion>,
  ) {
    super(championModel);
  }
}
