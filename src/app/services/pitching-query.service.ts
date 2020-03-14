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

  // fetchSeasonPitching(params: HttpParams) {
  //   this.http.get(this.seasonpitchingUrl, { params })
  //     .pipe(
  //       retry(3),
  //       debounceTime(5000),
  //       distinctUntilChanged(),
  //       catchError(err => this.logError(err)),
  //       map(res => res = res["cur_pitching"]["queryResults"]["row"]),
  //       map(res => res.map(res => {
  //         let finalIP: number = parseFloat(res["ip"]);
  //         finalIP = (Math.trunc(finalIP) + (((finalIP * 10) % 10) / 3));
  //         res["ipn"] = finalIP; return res
  //       })),
  //       tap(pitchers => {
  //         let leaguehr: number = this.collect(pitchers, "hr");
  //         let leaguebb: number = this.collect(pitchers, "bb");
  //         let leaguehb: number = this.collect(pitchers, "hb");
  //         let leagueso: number = this.collect(pitchers, "so");
  //         let leagueer: number = this.collect(pitchers, "er");
  //         let leagueip: number = this.collect(pitchers, "ipn");
  //         let leagueERA: number = ((leagueer / leagueip) * 9);
  //         this.lgFIPconstant = leagueERA - (((13 * leaguehr) + (3 * (leaguebb + leaguehb)) - (2 * leagueso)) / leagueip)
  //       }),
  //       map(res => res.map(res => {
  //         let pitcherFIP = ((((13 * parseInt(res["hr"])) + (3 * (parseInt(res["bb"]) + parseInt(res["hb"]))) - (2 * parseInt(res["so"]))) / res["ipn"]) + this.lgFIPconstant);
  //         res["fip"] = pitcherFIP.toFixed(2); return res
  //       })))
  //     .subscribe(response => { this.store.dispatch(Actions.savePitchers({ pitching: response })) })
  // }

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
