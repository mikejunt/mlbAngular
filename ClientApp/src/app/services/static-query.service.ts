import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, retry, catchError } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/';
import * as moment from 'moment';
import { AppState } from '../store';
import { Team } from '../interfaces/team.interface';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class StaticqueryService {
  private trxUrl = 'https://lookup-service-prod.mlb.com/json/named.transaction_all.bam?';
  private teamsUrl = 'https://baseball-api.azurewebsites.net/api/teams';
  startdate: string
  enddate: string
  curyear: string

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.enddate = moment().format('YYYYMMDD');
    this.startdate = moment().subtract(7,'days').format('YYYYMMDD');
    this.curyear = moment().subtract(1, 'year').format('YYYY');
    const params = new HttpParams().set('sport_code', `'mlb'`).set('start_date', `'${this.startdate}'`).set('end_date', `'${this.enddate}'`);
    this.fetchTrx(params)
    this.fetchTeams()
   }

  fetchTrx(params: HttpParams) {
    this.http.get(this.trxUrl, { params })
      .pipe(
        retry(3),
        catchError(err => throwError(err)),
        map(res => res = res["transaction_all"]["queryResults"]["row"]))
      .subscribe(trans => {
        this.store.dispatch(Actions.saveTrxList({ trxlist: trans }))
      })
  }

  fetchTeams() {
    this.http.get(this.teamsUrl).pipe(
      retry(3),
      catchError(err => this.logError(err.msg)))
      .subscribe((teamlist: Team[]) => {
        this.store.dispatch(Actions.saveTeams({ teamlist: teamlist }));
      })
  }

  fetchTeamDetails(teamid: string) {
    this.http.get(`${this.teamsUrl}/${teamid}`).pipe(
      retry(3),
      catchError(err => this.logError(err.msg)))
      .subscribe(teamdata => {
        this.store.dispatch(Actions.saveTeamDetails({ teamdetails: teamdata }))
      })
  }

  logError(err) { console.log(err); return err }

}