import * as fs from 'fs';
import { customAlphabet } from 'nanoid';
import * as puppeteer from 'puppeteer';
import { Champions } from './champions.js';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const customNanoId = customAlphabet(alphabet, 21);

const normalizeChampName = (championName) => {
  // Unique cases, most of these don't work... TODO: fix
  switch (championName) {
    case Champions.DR_MUNDO:
      return 'Dr._Mundo';
    case Champions.JARVAN_IV:
      return 'Jarvan_IV';
    case Champions.AURELION_SOL:
      return 'Aurelion_Sol';
    case Champions.KAISA:
      return 'Kai%27Sa';
    case Champions.CHOGATH:
      return 'Cho%27Gath';
    case Champions.KHAZIX:
      return 'Kha%27Zix';
    case Champions.KOG_MAW:
      return 'Kog%27Maw';
    case Champions.LE_BLANC:
      return 'LeBlanc';
    case Champions.TRISTANA:
      return 'Tristana';
    case Champions.VELKOZ:
      return 'Vel%27Koz';
  }

  if (championName.includes('_')) {
    let [a, b] = championName.split('_');
    a = a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
    b = b.charAt(0).toUpperCase() + b.slice(1).toLowerCase();

    return `${a}_${b}`;
  }

  return (
    championName.charAt(0).toUpperCase() + championName.slice(1).toLowerCase()
  );
};

const getAudioData = async (page, championName) => {
  await page.goto(
    `https://leagueoflegends.fandom.com/wiki/${normalizeChampName(
      championName,
    )}/LoL/Audio`,
  );

  const audioData = await page.evaluate(() => {
    const liElements = Array.from(document.querySelectorAll('li'));
    return liElements
      .filter((liEl) => liEl.querySelector('.audio-button'))
      .filter((liEl) => {
        const audioEl = liEl.querySelector('audio');
        return audioEl && audioEl.src.includes('_Original_');
      })
      .map((liEl) => {
        const src = liEl.querySelector('audio').src;
        const text = liEl.querySelector('i')?.innerHTML;

        return {
          audio: src,
          text,
          type: 'QuoteType.OTHER',
        };
      });
  });

  return audioData.map((el) => ({
    ...el,
    id: customNanoId(),
    championId: Champions[championName],
  }));
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const championName of Object.keys(Champions)) {
    if (fs.existsSync(`./data/audio_data_${championName}.json`)) {
      console.log(`Skipping: ${championName}`);
      continue;
    }

    const audioData = await getAudioData(page, championName);

    fs.writeFileSync(
      `./data/audio_data_${championName}.json`,
      JSON.stringify([...audioData], null, 2),
    );

    console.log(`Saved: ${championName}`);
  }

  console.log("Done: all champions' data saved.");

  await browser.close();
})();
