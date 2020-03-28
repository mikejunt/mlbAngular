import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Player } from 'src/app/interfaces/player.interface';
import * as Selectors from '../../store/selectors'

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.scss']
})
export class TeamRosterComponent implements OnInit {
  roster$: Observable<Player[]>
  roster: Player[];
  rosterHColumns: string[] = ['pos', 'number', 'bats', 'name', 'debut'];
  rosterPColumns: string[] = ['pos', 'number', 'throws', 'name', 'debut'];

  constructor(private store: Store<AppState>) {
    this.roster$ = this.store.pipe(select(Selectors.viewRoster));

  }

  ngOnInit(): void {
    this.roster$.subscribe(res => this.roster = res)
  }

}
