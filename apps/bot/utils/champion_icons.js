const champ_emojis = require('../data/champion_emojis.json');

const getChampionIcon = (championName) => {
  championName = championName.replace(' ', '');
  return champ_emojis[championName] ?? champ_emojis['Unknown'];
};

module.exports = { getChampionIcon };
