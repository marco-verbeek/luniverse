const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

require('dotenv').config();

if (!process.env.COMMAND_ID) {
  return console.error(
    'Error: Please prefix the node exec command with COMMAND_ID=<id>',
  );
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest
  .delete(
    Routes.applicationCommand(process.env.CLIENT_ID, process.env.COMMAND_ID),
  )
  .then(() =>
    console.log(
      'Successfully deleted application command with id ' +
        process.env.COMMAND_ID,
    ),
  )
  .catch(console.error);
