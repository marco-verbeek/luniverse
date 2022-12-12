import { IsString } from 'class-validator';

export class DiscordIdBySummonerNameDTO {
  @IsString({ each: true })
  summonerNames: string[];
}
