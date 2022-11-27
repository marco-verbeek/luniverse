const { SlashCommandBuilder } = require('@discordjs/builders');

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
      case 200:
        message =
          ':white_check_mark: Successfully analysed your last ARAM game.';
        break;

      // TODO: handle differently
      case 401:
      case 403:
        message = `:x: An error occured: ${await analyseReq.json()}`;
        // ':x: You do not have a verified profile yet! Create one using /verify or ask an admin for verification.';
        break;

      default:
        message =
          ':warning: An error occured during the analysis. Please try again.';
    }

    console.log(await analyseReq.json());

    await interaction.reply(message);
  },
};
