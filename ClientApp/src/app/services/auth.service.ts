import { Injectable } from '@angular/core';
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

  constructor(private router: Router, private http: HttpClient, private store: Store<AppState>) {

   }


}
