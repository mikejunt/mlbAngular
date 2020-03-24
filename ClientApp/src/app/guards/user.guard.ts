import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Selectors from '../store/selectors'

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  username$: Observable<string>
  username: string
  constructor (private store: Store<AppState>, private router: Router) {
    this.username$ = this.store.select(Selectors.viewUserName);
    this.username$.subscribe(name => this.username = name)}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.username === "") {
      this.router.navigate(['login'])
      return false
    }
    else return true
  }
  
}
