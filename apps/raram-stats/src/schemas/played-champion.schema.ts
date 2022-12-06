import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@luni/common';

@Schema({ versionKey: false, _id: false })
export class PlayedChampion extends AbstractDocument {
  @Prop({ index: true })
  championId: number;
  @Prop({ index: true })
  discordId: string;

  @Prop()
  gamesPlayed: number;
  @Prop()
  gamesWon: number;
}

export const PlayedChampionSchema =
  SchemaFactory.createForClass(PlayedChampion);
