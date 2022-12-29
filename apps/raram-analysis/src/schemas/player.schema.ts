import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class Player {
  @Prop({ required: true, index: true, select: false })
  puuid: string;

  @Prop()
  luniId: string;

  @Prop()
  summonerName: string;
  @Prop()
  teamId: number;

  @Prop()
  championId: number;
  @Prop()
  champion: string;

  @Prop()
  kills: number;
  @Prop()
  deaths: number;
  @Prop()
  assists: number;

  @Prop()
  damageDone: number;
  @Prop()
  damageTaken: number;
  @Prop()
  healed: number;

  @Prop()
  doubleKills: number;
  @Prop()
  tripleKills: number;
  @Prop()
  quadraKills: number;
  @Prop()
  pentaKills: number;

  @Prop()
  teamComparedKP: number;
  @Prop()
  teamComparedDeaths: number;
  @Prop()
  teamComparedDamageDone: number;
  @Prop()
  teamComparedDamageTaken: number;
  @Prop()
  teamComparedHealed: number;

  @Prop()
  killParticipationGain: number;
  @Prop()
  deathsGain: number;
  @Prop()
  damageDoneGain: number;
  @Prop()
  damageTakenGain: number;
  @Prop()
  healedGain: number;

  @Prop()
  poroSnaxGain: number;

  @Prop()
  goldEarned: number;
  @Prop()
  goldSpent: number;
  @Prop()
  totalMinionsKilled: number;
  @Prop()
  itemsPurchased: number;

  @Prop()
  firstBloodKill: boolean;
  @Prop()
  firstBloodAssist: boolean;
  @Prop()
  totalTimeSpentDead: number;

  @Prop()
  champLevel: number;
  @Prop()
  timePlayed: number;
  @Prop()
  timeCCingOthers: number;

  @Prop()
  spell1Casts: number;
  @Prop()
  spell2Casts: number;
  @Prop()
  spell3Casts: number;
  @Prop()
  spell4Casts: number;

  @Prop()
  summoner1Casts: number;
  @Prop()
  summoner1Id: number;
  @Prop()
  summoner2Casts: number;
  @Prop()
  summoner2Id: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

PlayerSchema.virtual('kp').get(function () {
  return this.kills + this.assists;
});
