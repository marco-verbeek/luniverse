import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuotesModule } from '../quotes/quotes.module';
import { PlayerGuessRepository } from './player-guesses.repository';
import { PlayerGuess, PlayerGuessSchema } from './schemas/player-guess.schema';
import { Session, SessionSchema } from './schemas/session.schema';
import { SessionsRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    MongooseModule.forFeature([
      { name: PlayerGuess.name, schema: PlayerGuessSchema },
    ]),
    QuotesModule,
  ],
  providers: [SessionsService, SessionsRepository, PlayerGuessRepository],
  exports: [SessionsService],
})
export class SessionsModule {}
