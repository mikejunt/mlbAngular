import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/'
import { AppState } from '../store';
import { SearchTerms } from '../interfaces/search.terms.interface';
import { Pitcher } from '../interfaces/pitcher.interface';


@Injectable({
  providedIn: 'root'
})
export class PitchingService {
  private pitchUrl: string = "https://baseball-api.azurewebsites.net/api/pitching?"
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchSeasonPitching(terms: SearchTerms) {
    const params = new HttpParams()
    .set('season', terms.searchyear)
    .set('team', terms.teamfilter)
    .set('ip', terms.ipfilter)
    this.http.get(this.pitchUrl,{params}).subscribe((res:Pitcher[])=> {
       this.store.dispatch(Actions.savePitchers({ pitching: res }))})
    }

  logError(err) { console.log(err); return err }

}
