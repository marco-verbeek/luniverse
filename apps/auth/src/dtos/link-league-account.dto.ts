import { IsString, Length } from 'class-validator';

export class LinkLeagueAccountDTO {
  @IsString()
  @Length(3, 16)
  summonerName: string;
}
