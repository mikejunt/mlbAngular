import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, retry, catchError } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/'
import { AppState } from '../store';
import { Team } from '../interfaces/team.interface';


@Injectable({
  providedIn: 'root'
})

export class StaticqueryService {
  private trxUrl = 'https://lookup-service-prod.mlb.com/json/named.transaction_all.bam?';
  private teamsUrl = 'https://baseball-api.azurewebsites.net/api/teams';

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
    this.http.get(this.teamsUrl).pipe(
      retry(3),
      catchError(err => this.logError(err.msg)))
      .subscribe((teamlist: Team[]) => {console.log("from teamlist", teamlist);
        this.store.dispatch(Actions.saveTeams({ teamlist: teamlist }));
      })
  }

  fetchTeamDetails(teamid: string) {
    this.http.get(`${this.teamsUrl}/${teamid}`).pipe(
      retry(3),
      catchError(err => this.logError(err.msg)))
      .subscribe(teamdata => {console.log("hello from team detals", teamdata);
        this.store.dispatch(Actions.saveTeamDetails({ teamdetails: teamdata }))
      })
  }

  logError(err) { console.log(err); return err }

}