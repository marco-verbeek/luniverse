import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { MatchHistory } from '../../interfaces/matchHistory';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  @Input() summonerName!: string;
  @Input() match!: MatchHistory;

  currentPlayerDetails!: Player;
  teamOne: Player[] = [];
  teamTwo: Player[] = [];

  constructor() { }

  ngOnInit() {
    const matchDetail = this.match.players.find(player => player.summonerName === this.summonerName);

    if (!matchDetail) {
      return;
    }

    this.currentPlayerDetails = matchDetail;
    this.teamOne = this.match.players.slice(0, 5);
    this.teamTwo = this.match.players.slice(5, 10);
  }
}
