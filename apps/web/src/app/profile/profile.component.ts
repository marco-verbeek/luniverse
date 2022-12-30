import { Component, OnInit } from '@angular/core';
import { SummonerProfile } from '../interfaces/summoner';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  summoner!: SummonerProfile;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.summoner = this.profileService.getSummonerData();
  }
}
