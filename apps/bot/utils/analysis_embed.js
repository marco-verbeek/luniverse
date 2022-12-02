const { EmbedBuilder } = require('@discordjs/builders');
const { getChampionIcon } = require('./champion_icons');

const formatLPGain = (gain) => `${gain >= 0 ? '+' : ''}${gain}`;

const formatPlayerNames = ({ summonerName, championIcon }) => {
  return `${championIcon} | ${summonerName}`;
};

const formatPlayerKDA = ({
  kills,
  deaths,
  assists,
  damageDone,
  damageTaken,
  healed,
}) => {
  return `[${kills}/${deaths}/${assists}](${'https://google.com/'} "Damage Done: ${damageDone}\nDamage Taken: ${damageTaken}\nHealed: ${healed}")`;
};

const formatPlayerPoints = ({ lpGain, explained }) => {
  return `[${formatLPGain(lpGain)}](${'https://google.com/'} "${explained}")`;
};

const formatGainExplained = ({
  damageDoneGain,
  damageTakenGain,
  deathsGain,
  healedGain,
  kpGain,
  lpGain,
  teamComparedDamageDone,
  teamComparedDamageTaken,
  teamComparedDeaths,
  teamComparedHealed,
  teamComparedKP,
  win,
}) => {
  const winLoseKPDeaths = formatWinLoseKPDeathsExplained({
    win,
    teamComparedKP,
    teamComparedDeaths,
    kpGain,
    deathsGain,
  });

  const dth = formatDTHExplained({
    teamComparedDamageDone,
    damageDoneGain,
    teamComparedDamageTaken,
    damageTakenGain,
    teamComparedHealed,
    healedGain,
  });

  const totalLpExplained = formatTotalLPExplained({
    win,
    kpGain,
    deathsGain,
    lpGain,
    maxDTH: Math.max(damageDoneGain, damageTakenGain, healedGain),
  });

  return `${winLoseKPDeaths}\n\n${dth}\n\n${totalLpExplained}`;
};

const formatWinLoseKPDeathsExplained = ({
  win,
  teamComparedKP,
  teamComparedDeaths,
  kpGain,
  deathsGain,
}) => {
  const winExplained = win ? 'Win: +10 LP' : 'Lose: -10LP';
  const kpExplained = `KP: ${teamComparedKP}% (${formatLPGain(kpGain)})`;
  const deathsExplained = `Deaths: ${teamComparedDeaths}% (${formatLPGain(
    deathsGain,
  )})`;

  return `${winExplained}\n${kpExplained}\n${deathsExplained}`;
};

const formatDTHExplained = ({
  teamComparedDamageDone,
  damageDoneGain,
  teamComparedDamageTaken,
  damageTakenGain,
  teamComparedHealed,
  healedGain,
}) => {
  const damageDone = `Damage Dealt: ${teamComparedDamageDone}% (${formatLPGain(
    damageDoneGain,
  )})`;

  const damageTaken = `Damage Taken: ${teamComparedDamageTaken}% (${formatLPGain(
    damageTakenGain,
  )})`;

  const healed = `Total Healed: ${teamComparedHealed}% (${formatLPGain(
    healedGain,
  )})`;

  return ['+ Highest of:', damageDone, damageTaken, healed].join('\n');
};

const formatTotalLPExplained = ({
  win,
  kpGain,
  deathsGain,
  maxDTH,
  lpGain,
}) => {
  const winLp = `${win ? '+' : '-'}10`;
  return `${winLp} + ${kpGain} + ${deathsGain} + ${maxDTH} = ${lpGain}`;
};

const formatAnalysis = (analysis) => {
  const players = analysis.players;
  const { id: winningTeamId } = analysis.teams.find((team) => team.win);

  const playerNames = [],
    playerKDAs = [],
    playerPoints = [];

  for (let i = 0; i < 10; i++) {
    const player = players[i];

    playerNames.push(
      formatPlayerNames({
        summonerName: player.summonerName,
        championIcon: getChampionIcon(player.champion),
      }),
    );

    playerKDAs.push(
      formatPlayerKDA({
        kills: player.kills,
        assists: player.assists,
        deaths: player.deaths,
        damageDone: player.damageDone,
        damageTaken: player.damageTaken,
        healed: player.healed,
      }),
    );

    playerPoints.push(
      formatPlayerPoints({
        lpGain: player.lpGain,
        explained: formatGainExplained({
          damageDoneGain: player.damageDoneGain,
          damageTakenGain: player.damageTakenGain,
          deathsGain: player.deathsGain,
          healedGain: player.healedGain,
          kpGain: player.KPGain,
          lpGain: player.lpGain,
          teamComparedDamageDone: (player.teamComparedDamageDone * 100).toFixed(
            0,
          ),
          teamComparedDamageTaken: (
            player.teamComparedDamageTaken * 100
          ).toFixed(0),
          teamComparedDeaths: (player.teamComparedDeaths * 100).toFixed(0),
          teamComparedHealed: (player.teamComparedHealed * 100).toFixed(0),
          teamComparedKP: (player.teamComparedKP * 100).toFixed(0),
          win: player.teamId === winningTeamId,
        }),
      }),
    );
  }

  return { playerNames, playerKDAs, playerPoints };
};

const embedAnalysis = async (interaction, analysis, summonerName) => {
  await interaction.deferReply();

  const { playerNames, playerKDAs, playerPoints } = formatAnalysis(
    analysis,
    summonerName,
  );

  const redTeamAnalysisEmbed = new EmbedBuilder()
    .setAuthor({
      name: null,
    })
    .setDescription(null)
    .setColor(0x009fff)
    .addFields(
      {
        name: 'Summoner Name',
        value: playerNames.slice(0, 5).join('\n'),
        inline: true,
      },
      {
        name: 'K/D/A',
        value: playerKDAs.slice(0, 5).join('\n'),
        inline: true,
      },
      {
        name: 'Poro Points',
        value: playerPoints.slice(0, 5).join('\n'),
        inline: true,
      },
    );

  const blueTeamAnalysisEmbed = new EmbedBuilder()
    .setAuthor({
      name: null,
    })
    .setDescription(null)
    .setColor(0xff0040)
    .addFields(
      {
        name: 'Summoner Name',
        value: playerNames.slice(5, 10).join('\n'),
        inline: true,
      },
      {
        name: 'K/D/A',
        value: playerKDAs.slice(5, 10).join('\n'),
        inline: true,
      },
      {
        name: 'Poro Points',
        value: playerPoints.slice(5, 10).join('\n'),
        inline: true,
      },
    );

  await interaction.followUp({
    content: null,
    embeds: [redTeamAnalysisEmbed.toJSON(), blueTeamAnalysisEmbed.toJSON()],
    ephemeral: false,
  });
};

module.exports = { embedAnalysis };
