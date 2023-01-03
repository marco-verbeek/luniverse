import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@luni/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false, _id: false })
export class User extends AbstractDocument {
  @Prop({ index: true })
  luniId: Types.ObjectId;

  @Prop({ index: true })
  summonerName: string;

  @Prop({ index: true })
  puuid: string;

  @Prop()
  accountId: string;

  @Prop()
  summonerId: string;

  @Prop({ required: false, default: false })
  verified: boolean;

  @Prop({ default: false })
  queuing: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
