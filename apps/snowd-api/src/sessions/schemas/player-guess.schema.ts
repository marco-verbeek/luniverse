import { AbstractDocument } from '@luni/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class PlayerGuess extends AbstractDocument {
  @Prop({ index: true, unique: true })
  id!: string;

  @Prop({ index: true, unique: true })
  guessId: string;

  @Prop({ index: true })
  guessed: string;

  @Prop()
  correct: boolean;

  @Prop({ default: 1 })
  amount: number;
}

export const PlayerGuessSchema = SchemaFactory.createForClass(PlayerGuess);
