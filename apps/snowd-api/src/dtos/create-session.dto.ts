import { SessionMode } from '@luni/common';
import { IsIn, IsString } from 'class-validator';

export class CreateSessionDTO {
  @IsString()
  @IsIn(Object.values(SessionMode))
  mode: string;
}
