import { Module } from '@nestjs/common';
import { MatchV5Service } from './routes/match-v5.service';
import { SummonerV4Service } from './routes/summoner-v4.service';

@Module({
  providers: [SummonerV4Service, MatchV5Service],
  exports: [SummonerV4Service, MatchV5Service],
})
export class RiotAPIModule {}
