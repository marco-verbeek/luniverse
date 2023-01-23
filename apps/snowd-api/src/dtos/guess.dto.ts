import { IsNotEmpty, IsString } from 'class-validator';

export class GuessDTO {
  @IsString()
  @IsNotEmpty()
  answer: string;
}
