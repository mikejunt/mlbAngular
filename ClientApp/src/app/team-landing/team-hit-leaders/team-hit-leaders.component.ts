import { Component, OnInit } from '@angular/core';
import * as Selectors from '../../store/selectors'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Hitter } from 'src/app/interfaces/hitter.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-hit-leaders',
  templateUrl: './team-hit-leaders.component.html',
  styleUrls: ['./team-hit-leaders.component.scss']
})
export class TeamHitLeadersComponent implements OnInit {
  displayteam$: Observable<string>
  hitters$: Observable<Hitter[]>;
  wobaColumns: string[] = ['player', 'woba', 'tpa'];
  hrColumns: string[] = ['player', 'hr', 'tpa'];
  opsColumns: string[] = ['player', 'ops', 'tpa'];
  hitters: Hitter[];
  displayteam: string

  constructor(private store: Store<AppState>) {
    this.hitters$ = this.store.select(Selectors.viewHitting);
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam);
  }
  ngOnInit(): void {
    this.hitters$.subscribe(res => this.hitters = res);
    this.displayteam$.subscribe(res => this.displayteam = res)
  }

}
