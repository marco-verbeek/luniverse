import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@luni/common';
import { RiotAPIModule } from '@luni/riot-api';
import * as Joi from 'joi';

import { UsersModule } from './users/users.module';
import { AuthController } from './auth.controller';

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
    DatabaseModule,
    RiotAPIModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
