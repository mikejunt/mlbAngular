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
  fipColumns: string[] = ['Player', 'Fip','Ip']
  soColumns: string[] = ['Player', 'So','Ip']
  eraColumns: string[] = ['Player', 'Era','Ip']

  constructor(private store: Store<AppState>) {
    this.pitchers$ = this.store.select(Selectors.viewPitching);
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam);
  }

  ngOnInit(): void {
    this.pitchers$.subscribe(res =>{this.pitchers = res});
    this.displayteam$.subscribe(res => this.displayteam = res)
  }

}
