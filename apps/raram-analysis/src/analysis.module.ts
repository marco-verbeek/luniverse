import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DatabaseModule,
  HealthModule,
  LoggingModule,
  RmqModule,
  STATS_QUEUE,
} from '@luni/common';
import { RiotAPIModule } from '@luni/riot-api';
import * as Joi from 'joi';

import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { DTHAnalysisService } from './dth-analysis.service';
import { AnalysisRepository } from './analysis.repository';
import { Analysis, AnalysisSchema } from './schemas/analysis.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/raram-analysis/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RIOT_API_KEY: Joi.string().required(),
      }),
    }),
    RmqModule.register({
      name: STATS_QUEUE,
    }),
    LoggingModule,
    RiotAPIModule,
    DatabaseModule,
    HealthModule,
    MongooseModule.forFeature([
      { name: Analysis.name, schema: AnalysisSchema },
    ]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService, DTHAnalysisService, AnalysisRepository],
})
export class AnalysisModule {}
