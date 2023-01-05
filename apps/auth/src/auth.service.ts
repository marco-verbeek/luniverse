import { Injectable } from '@nestjs/common';
import { getProfileIconURL } from '@luni/champions';
import { SummonerV4Service } from '@luni/riot-api';
import { Regions } from 'twisted/dist/constants';

@Injectable()
export class AuthService {
  constructor(private readonly summonerV4Service: SummonerV4Service) {}

  async getPlayerProfile(summonerName: string) {
    const {
      response: { profileIconId, summonerLevel, name: riotSummonerName },
    } = await this.summonerV4Service.getSummonerByName(
      summonerName,
      Regions.EU_WEST,
    );

    return {
      name: riotSummonerName,
      level: summonerLevel,
      iconId: profileIconId,
      iconURL: getProfileIconURL(profileIconId),
    };
  }
}
