import { IsArray, IsString } from 'class-validator';

export class DiscordIdBySummonerNameDTO {
  // @IsString({ each: true })
  // @IsArray()
  summonerNames: string[];
}
