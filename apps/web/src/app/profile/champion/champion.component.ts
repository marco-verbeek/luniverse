import { Component, Input } from '@angular/core';
import { TopChampion } from '../../interfaces/topChampion';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']
})
export class ChampionComponent {
  @Input() topChampion!: TopChampion;

  constructor() { }
}
