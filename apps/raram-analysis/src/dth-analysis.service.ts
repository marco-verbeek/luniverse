import { Injectable } from '@nestjs/common';
import { MatchV5DTOs } from 'twisted/dist/models-dto';

import { Analysis } from './schemas/analysis.schema';
import { Player } from './schemas/player.schema';
import { Team } from './schemas/team.schema';

@Injectable()
export class DTHAnalysisService {
  performMatchAnalysis(match: MatchV5DTOs.MatchDto): Omit<Analysis, '_id'> {
    const matchDataInfo = match.info;

    const players: Player[] = [];
    const teams: Team[] = [];

    // Iterate once over each player, keeping interesting stats and appending them to the team.
    for (const participant of matchDataInfo.participants) {
      const player: Player = {
        puuid: participant.puuid,
        teamId: participant.teamId,

        summonerName: participant.summonerName,
        championId: participant.championId,
        champion: participant.championName,

        kills: participant.kills,
        deaths: participant.deaths,
        assists: participant.assists,

        damageDone: participant.totalDamageDealtToChampions,
        damageTaken: participant.totalDamageTaken,
        healed:
          participant.totalDamageShieldedOnTeammates +
          participant.totalHealsOnTeammates +
          participant.totalHeal,

        doubleKills: participant.doubleKills,
        tripleKills: participant.tripleKills,
        quadraKills: participant.quadraKills,
        pentaKills: participant.pentaKills,

        // Will be calculated later.
        teamComparedKP: 0,
        teamComparedDeaths: 0,
        teamComparedDamageDone: 0,
        teamComparedDamageTaken: 0,
        teamComparedHealed: 0,

        damageDoneGain: 0,
        damageTakenGain: 0,
        deathsGain: 0,
        healedGain: 0,
        KPGain: 0,

        lpGain: 0,
      };

      players.push(player);

      let team = teams.find((team) => team.id === participant.teamId);
      if (!team) {
        team = {
          id: participant.teamId,
          win: participant.win,

          kills: 0,
          deaths: 0,
          assists: 0,

          damageDone: 0,
          damageTaken: 0,
          healed: 0,
        };

        teams.push(team);
      }

      team.kills += player.kills;
      team.assists += player.assists;
      team.deaths += player.deaths;

      team.damageDone += player.damageDone;
      team.damageTaken += player.damageTaken;
      team.healed += player.healed;
    }

    // Iterate a second time over players to calculate team-compared stats and LP gains.
    for (const player of players) {
      const team = teams.find((team) => team.id === player.teamId);

      // Calculate team-compared values
      player.teamComparedKP = this.teamComparedStat(
        player.kills + player.assists,
        (team.kills + team.assists) / 5,
      );
      player.teamComparedDeaths = this.teamComparedStat(
        player.deaths,
        team.deaths / 5,
      );
      player.teamComparedDamageDone = this.teamComparedStat(
        player.damageDone,
        team.damageDone / 5,
      );
      player.teamComparedDamageTaken = this.teamComparedStat(
        player.damageTaken,
        team.damageTaken / 5,
      );
      player.teamComparedHealed = this.teamComparedStat(
        player.healed,
        team.healed / 5,
      );

      // Calculate LP gains
      player.KPGain = this.calculateGain({
        gain: player.teamComparedKP,
        resultMultiplier: 2,
      });
      player.deathsGain = this.calculateGain({
        gain: player.teamComparedDeaths,
        resultMultiplier: -1,
      });
      player.damageDoneGain = this.calculateGain({
        gain: player.teamComparedDamageDone,
      });
      player.damageTakenGain = this.calculateGain({
        gain: player.teamComparedDamageTaken,
      });
      player.healedGain = this.calculateGain({
        gain: player.teamComparedHealed,
      });

      const winLoseGain = team.win ? 10 : -10;

      player.lpGain = this.format(
        winLoseGain +
          player.KPGain +
          player.deathsGain +
          Math.max(
            player.damageDoneGain,
            player.damageTakenGain,
            player.healedGain,
          ),
      );
    }

    return {
      gameId: match.metadata.matchId,

      gameCreation: matchDataInfo.gameCreation,
      gameDuration: matchDataInfo.gameDuration,

      teams,
      players,
    };
  }

  /**
   * Limits a certain number with following logic: <br/>
   * * if the number is lower than min, selects min. <br/>
   * * if the number is higher than max, selects max.
   * @param gain The number that is going to get limited.
   * @param min The lowest amount allowed
   * @param max The highest amount allowed
   * @returns {number} gain if between min and max, min if lower than min, max if higher than max
   */
  private limit = (gain = 0, min = -4, max = 4): number => {
    return gain < 0 ? Math.max(min, gain) : Math.min(gain, max);
  };

  /**
   * Calculates how much LP should be gained.
   * @note this is a helper function specific to my needs. You will probably never ever need it.
   * @param gain percentage that will determine pre-multiplier amount
   * @param multiplier will be multiplied with gain
   * @param resultMultiplier result of previous operation will be multiplied with resultMultiplier
   * @returns {number} 2-decimal float representing (gain*multiplier) * resultMultiplier
   */
  private calculateGain = ({
    gain = 0,
    multiplier = 10,
    resultMultiplier = 1,
  }): number => {
    return this.limit(resultMultiplier * +(multiplier * gain).toFixed(2));
  };

  /**
   * Formats the value provided to a 2-decimal float
   * @param value the value you wish to format
   * @returns {number} formatted value
   */
  private format = (value: number): number => {
    return parseFloat(value.toFixed(2));
  };

  // TODO: JSDoc
  private teamComparedStat(individual: number, team: number): number {
    return this.format((individual - team) / team);
  }
}
