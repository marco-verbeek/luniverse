import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule, RmqModule } from '@luni/common';
import * as Joi from 'joi';

import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { AnalyzedGame, AnalyzedGameSchema } from './schemas/game.schema';
import {
  PlayedChampion,
  PlayedChampionSchema,
} from './schemas/played-champion.schema';
import { GameRepository } from './repositories/game.repository';
import { PlayedChampionRepository } from './repositories/played-champion.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/raram-stats/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_RARAM_STATS_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    DatabaseModule,
    MongooseModule.forFeature([
      { name: AnalyzedGame.name, schema: AnalyzedGameSchema },
      { name: PlayedChampion.name, schema: PlayedChampionSchema },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService, GameRepository, PlayedChampionRepository],
})
export class StatsModule {}
