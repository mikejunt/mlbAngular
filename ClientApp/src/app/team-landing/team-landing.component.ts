import { Component, OnInit } from '@angular/core';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { StaticqueryService } from '../services/static-query.service';
import { Observable } from 'rxjs';
import * as Selectors from '../store/selectors'
import { Team } from '../interfaces/team.interface';

@Component({
  selector: 'app-team-landing',
  templateUrl: './team-landing.component.html',
  styleUrls: ['./team-landing.component.scss']
})
export class TeamLandingComponent implements OnInit {

  constructor(private store: Store<AppState>, private staticquery: StaticqueryService) {
    this.teamdata$ = this.store.select(Selectors.viewTeamDetails);
    this.teamdata$.subscribe(res => this.teamdata = res)
    this.curteam$ = this.store.select(Selectors.viewSelectedTeam)
    this.curteam$.subscribe(res => {this.curteam = res})
  }
  
  teamdata$: Observable<Team>
  teamdata: Team
  curteam$: Observable<string>
  curteam: string


  ngOnInit(): void {

  }

}
