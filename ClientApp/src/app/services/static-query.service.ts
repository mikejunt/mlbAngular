import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, retry, catchError } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/'
import { AppState } from '../store';


@Injectable({
  providedIn: 'root'
})

export class StaticqueryService {
  private trxUrl = 'https://lookup-service-prod.mlb.com/json/named.transaction_all.bam?';

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchTrx(params) {
    this.http.get(this.trxUrl, { params })
      .pipe(
        retry(3),
        catchError(err => this.logError(err)),
        map(res => res = res["transaction_all"]["queryResults"]["row"]))
      .subscribe(trans => {
        this.store.dispatch(Actions.saveTrxList({ trxlist: trans }))
      })
  }

  fetchTeams() {
    this.http.get('/api/teams/').pipe(
      retry(3),
      catchError(err => this.logError(err.msg)),
      map(res => res = res['data']))
      .subscribe(teamlist => {
        this.store.dispatch(Actions.saveTeams({ teamlist: teamlist }));
      })
  }

  fetchTeamDetails(teamid: string) {
    this.http.get(`/api/teams/${teamid}`).pipe(
      retry(3),
      catchError(err => this.logError(err.msg)),
      map(res => res = res['data']))
      .subscribe(teamdata => {
        this.store.dispatch(Actions.saveTeamDetails({ teamdetails: teamdata }))
      })
  }

  logError(err) { console.log(err); return err }

}