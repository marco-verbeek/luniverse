import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@luni/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Player } from '../schemas/player.schema';

@Injectable()
export class PlayerRepository extends AbstractRepository<Player> {
  constructor(
    @InjectModel(Player.name)
    playerModel: Model<Player>,
  ) {
    super(playerModel);
  }
}
