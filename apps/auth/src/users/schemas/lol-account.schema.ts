import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class LolAccount {
  @Prop()
  accountId: string;

  @Prop()
  profileIconId: number;

  @Prop()
  puuid: string;

  @Prop()
  summonerId: string;

  @Prop()
  summonerLevel: number;
}

export const LolAccountSchema = SchemaFactory.createForClass(LolAccount);
