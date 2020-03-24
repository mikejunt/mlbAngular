import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/selectors'

@Component({
  selector: 'app-team-trx',
  templateUrl: './team-trx.component.html',
  styleUrls: ['./team-trx.component.scss']
})
export class TeamTrxComponent implements OnInit {
  trx$: Observable<Transaction[]>;
  trx: Transaction[]
  displayedColumns: string[] = ['trx'];
  displayteam$: Observable<string>
  displayteam: string

  constructor(private store: Store<AppState>) {
    this.trx$ = this.store.select(Selectors.viewTrx);
    this.displayteam$ = this.store.select(Selectors.viewSelectedTeam);
  }

  ngOnInit(): void {
    this.displayteam$.subscribe(res => this.displayteam = res)
    this.trx$.subscribe(res => this.trx = res)
  }

}
