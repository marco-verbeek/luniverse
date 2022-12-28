import ddragon from './data/ddragon.json';

import { Champion } from './interfaces/champion';

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
