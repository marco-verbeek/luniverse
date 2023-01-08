import * as ddragon from './data/ddragon.json';

import { Champion } from './interfaces/champion';

// TODO: move to appropriate lib
export const getProfileIconURL = (iconId: number): string => {
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${iconId}.jpg`;
};

export const getChampionIconURL = (championId: number): string => {
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;
};

/**
 * Finds a champion by its id.
 * @param {number} championId - The id of the champion to find.
 * @param {Array<keyof Champion>} fields - The champion's fields to return.
 * @returns the fields of champion with the specified id.
 */
export const getChampionById = (
  championId: number,
  fields: Array<keyof Champion>,
): Partial<Champion> => {
  const champion = Object.values(ddragon.data).find((champion) => {
    return Number(champion.key) === championId;
  });

  return selectFields(champion, fields);
};

/**
 * Selects specified fields from an object.
 * @param {any} obj - The object to select fields from.
 * @param {string[]} fields - An array of strings representing the field names to select.
 * @returns {any} An object containing only the selected fields.
 */
const selectFields = (obj: any, fields: string[]) => {
  const selected = {};
  const keys = Object.keys(obj);

  for (const key of keys) {
    if (fields.includes(key)) {
      selected[key] = obj[key];
    }
  }

  return selected;
};
