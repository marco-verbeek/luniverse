const { SlashCommandBuilder } = require('@discordjs/builders');
const { embedAnalysis } = require('../utils/analysis_embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('raram')
    .setDescription('Analyse your most recent ARAM game!'),

  async execute(interaction) {
    const analyseReq = await fetch('http://raram-analysis:3000/analysis/last', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `discordId ${interaction.user.id}`,
      },
    });

    let message;
    switch (analyseReq.status) {
      case 401:
      case 403:
        message = `:x: An error occured: ${await analyseReq.json()}`;
        break;

      default:
        message =
          ':warning: An error occured during the analysis. Please try again.';
    }

    if (analyseReq.status === 200) {
      const analysis = await analyseReq.json();
      return embedAnalysis(interaction, analysis);
    }

    await interaction.reply(message);
  },
};
