import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LolApi } from 'twisted';
import { RegionGroups } from 'twisted/dist/constants';
import { ApiResponseDTO, MatchV5DTOs } from 'twisted/dist/models-dto';
import { MatchQueryV5DTO } from 'twisted/dist/models-dto/matches/query-v5';

@Injectable()
export class MatchV5Service {
  private readonly logger = new Logger(MatchV5Service.name);
  private readonly RiotAPI: LolApi;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get('RIOT_API_KEY');

    if (!apiKey) {
      this.logger.error('Invalid Riot API key!');
      return;
    }

    this.RiotAPI = new LolApi({ key: apiKey });
  }

  listMatches(puuid: string, region: RegionGroups, query: MatchQueryV5DTO) {
    return this.RiotAPI.MatchV5.list(puuid, region, query);
  }

  getMatchById(
    matchId: string,
    region: RegionGroups,
  ): Promise<ApiResponseDTO<MatchV5DTOs.MatchDto>> {
    return this.RiotAPI.MatchV5.get(matchId, region);
  }
}
