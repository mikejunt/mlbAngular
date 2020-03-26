import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { from, Observable, BehaviorSubject, throwError, combineLatest, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Actions from '../store/actions';
import { concatMap, tap, catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0Client$ = (from(createAuth0Client({
    domain: "dev-6-503zbg.auth0.com",
    client_id: "w4iUZ9vU8tGU6fL3xP015wr6z0irxll2",
    redirect_uri: `https://localhost:5001/landing`
  })) as Observable<Auth0Client>).pipe(
    shareReplay(1),
    catchError(err => throwError(err))
  );

  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );

  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();

  loggedIn: boolean = null;

  constructor(private router: Router, private http: HttpClient, private store: Store<AppState>) {
    this.localAuthSetup();
    this.handleAuthCallback();
  }

  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => {
        console.log(user,"User, from getuser$")
        this.userProfileSubject$.next(user)
      })  
    );
  }

  private localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = 'https://localhost:5001/landing') {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.loginWithRedirect({
        redirect_uri: `https://localhost:5001/landing`,
        appState: { target: redirectPath }
      });
    });
  }

  private handleAuthCallback() {
    const params = window.location.search;
    console.log(params, "Params, from handleAuthCallback")
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string;
      const authComplete$ = this.handleRedirectCallback$.pipe(
        tap(cbRes => {
          console.log(cbRes, "cbRes within handleauthcallback");
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),
        concatMap(() => {
          return combineLatest([this.getUser$(),this.isAuthenticated$]);
        })
      );
      console.log(targetRoute,"targetRoute, from Authcomplete")
      authComplete$.subscribe(([user, loggedIn]) => {
        console.log(user,loggedIn, "user, loggedIn from Authcomplete")
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: "w4iUZ9vU8tGU6fL3xP015wr6z0irxll2",
        returnTo: `https://localhost:5001`
      });
    });
  }

}
