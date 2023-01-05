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

    let poroSnax = 0;
    const statsReq = await fetch(
      `http://raram-stats:3002/stats/players/${riotSummonerName}`,
    );

    if (statsReq.status === 200) {
      const { poroSnaxWon, poroSnaxLost } = await statsReq.json();
      poroSnax = poroSnaxWon - poroSnaxLost;
    }

    return {
      name: riotSummonerName,
      level: summonerLevel,
      iconId: profileIconId,
      iconURL: getProfileIconURL(profileIconId),
      poroSnax,
    };
  }
}
