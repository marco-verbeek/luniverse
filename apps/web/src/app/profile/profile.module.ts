import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionComponent } from './champion/champion.component';
import { MatchComponent } from './match/match.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: ':summonerName',
    component: ProfileComponent
  }
]

@NgModule({
  declarations: [ProfileComponent, ChampionComponent, MatchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
