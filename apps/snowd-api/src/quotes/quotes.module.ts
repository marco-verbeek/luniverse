import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChampionQuotesRepository } from './champion-quotes.repository';
import { GuessQuotesRepository } from './guessing/guess-quotes.repository';
import { GuessQuotesService } from './guessing/guess-quotes.service';
import { QuotesController } from './quotes.controller';
import {
  ChampionQuote,
  ChampionQuoteSchema,
} from './schemas/champion-quote.schema';
import { GuessQuote, GuessQuoteSchema } from './schemas/guess-quote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GuessQuote.name, schema: GuessQuoteSchema },
      { name: ChampionQuote.name, schema: ChampionQuoteSchema },
    ]),
  ],
  providers: [
    GuessQuotesService,
    GuessQuotesRepository,
    ChampionQuotesRepository,
  ],
  controllers: [QuotesController],
  exports: [GuessQuotesService],
})
export class QuotesModule {}
