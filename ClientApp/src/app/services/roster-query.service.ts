import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Actions from '../store/actions'

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  private rosterUrl = `https://lookup-service-prod.mlb.com/json/named.roster_40.bam?`;
  constructor(private http: HttpClient, private store: Store<AppState>) { }
  
  fetchRoster(params: HttpParams) {
    this.http.get(`${this.rosterUrl}`, { params }).pipe(
      map(res => res["roster_40"]["queryResults"]["row"]))
    .subscribe(res => {this.store.dispatch(Actions.saveRoster({roster: res}))})
  }
}
