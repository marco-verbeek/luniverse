import { getChampionById } from '@luni/champions';
import { AbstractDocument, QuoteType } from '@luni/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class ChampionQuote extends AbstractDocument {
  @Prop({ index: true, unique: true })
  id!: string;

  @Prop()
  championId!: number;

  @Prop()
  audio!: string;

  @Prop()
  text: string;

  @Prop({ type: String, enum: Object.values(QuoteType) })
  type!: string;

  // Virtuals
  championName?: string;
}

export const ChampionQuoteSchema = SchemaFactory.createForClass(ChampionQuote);

ChampionQuoteSchema.virtual('championName').get(function (this: ChampionQuote) {
  return getChampionById(this.championId, ['name']).name;
});
