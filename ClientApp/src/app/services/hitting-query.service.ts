import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/'
import { AppState } from '../store';
import { SearchTerms } from '../interfaces/search.terms.interface';


@Injectable({
  providedIn: 'root'
})
export class HittingService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchSeasonHitting(terms: SearchTerms) {
    if (terms.teamfilter === "allteams") {
      this.http.post('/api/hitting/all', { season: terms.searchyear, minpa: terms.pafilter, posfilter: terms.posfilter }).subscribe(res => {
        if (!res['success']) { console.log(res) }
        else { this.store.dispatch(Actions.saveHitters({ hitting: res['data'] })) }
      })
    }
    else {
      this.http.post(`/api/hitting/${terms.teamfilter}`, { season: terms.searchyear, minpa: terms.pafilter, posfilter: terms.posfilter }).subscribe(res => {
        if (!res['success']) { console.log(res) }
        else { this.store.dispatch(Actions.saveHitters({ hitting: res['data'] })) }
      })
    }
  }

  logError(err) { console.log(err); return err }

}
