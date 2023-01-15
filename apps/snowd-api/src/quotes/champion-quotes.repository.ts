import { AbstractRepository } from '@luni/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChampionQuote } from './schemas/champion-quote.schema';

@Injectable()
export class ChampionQuotesRepository extends AbstractRepository<ChampionQuote> {
  constructor(
    @InjectModel(ChampionQuote.name) quoteModel: Model<ChampionQuote>,
  ) {
    super(quoteModel);
  }

  async getRandom(): Promise<ChampionQuote> {
    const count = await this.model.countDocuments();
    const randIdx = Math.floor(Math.random() * count);

    const quote = await this.model.find(
      {},
      { _id: 0 },
      { limit: 1, skip: randIdx },
    );

    return quote[0];
  }
}
