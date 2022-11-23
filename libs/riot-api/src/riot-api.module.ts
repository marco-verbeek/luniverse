import { Module } from '@nestjs/common';
import { SummonerV4Service } from './summoner-v4.service';

@Module({
  providers: [SummonerV4Service],
  exports: [SummonerV4Service],
})
export class RiotAPIModule {}
