import { Component } from '@angular/core';
import { AppState } from './store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from './store/selectors'
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Mike's Baseball App";
  username$: Observable<string>
  favteam$: Observable<string>
  constructor (private store: Store<AppState>, private auth: AuthService) {
    this.username$ = this.store.select(Selectors.viewUserName)
    this.favteam$ = this.store.select(Selectors.viewUserFav)
  }
}
