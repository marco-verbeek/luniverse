import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class Team {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  win: boolean;

  @Prop()
  kills: number;
  @Prop()
  assists: number;
  @Prop()
  deaths: number;
  @Prop()
  damageDone: number;
  @Prop()
  damageTaken: number;
  @Prop()
  healed: number;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

TeamSchema.virtual('kp').get(function () {
  return this.kills + this.assists;
});

TeamSchema.virtual('avgKP').get(function () {
  return (this.kills + this.assists) / 5;
});

TeamSchema.virtual('avgDeaths').get(function () {
  return this.deaths / 5;
});

TeamSchema.virtual('avgDmgDone').get(function () {
  return this.damageDone / 5;
});

TeamSchema.virtual('avgDmgTaken').get(function () {
  return this.damageTaken / 5;
});

TeamSchema.virtual('avgHealed').get(function () {
  return this.healed / 5;
});
