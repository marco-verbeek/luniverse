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
    return this.model.aggregate([
      {
        $match: { discordId },
      },
      {
        $group: {
          _id: null,
          gamesPlayed: { $sum: '$gamesPlayed' },
          gamesWon: { $sum: '$gamesWon' },
          pointsWon: { $sum: '$pointsWon' },
          pointsLost: { $sum: '$pointsLost' },
          kills: { $sum: '$kills' },
          deaths: { $sum: '$deaths' },
          assists: { $sum: '$assists' },
          doubleKills: { $sum: '$doubleKills' },
          tripleKills: { $sum: '$tripleKills' },
          quadraKills: { $sum: '$quadraKills' },
          pentaKills: { $sum: '$pentaKills' },
          firstBloodKills: { $sum: '$firstBloodKills' },
          firstBloodAssists: { $sum: '$firstBloodAssists' },
          damageDone: { $sum: '$damageDone' },
          damageTaken: { $sum: '$damageTaken' },
          healed: { $sum: '$healed' },
          spell1Casts: { $sum: '$spell1Casts' },
          spell2Casts: { $sum: '$spell2Casts' },
          spell3Casts: { $sum: '$spell3Casts' },
          spell4Casts: { $sum: '$spell4Casts' },
          champLevel: { $sum: '$champLevel' },
          timePlayed: { $sum: '$timePlayed' },
          timeCCingOthers: { $sum: '$timeCCingOthers' },
          totalTimeSpentDead: { $sum: '$totalTimeSpentDead' },
          goldEarned: { $sum: '$goldEarned' },
          goldSpent: { $sum: '$goldSpent' },
          totalMinionsKilled: { $sum: '$totalMinionsKilled' },
          itemsPurchased: { $sum: '$itemsPurchased' },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
  }

  async getChampionSums(championId: number) {
    return this.model.aggregate([
      {
        $match: { championId },
      },
      {
        $group: {
          _id: null,
          gamesPlayed: { $sum: '$gamesPlayed' },
          gamesWon: { $sum: '$gamesWon' },
          pointsWon: { $sum: '$pointsWon' },
          pointsLost: { $sum: '$pointsLost' },
          kills: { $sum: '$kills' },
          deaths: { $sum: '$deaths' },
          assists: { $sum: '$assists' },
          doubleKills: { $sum: '$doubleKills' },
          tripleKills: { $sum: '$tripleKills' },
          quadraKills: { $sum: '$quadraKills' },
          pentaKills: { $sum: '$pentaKills' },
          firstBloodKills: { $sum: '$firstBloodKills' },
          firstBloodAssists: { $sum: '$firstBloodAssists' },
          damageDone: { $sum: '$damageDone' },
          damageTaken: { $sum: '$damageTaken' },
          healed: { $sum: '$healed' },
          spell1Casts: { $sum: '$spell1Casts' },
          spell2Casts: { $sum: '$spell2Casts' },
          spell3Casts: { $sum: '$spell3Casts' },
          spell4Casts: { $sum: '$spell4Casts' },
          champLevel: { $sum: '$champLevel' },
          timePlayed: { $sum: '$timePlayed' },
          timeCCingOthers: { $sum: '$timeCCingOthers' },
          totalTimeSpentDead: { $sum: '$totalTimeSpentDead' },
          goldEarned: { $sum: '$goldEarned' },
          goldSpent: { $sum: '$goldSpent' },
          totalMinionsKilled: { $sum: '$totalMinionsKilled' },
          itemsPurchased: { $sum: '$itemsPurchased' },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
  }
}
