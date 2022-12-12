import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@luni/common';

@Schema({ versionKey: false, _id: false })
export class Champion extends AbstractDocument {
  @Prop({ index: true, unique: true })
  id: number;
  @Prop({ unique: true })
  name!: string;

  @Prop()
  gamesPlayed: number;
  @Prop()
  gamesWon: number;

  @Prop()
  pointsWon: number;
  @Prop()
  pointsLost: number;

  @Prop()
  totalKP: number;
  @Prop()
  doubleKills: number;
  @Prop()
  tripleKills: number;
  @Prop()
  quadraKills: number;
  @Prop()
  pentaKills: number;

  @Prop()
  totalDamageDone: number;
  @Prop()
  totalDamageTaken: number;
  @Prop()
  totalHealed: number;
}

export const ChampionSchema = SchemaFactory.createForClass(Champion);
