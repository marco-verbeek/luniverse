import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LolApi } from 'twisted';
import { Regions } from 'twisted/dist/constants';
import { ApiResponseDTO, SummonerV4DTO } from 'twisted/dist/models-dto';

@Injectable()
export class SummonerV4Service {
  private readonly logger = new Logger(SummonerV4Service.name);
  private readonly RiotAPI: LolApi;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get('RIOT_API_KEY');

    if (!apiKey) {
      this.logger.error('Invalid Riot API key!');
      return;
    }

    this.RiotAPI = new LolApi({ key: apiKey });
  }

  getSummonerByName(
    name: string,
    region: Regions,
  ): Promise<ApiResponseDTO<SummonerV4DTO>> {
    return this.RiotAPI.Summoner.getByName(name, region);
  }

  getActiveGame(summonerId: string, region: Regions) {
    return this.RiotAPI.Spectator.activeGame(summonerId, region);
  }
}
