import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, LoggingModule, HealthModule } from '@luni/common';
import { RiotAPIModule } from '@luni/riot-api';
import * as Joi from 'joi';

import { UsersModule } from './users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RIOT_API_KEY: Joi.string().required(),
      }),
    }),
    LoggingModule,
    DatabaseModule,
    HealthModule,
    RiotAPIModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
