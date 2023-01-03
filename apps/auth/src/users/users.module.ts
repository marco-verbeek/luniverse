import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RiotAPIModule } from '@luni/riot-api';

import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RiotAPIModule,
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
