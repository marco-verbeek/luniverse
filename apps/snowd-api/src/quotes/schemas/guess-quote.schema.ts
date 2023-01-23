import { AbstractDocument } from '@luni/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ChampionQuote } from './champion-quote.schema';

@Schema({ versionKey: false, _id: false })
export class GuessQuote extends AbstractDocument {
  @Prop({ index: true, unique: true })
  id!: string;

  @Prop()
  championQuoteId: string;

  // Virtuals
  championQuote?: ChampionQuote;
}

export const GuessQuoteSchema = SchemaFactory.createForClass(GuessQuote);

GuessQuoteSchema.virtual('championQuote', {
  ref: 'ChampionQuote',
  localField: 'championQuoteId',
  foreignField: 'id',
  justOne: true,
  autopopulate: true,
});
