import * as fs from 'fs';
import { customAlphabet } from 'nanoid';
import * as puppeteer from 'puppeteer';
import { Champions } from './champions.js';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const customNanoId = customAlphabet(alphabet, 21);

const normalizeChampName = (championName) => {
  if (!championName.includes('_')) {
    return (
      championName.charAt(0).toUpperCase() + championName.slice(1).toLowerCase()
    );
  }

  let [a, b] = championName.split('_');
  a = a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
  b = b.charAt(0).toUpperCase() + b.slice(1).toLowerCase();

  return `${a}_${b}`;
};

const getAudioData = async (browser, championName) => {
  const page = await browser.newPage();

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

  for (const championName of Object.keys(Champions)) {
    // TODO: fix, not working
    if (fs.existsSync('./data/audio_data_' + championName)) {
      console.log(`${championName} already scraped. Skipping!`);
      continue;
    }

    const audioData = await getAudioData(browser, championName);

    fs.writeFileSync(
      `./data/audio_data_${championName}.json`,
      JSON.stringify([...audioData], null, 2),
    );

    console.log(`${championName} audio data saved!`);
  }

  console.log('All champion data saved.');

  await browser.close();
})();
