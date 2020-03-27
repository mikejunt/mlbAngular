import { Component, AfterViewInit } from '@angular/core';
import { AppState } from './store';
import { Store } from '@ngrx/store';
import * as Selectors from './store/selectors';
import { AuthService } from './services/auth.service';
import { StaticqueryService } from './services/static-query.service';
import { RosterService } from './services/roster-query.service';
import { PitchingService } from './services/pitching-query.service';
import { HittingService } from './services/hitting-query.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = "Mike's Baseball App";

  constructor (private store: Store<AppState>, private auth: AuthService, private staticquery:
    StaticqueryService, private roster: RosterService, private pitching: PitchingService, 
    private hitting: HittingService, private router: Router) {
    let team$ = this.store.select(Selectors.viewUserFav)
    let team
    team$.subscribe(res=> team = res)
    this.getinitialData(team)

  }

  getinitialData(teamid: string) {
    this.staticquery.fetchTeamDetails(teamid)
    const params = new HttpParams().set('team_id', `'${teamid}'`)
    this.roster.fetchRoster(params)
    this.pitching.fetchSeasonPitching({searchyear: "2019", teamfilter: teamid, posfilter: "", ipfilter: "50"})
    this.hitting.fetchSeasonHitting({searchyear: "2019", teamfilter: teamid, posfilter: "", pafilter: "300"})
  }

  ngAfterViewInit(){
    setTimeout(() => this.router.navigate([`${window.location.pathname}`]),1000)
  }
}
