import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/'
import { AppState } from '../store';
import { SearchTerms } from '../interfaces/search.terms.interface';


@Injectable({
  providedIn: 'root'
})
export class PitchingService {
  lgFIPconstant: number = 3.10

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  collect(players, stat: string): number {
    return players.reduce((acc: number, player: Object) => acc + parseFloat(player[stat]), 0)
  }

  fetchSeasonPitching(terms: SearchTerms) {
    if (terms.teamfilter === "allteams") {
      this.http.post('/api/pitching/all', { season: terms.searchyear, minip: terms.ipfilter }).subscribe(res => {
        if (!res['success']) { console.log(res) }
        else { this.store.dispatch(Actions.savePitchers({ pitching: res['data'] })) }
      })
    }
    else {
      this.http.post(`/api/pitching/${terms.teamfilter}`, { season: terms.searchyear, minip: terms.ipfilter }).subscribe(res => {
        if (!res['success']) { console.log(res) }
        else { this.store.dispatch(Actions.savePitchers({ pitching: res['data'] })) }
      })
    }
  }

  logError(err) { console.log(err); return err }

}
