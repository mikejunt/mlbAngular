import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, iif, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Selectors from '../store/selectors'
import { tap, map, concatMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router, private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | any | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.isAuthenticated$.pipe(
        concatMap(_ => this.auth.handleAuthCallback()),
        tap(res=>this.auth.getUser$().subscribe()),
        concatMap(result => iif(() => result.loggedIn, of(true),
         this.auth.login(state.url).pipe(map(_ => false)))));
  }
}
