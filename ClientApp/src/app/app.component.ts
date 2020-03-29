import { Component, AfterViewInit } from '@angular/core';
import { AppState } from './store';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { StaticqueryService } from './services/static-query.service';
import { RosterService } from './services/roster-query.service';
import { PitchingService } from './services/pitching-query.service';
import { HittingService } from './services/hitting-query.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = "Mike's Baseball App";

  constructor (private store: Store<AppState>, private auth: AuthService, private user: UserService, private staticquery:
    StaticqueryService, private roster: RosterService, private pitching: PitchingService, 
    private hitting: HittingService, private router: Router) {
  }

  ngAfterViewInit(){
    setTimeout(() => this.router.navigate([`${window.location.pathname}`]),1000)
  }
}
