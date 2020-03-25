import { Component, OnInit } from '@angular/core';
import * as Selectors from '../../store/selectors'
import { Observable } from 'rxjs';
import { Pitcher } from 'src/app/interfaces/pitcher.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-team-pitch-leaders',
  templateUrl: './team-pitch-leaders.component.html',
  styleUrls: ['./team-pitch-leaders.component.scss']
})
export class TeamPitchLeadersComponent implements OnInit {
  displayteam$: Observable<string>
  pitchers$: Observable<Pitcher[]>
  displayteam: string
  pitchers: Pitcher[]
  fipColumns: string[] = ['player', 'fip','ip']
  soColumns: string[] = ['player', 'so','ip']
  eraColumns: string[] = ['player', 'era','ip']

  constructor(private store: Store<AppState>) {
    this.pitchers$ = this.store.select(Selectors.viewPitching);
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam);
  }

  ngOnInit(): void {
    this.pitchers$.subscribe(res =>{this.pitchers = res});
    this.displayteam$.subscribe(res => this.displayteam = res)
  }

}
