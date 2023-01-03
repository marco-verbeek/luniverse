import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggingModule } from '@luni/common';
import { RiotAPIModule } from '@luni/riot-api';
import * as Joi from 'joi';

import { QueuesService } from './queues.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/raram-queues/.env',
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RIOT_API_KEY: Joi.string().required(),
      }),
    }),
    LoggingModule,
    RiotAPIModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [QueuesService],
})
export class QueuesModule {}
