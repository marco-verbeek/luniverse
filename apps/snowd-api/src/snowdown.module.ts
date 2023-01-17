import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, HealthModule, LoggingModule } from '@luni/common';
import * as Joi from 'joi';

import { SnowdownController } from './snowdown.controller';
import { SessionsModule } from './sessions/sessions.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/snowd-api/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    LoggingModule,
    DatabaseModule,
    HealthModule,
    SessionsModule,
    QuotesModule,
  ],
  controllers: [SnowdownController],
  providers: [],
})
export class SnowdownModule {}
