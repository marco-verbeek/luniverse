// Note: this script bundles all audio_data_*.json files into a single .json file.
// Note post run: incredible speed. Less than a second of run time to combine 150 json files into a 125k lines file!

import { readdirSync, readFileSync, writeFileSync } from 'fs';

let files = readdirSync('./data');

let combinedData = [];

files.forEach((file) => {
  if (file.startsWith('audio_data_') && file.endsWith('.json')) {
    let data = readFileSync(`./data/${file}`);
    let jsonData = JSON.parse(data);

    combinedData = combinedData.concat(jsonData);
  }
});

let jsonString = JSON.stringify(combinedData);
writeFileSync('./data/combined_audio_data.json', jsonString);

console.log('Done!');
