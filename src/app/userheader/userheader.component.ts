import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { Team } from '../interfaces/team.interface';
import * as Selectors from '../store/selectors';
import * as Actions from '../store/actions'
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { RosterService } from '../services/roster-query.service'
import { HittingService } from '../services/hitting-query.service';
import { PitchingService } from '../services/pitching-query.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.scss']
})
export class UserheaderComponent implements OnInit {
  username$: Observable<string>;
  username: string
  teamlist$: Observable<Team[]>;
  teamlist: Team[];
  displayteam$: Observable<string>
  displayteam: string

  constructor(private user: UserService, private staticquery: StaticqueryService,
    private store: Store<AppState>, private router: Router, private roster: RosterService,
    private hitting: HittingService, private pitching: PitchingService) {
    this.username$ = this.store.select(Selectors.viewUserName)
    this.teamlist$ = this.store.select(Selectors.viewTeams)
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam)
  }

  getData(teamid: string) {
    this.staticquery.fetchTeamDetails(teamid)
    this.showRoster(teamid)
    this.pitching.fetchSeasonPitching({searchyear: "2019", teamfilter: teamid})
  }

  ngOnInit(): void {
    this.username$.subscribe(res => this.username = res)
    this.teamlist$.subscribe(res => this.teamlist = res)
    this.displayteam$.subscribe(res => this.displayteam = res)
    this.getData(this.displayteam)
  }

  showRoster(team: string) {
    const params = new HttpParams().set('team_id', `'${team}'`)
    this.roster.fetchRoster(params)
  }

  viewteam(teamid: string) {
    this.pitching.fetchSeasonPitching({searchyear: "2019", teamfilter: teamid})
    this.store.dispatch(Actions.setViewTeam({ displayteam: teamid }))
    this.router.navigate(['/landing'])
  }

  viewstats(category: string) {
    this.router.navigate([`/${category}`])
  }

  logout() { this.user.logout() }

}
