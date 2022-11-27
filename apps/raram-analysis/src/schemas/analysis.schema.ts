import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@luni/common';
import { Team, TeamSchema } from './team.schema';
import { Player, PlayerSchema } from './player.schema';

@Schema({ versionKey: false })
export class Analysis extends AbstractDocument {
  @Prop({ required: true, unique: true, index: true })
  gameId: string;

  @Prop()
  gameDuration: number;

  @Prop()
  gameCreation: number;

  @Prop({ type: [TeamSchema] })
  teams: Team[];

  @Prop({ type: [PlayerSchema] })
  players: Player[];
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);
