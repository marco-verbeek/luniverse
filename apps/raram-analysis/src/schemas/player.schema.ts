import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class Player {
  @Prop({ required: true, index: true, select: false })
  puuid: string;
  @Prop()
  discordId: string;

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
  KPGain: number;
  @Prop()
  deathsGain: number;
  @Prop()
  damageDoneGain: number;
  @Prop()
  damageTakenGain: number;
  @Prop()
  healedGain: number;

  @Prop()
  lpGain: number;

  // TODO: keep spell{1-6}Casts, summoner{1|2}Casts and more
  // See ParticipantDto from twisted lib
  // @Prop()
  // goldEarned: number;
  // @Prop()
  // goldSpent: number;
  // @Prop()
  // totalMinionsKilled: number;

  // @Prop()
  // firstBloodKill: boolean;
  // @Prop()
  // firstBloodAssist: boolean;
  // @Prop()
  // longestTimeSpentLiving: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

PlayerSchema.virtual('kp').get(function () {
  return this.kills + this.assists;
});
