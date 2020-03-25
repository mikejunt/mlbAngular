import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors'
import { PitchingService } from './pitching-query.service';
import { StaticqueryService } from './static-query.service';
import { RosterService } from './roster-query.service';
import { HittingService } from './hitting-query.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userlist$: Observable<User[]>;
  userlist: User[];
  nextUserId: number = 4;
  favteam$: Observable<string>;
  favteam: string;

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>, 
    private hitting: HittingService, private pitching: PitchingService, 
    private staticquery: StaticqueryService, private roster: RosterService) {
    this.userlist$ = this.store.select(Selectors.viewUserList);
    this.userlist$.subscribe(res => this.userlist = res);
    this.favteam$ = this.store.select(Selectors.viewUserFav);
    this.favteam$.subscribe(res => { this.changeFavTheme(res); this.favteam = res })
  }

  authenticate(username: string, password: string) {
    // this.http.post('/api/user/login', { username: username, password: password }).subscribe(res => {
    //   if (res["success"]) {
    //     let favteam = res["favteam"];
        let favteam = "119";
        this.store.dispatch(Actions.login({ user: { username: username, favteam: favteam } }))
        this.store.dispatch(Actions.setViewTeam({ displayteam: favteam }))
        this.getinitialData(favteam)
        this.router.navigate(['landing'])
      }
  //     else return false
  //   })
  // }

  signup(inputname: string, inputpassword: string, inputfavteam: string){
    let newuser: User = { userid: this.nextUserId, username: inputname, password: inputpassword, favteam: inputfavteam }
    return this.http.post('/api/user/signup', newuser)
  }

  logout() {
    this.store.dispatch(Actions.logout());
    this.router.navigate(['/login'])
  }

  changeFavTheme(newfav: string) {
    let body = document.getElementById("body")
    body.classList.remove(`bg${this.favteam}`)
    body.classList.add(`bg${newfav}`)
  }

  getinitialData(teamid: string) {
    this.staticquery.fetchTeamDetails(teamid)
    const params = new HttpParams().set('team_id', `'${teamid}'`)
    this.roster.fetchRoster(params)
    this.pitching.fetchSeasonPitching({searchyear: "2019", teamfilter: teamid, posfilter: "all", ipfilter: "50"})
    this.hitting.fetchSeasonHitting({searchyear: "2019", teamfilter: teamid, posfilter: "all", pafilter: "300"})
  }

}
