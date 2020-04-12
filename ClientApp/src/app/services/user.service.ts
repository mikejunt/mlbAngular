import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Actions from '../store/actions';
import { AuthService } from './auth.service';
import { StaticqueryService } from './static-query.service';
import { RosterService } from './roster-query.service';
import { PitchingService } from './pitching-query.service';
import { HittingService } from './hitting-query.service';
import { HttpParams } from '@angular/common/http';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  favteam: string;
  user$: Observable<User>

  constructor(private store: Store<AppState>, private auth: AuthService, private staticquery:
    StaticqueryService, private roster: RosterService, private pitching: PitchingService,
    private hitting: HittingService) {
    this.user$ = this.auth.getUser$()
  }

  setUserData() {
    this.user$.subscribe(res => {
      let userfav: string = res["http://msj-baseball-favteam"]
      this.store.dispatch(Actions.login({ user: { username: res.nickname, favteam: userfav } }))
      this.store.dispatch(Actions.setViewTeam({ displayteam: userfav }))
      this.changeFavTheme(userfav)
      this.favteam = userfav
      this.getinitialData(userfav)
    })
  }

  getinitialData(teamid: string) {
    this.staticquery.fetchTeamDetails(teamid)
    const params = new HttpParams().set('team_id', `'${teamid}'`)
    this.roster.fetchRoster(params)
    this.pitching.fetchSeasonPitching({ searchyear: "2019", teamfilter: teamid, posfilter: "", ipfilter: "50" })
    this.hitting.fetchSeasonHitting({ searchyear: "2019", teamfilter: teamid, posfilter: "", pafilter: "300" })
  }

  changeFavTheme(newfav: string) {
    let body = document.getElementById("body")
    body.classList.remove(`bg${this.favteam}`)
    body.classList.add(`bg${newfav}`)
  }

}
