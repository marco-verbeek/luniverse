import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@luni/common';

@Schema({ versionKey: false, _id: false })
export class Player extends AbstractDocument {
  @Prop({ index: true, required: false })
  discordId?: string;

  @Prop()
  rankedGames: number;
  @Prop()
  wins: number;
  @Prop()
  poroPoints: number;

  @Prop()
  pointsWon: number;
  @Prop()
  pointsLost: number;

  // @Prop()
  // goldEarned: number;
  // @Prop()
  // goldSpent: number;

  @Prop()
  kills: number;
  @Prop()
  deaths: number;
  @Prop()
  assists: number;

  // @Prop()
  // firstBloods: number;
  // @Prop()
  // firstBloodAssists: number;

  @Prop()
  doubleKills: number;
  @Prop()
  tripleKills: number;
  @Prop()
  quadraKills: number;
  @Prop()
  pentaKills: number;

  @Prop()
  damageDone: number;
  @Prop()
  damageTaken: number;
  @Prop()
  healed: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
