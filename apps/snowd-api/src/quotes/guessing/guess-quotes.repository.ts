import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '@luni/common';

import { GuessQuote } from '../schemas/guess-quote.schema';

@Injectable()
export class GuessQuotesRepository extends AbstractRepository<GuessQuote> {
  constructor(@InjectModel(GuessQuote.name) quoteModel: Model<GuessQuote>) {
    super(quoteModel);
  }
}
