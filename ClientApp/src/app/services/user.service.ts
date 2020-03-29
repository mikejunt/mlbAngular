import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors'
import { AuthService } from './auth.service';
import { StaticqueryService } from './static-query.service';
import { RosterService } from './roster-query.service';
import { PitchingService } from './pitching-query.service';
import { HittingService } from './hitting-query.service';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  favteam$: Observable<string>;
  favteam: string;
  user$: Observable<Object>

  constructor(private store: Store<AppState>, private auth: AuthService, private staticquery:
    StaticqueryService, private roster: RosterService, private pitching: PitchingService, 
    private hitting: HittingService) {
  }

  setUserData(){
    this.user$ = this.auth.getUser$()
    this.user$.subscribe(res=>{
      this.store.dispatch(Actions.login({user: {username: res['nickname'], favteam: res['http://msj-baseball-favteam']}}))
      this.store.dispatch(Actions.setViewTeam({displayteam: res['http://msj-baseball-favteam']}))})
    this.favteam$ = this.store.select(Selectors.viewUserFav);
    this.favteam$.subscribe(res => { this.changeFavTheme(res); this.favteam = res, this.getinitialData(res) })

  }

  getinitialData(teamid: string) {
    this.staticquery.fetchTeamDetails(teamid)
    const params = new HttpParams().set('team_id', `'${teamid}'`)
    this.roster.fetchRoster(params)
    this.pitching.fetchSeasonPitching({searchyear: "2019", teamfilter: teamid, posfilter: "", ipfilter: "50"})
    this.hitting.fetchSeasonHitting({searchyear: "2019", teamfilter: teamid, posfilter: "", pafilter: "300"})
  }

  changeFavTheme(newfav: string) {
    let body = document.getElementById("body")
    body.classList.remove(`bg${this.favteam}`)
    body.classList.add(`bg${newfav}`)
  }

}
