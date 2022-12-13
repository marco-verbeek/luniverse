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

  async getPlayerSums(discordId: string) {
    const result = await this.model.aggregate([
      {
        $match: { discordId },
      },
      {
        $group: {
          totalAssists: { $sum: '$assists' },
          totalGamesWon: { $sum: '$gamesWon' },
        },
      },
    ]);

    console.log('sums', result);

    return result[0].totalSum;
  }
}
