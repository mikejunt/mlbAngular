import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  favteam$: Observable<string>;
  favteam: string;
  user: Object;
  user$: Observable<Object>

  constructor(private store: Store<AppState>, private auth: AuthService) {
    this.user$ = this.auth.getUser$()
    this.user$.subscribe(res=>{
      console.log("User:",res, window.location.search);
      this.user = res
      this.store.dispatch(Actions.login({user: {username: res['nickname'], favteam: res['http://msj-baseball-favteam']}}))
      this.store.dispatch(Actions.setViewTeam({displayteam: res['http://msj-baseball-favteam']}))})
    this.favteam$ = this.store.select(Selectors.viewUserFav);
    this.favteam$.subscribe(res => { this.changeFavTheme(res); this.favteam = res })
  }


  changeFavTheme(newfav: string) {
    let body = document.getElementById("body")
    body.classList.remove(`bg${this.favteam}`)
    body.classList.add(`bg${newfav}`)
  }

}
