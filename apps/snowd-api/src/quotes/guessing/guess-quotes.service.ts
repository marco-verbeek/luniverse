import { nanoid } from '@luni/common';
import { Injectable, NotFoundException } from '@nestjs/common';

import { AbstractTypeHandler } from '../../abstract-type-handler';
import { GuessDTO } from '../../dtos/guess.dto';
import { VerifiedGuessDTO } from '../../dtos/verified-guess.dto';
import { ChampionQuotesRepository } from '../champion-quotes.repository';
import { GuessQuotesRepository } from './guess-quotes.repository';

@Injectable()
export class GuessQuotesService extends AbstractTypeHandler {
  constructor(
    private readonly guessQuotesRepository: GuessQuotesRepository,
    private readonly championQuotesRepository: ChampionQuotesRepository,
  ) {
    super();
  }

  override async create(): Promise<{ id: string; data: object }> {
    const championQuote = await this.championQuotesRepository.getRandom();

    const guess = await this.guessQuotesRepository.create({
      id: nanoid(),
      championQuoteId: championQuote.id,
    });

    return { id: guess.id, data: { quoteUrl: championQuote.audio } };
  }

  override async verify(
    guessId: string,
    guess: GuessDTO,
  ): Promise<VerifiedGuessDTO> {
    const dbGuess = await this.guessQuotesRepository.findOne({ id: guessId });
    if (!dbGuess) {
      throw new NotFoundException('Session guess could not be found');
    }

    return {
      correct: Number(guess.answer) === dbGuess.championQuote.championId,
      solution: dbGuess.championQuote.championName,
    };
  }
}
