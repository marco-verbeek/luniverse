const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  async execute(interaction) {
    const message = new EmbedBuilder()
      .setAuthor({
        name: 'Here are your rARAM stats from your last played ARAM',
      })
      .setDescription(null)
      .setColor(0x009fff)
      .addFields(
        { name: 'Player', value: 'Player Line', inline: true },
        { name: 'K/D/A', value: 'LP Line', inline: true },
        { name: 'League Points', value: 'LP Line', inline: true },
      );

    await interaction.reply({
      content: 'Here are your rARAM stats from your last played ARAM:',
      embeds: [message.toJSON()],
      ephemeral: false,
    });
  },
};
