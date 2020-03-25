import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors'
import { Team } from 'src/app/interfaces/team.interface';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { StaticqueryService } from 'src/app/services/static-query.service';

@Component({
  selector: 'app-trx-display',
  templateUrl: './trx-display.component.html',
  styleUrls: ['./trx-display.component.scss']
})
export class TrxDisplayComponent implements OnInit {
  trx$: Observable<Transaction[]>;
  trx: Transaction[]
  displayedColumns: string[] = ['date', 'note'];
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  teamview: string = ""
  stdate = new FormControl(moment(0, "HH").subtract(7, 'days'));
  enddate = new FormControl(moment(0, "HH"))
  minMoment = moment(0, "HH").subtract(3, 'years').format()
  maxMoment = moment(0, "HH").format()
  minDate = new Date(this.minMoment)
  maxDate = new Date(this.maxMoment)

  constructor(private store: Store<AppState>, private staticquery: StaticqueryService) {
    this.trx$ = this.store.select(Selectors.viewTrx)
    this.teamlist$ = this.store.select(Selectors.viewTeams)
  }

  ngOnInit(): void {
    this.trx$.subscribe(res => this.trx = res)
    this.teamlist$.subscribe(res => this.teamlist = res)
  }

  getTrx() {
    let start = this.stdate.value
    let end = this.enddate.value
    if (this.valiDate(start, end)) {
      let startstring = moment(start).format("YYYYMMDD");
      let endstring = moment(end).format("YYYYMMDD");
      const params = new HttpParams().set('sport_code', `'mlb'`).set('start_date', `'${startstring}'`).set('end_date', `'${endstring}'`);
      this.staticquery.fetchTrx(params)
    }
  }

  valiDate(start: moment.Moment, end: moment.Moment) {
    let stvalid = (moment(start).isBetween(this.minMoment, end))
    let evalid = (moment(end).isBetween(start, moment()))
    return (stvalid && evalid)
  }


}
