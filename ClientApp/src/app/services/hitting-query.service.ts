import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions/'
import { AppState } from '../store';
import { SearchTerms } from '../interfaces/search.terms.interface';
import { Hitter } from '../interfaces/hitter.interface';


@Injectable({
  providedIn: 'root'
})
export class HittingService {

  private hitUrl: string = "https://baseball-api.azurewebsites.net/api/hitting?"

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchSeasonHitting(terms: SearchTerms) {
    const params = new HttpParams()
    .set('season',terms.searchyear)
    .set('pa',terms.pafilter)
    .set('team',terms.teamfilter)
    .set('position',terms.posfilter);
    console.log(params)
    console.log(this.hitUrl)
    this.http.get(this.hitUrl,{params}).subscribe((res: Hitter[]) => {
      console.log("Hello its me hitters", res)
      this.store.dispatch(Actions.saveHitters({ hitting: res }))
      })
    }


  logError(err) { console.log(err); return err }

}
