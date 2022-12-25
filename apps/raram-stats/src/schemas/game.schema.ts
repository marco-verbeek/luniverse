import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@luni/common';

@Schema({ versionKey: false, _id: false })
export class AnalyzedGame extends AbstractDocument {
  @Prop({ unique: true, index: true })
  gameId: string;
}

export const AnalyzedGameSchema = SchemaFactory.createForClass(AnalyzedGame);
