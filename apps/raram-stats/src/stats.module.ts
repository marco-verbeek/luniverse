import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@luni/common';
import * as Joi from 'joi';

import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/raram-stats/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
