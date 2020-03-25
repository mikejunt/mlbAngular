import { Injectable } from '@angular/core';
import { secret } from '../client-secret';
// import createAuth0Client  from '@auth0/auth0-spa-js';
// import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as Actions from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0url: string = 'https://dev-6-503zbg.auth0.com/oauth/token';
  apiAuth0$: Observable<Object>


  constructor(private router: Router, private http: HttpClient, private store: Store<AppState>) {
    console.log("Hello I am the auth service constructor.")
    this.apiAuth0$ = this.getApiAuthorization()
    this.apiAuth0$.subscribe(res => {console.log(res)})
   }

   getApiAuthorization(): Observable<Object> {
    let cli_sec = secret;
    let apibody = {form: {
                  grant_type: 'client_credentials',
                  client_id: 'E57t51xdd4F19G3xv65ZYf6plda5tBL4',
                  client_secret: cli_sec,
                  audience: 'https://mybaseballapp.com'
    }}
    const apiHeader = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
    return this.http.post(this.auth0url,apibody,{headers: apiHeader})
   }
}
