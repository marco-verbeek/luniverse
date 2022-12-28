import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SummonerProfile } from '../interfaces/summoner';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  getSummonerData(): SummonerProfile {
    // TODO: update call
    // Example GET /stats/players/ItsNexty
    return {
      "summonerName": "ItsNexty",
      "level": 188,
      "iconId": 122,
      "snax": 130,
      "topChampions": [
        {
          "championId": 40,
          "games": 12,
          "gamesWon": 8,
          "kills": 33,
          "deaths": 12,
          "assists": 56,
          "snaxGained": 44
        }
      ],
      "matchHistory": [
        {
          "win": true,
          "players": [
            {
              "championId": 117,
              "kills": 14,
              "deaths": 13,
              "assists": 21,
              "summonerName": "EmbudoMonotono",
              "snaxGain": 10.8
            },
            {
              "championId": 350,
              "kills": 8,
              "deaths": 7,
              "assists": 25,
              "summonerName": "JcoB32",
              "snaxGain": 13.5
            },
            {
              "championId": 17,
              "kills": 12,
              "deaths": 8,
              "assists": 17,
              "summonerName": "rocatauro36",
              "snaxGain": 10.2
            },
            {
              "championId": 110,
              "kills": 9,
              "deaths": 9,
              "assists": 26,
              "summonerName": "ItsPhlexy",
              "snaxGain": 12
            },
            {
              "championId": 40,
              "kills": 1,
              "deaths": 6,
              "assists": 36,
              "summonerName": "ItsNexty",
              "snaxGain": 18.8
            },
            {
              "championId": 53,
              "kills": 2,
              "deaths": 10,
              "assists": 24,
              "summonerName": "Nepali Sir",
              "snaxGain": -11.3
            },
            {
              "championId": 14,
              "kills": 5,
              "deaths": 7,
              "assists": 21,
              "summonerName": "macavelli alpha",
              "snaxGain": -5.6
            },
            {
              "championId": 432,
              "kills": 15,
              "deaths": 8,
              "assists": 16,
              "summonerName": "Kalyce",
              "snaxGain": -3.1
            },
            {
              "championId": 76,
              "kills": 8,
              "deaths": 7,
              "assists": 23,
              "summonerName": "KInG 27",
              "snaxGain": -2
            },
            {
              "championId": 145,
              "kills": 13,
              "deaths": 12,
              "assists": 14,
              "summonerName": "ELLUHCI",
              "snaxGain": -16.4
            }
          ]
        }
      ]
    }
  }
}
