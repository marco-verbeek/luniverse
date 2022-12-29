import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@luni/common';
import { ObjectId } from 'mongoose';

@Schema({ versionKey: false, _id: false })
export class User extends AbstractDocument {
  @Prop({ index: true })
  luniId: ObjectId;

  @Prop({ index: true })
  summonerName: string;

  @Prop({ index: true })
  puuid: string;

  @Prop()
  accountId: string;

  @Prop({ required: false, default: false })
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
