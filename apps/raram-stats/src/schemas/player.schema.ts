import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@luni/common';

@Schema({
  versionKey: false,
  _id: false,
})
export class Player extends AbstractDocument {
  @Prop({ index: true })
  puuid: string;

  @Prop()
  gamesPlayed: number;
  @Prop()
  gamesWon: number;

  @Prop()
  poroSnaxWon: number;
  @Prop()
  poroSnaxLost: number;

  @Prop()
  kills: number;
  @Prop()
  deaths: number;
  @Prop()
  assists: number;

  @Prop()
  doubleKills: number;
  @Prop()
  tripleKills: number;
  @Prop()
  quadraKills: number;
  @Prop()
  pentaKills: number;

  @Prop()
  firstBloodKills: number;
  @Prop()
  firstBloodAssists: number;

  @Prop()
  damageDone: number;
  @Prop()
  damageTaken: number;
  @Prop()
  healed: number;

  @Prop()
  spell1Casts: number;
  @Prop()
  spell2Casts: number;
  @Prop()
  spell3Casts: number;
  @Prop()
  spell4Casts: number;

  @Prop()
  championLevel: number;
  @Prop()
  timePlayed: number;
  @Prop()
  timeCCingOthers: number;
  @Prop()
  totalTimeSpentDead: number;

  @Prop()
  goldEarned: number;
  @Prop()
  goldSpent: number;
  @Prop()
  totalMinionsKilled: number;
  @Prop()
  itemsPurchased: number;

  // TODO: is more complex structure as summoners can be different between games
  // @Prop()
  // summoner1Casts: number;
  // @Prop()
  // summoner1Id: number;
  // @Prop()
  // summoner2Casts: number;
  // @Prop()
  // summoner2Id: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

PlayerSchema.virtual('poroSnax').get(function (this: Player) {
  return Math.ceil((this.poroSnaxWon - this.poroSnaxLost) * 1e2) / 1e2;
});
