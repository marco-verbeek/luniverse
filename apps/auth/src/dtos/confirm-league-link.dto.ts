import { IsString, Length } from 'class-validator';

export class ConfirmLeagueLinkDTO {
  @IsString()
  @Length(18, 18)
  accountId: string;
}
