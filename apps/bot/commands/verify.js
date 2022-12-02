const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Link your League of Legends account with Luni!')
    .addStringOption((option) =>
      option
        .setName('summonername')
        .setDescription('Your LoL Summoner Name')
        .setRequired(true),
    ),

  async execute(interaction) {
    const authReq = await fetch('http://auth:3001/auth/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `discordId ${interaction.user.id}`,
      },
      body: JSON.stringify({
        summonerName: interaction.options.getString('summonername'),
      }),
    });

    let message;
    switch (authReq.status) {
      case 201:
        message =
          ':white_check_mark: Your account has been created/updated!\n:warning: Please confirm your account by messaging an admin.';
        break;

      case 409:
        message = ':thinking: You already have a verified account!';
        break;

      default:
        message =
          ':warning: An error occured during account verification. Please try again.';
    }

    await interaction.reply(message);
  },
};
