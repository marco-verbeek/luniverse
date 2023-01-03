import { IsString, MaxLength } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  @MaxLength(16)
  summonerName: string;
}
