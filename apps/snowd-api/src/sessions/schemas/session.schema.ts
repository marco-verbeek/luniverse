import { AbstractDocument } from '@luni/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { SessionType } from '@luni/common';

@Schema({ versionKey: false, _id: false })
export class Session extends AbstractDocument {
  @Prop({ index: true, unique: true })
  id!: string;

  @Prop({ type: String, enum: Object.values(SessionType) })
  type!: string;

  @Prop()
  guessId!: string;

  @Prop({ default: 0 })
  streak?: number;

  @Prop({ default: false })
  finished?: boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
