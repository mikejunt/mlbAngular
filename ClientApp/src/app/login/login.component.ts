import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StaticqueryService } from '../services/static-query.service';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  startdate: string
  enddate: string
  curyear: string

  loginForm = this.forms.group({
    username: ['', Validators.compose([Validators.required, Validators.maxLength(12), Validators.minLength(4)])],
    password: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(6)])]})

  constructor(private user: UserService, private staticquery: StaticqueryService,  private forms: FormBuilder, private auth: AuthService) { 
      this.enddate = moment().format('YYYYMMDD')
      this.startdate = moment().subtract(7,'days').format('YYYYMMDD')
      this.curyear = moment().subtract(1, 'year').format('YYYY')
     }

  ngOnInit(): void {
    this.staticquery.fetchTeams();
    const params = new HttpParams().set('sport_code', `'mlb'`).set('start_date', `'${this.startdate}'`).set('end_date', `'${this.enddate}'`);
    this.staticquery.fetchTrx(params)
  }

  loginCheck() { 
    // this.user.authenticate(this.loginForm.value.username, this.loginForm.value.password)
    this.auth.login()
  }
}
