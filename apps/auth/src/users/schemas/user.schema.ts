import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@luni/common';
import { LolAccount, LolAccountSchema } from './lol-account.schema';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop({ required: true, unique: true, index: true })
  discordId: string;

  @Prop({ index: true })
  summonerName: string;

  @Prop({ required: false, default: false })
  verified: boolean;

  @Prop({ type: LolAccountSchema })
  leagueAccount: LolAccount;
}

export const UserSchema = SchemaFactory.createForClass(User);
