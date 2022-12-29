import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RiotAPIModule } from '@luni/riot-api';
import * as Joi from 'joi';

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
    RiotAPIModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class QueuesModule {}
