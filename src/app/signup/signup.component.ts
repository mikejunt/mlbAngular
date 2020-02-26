import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Team } from '../interfaces/team.interface';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import * as Selectors from '../store/selectors'
import { CrossFieldMatcher } from './crossfield.matcher';
import { passwordMatchValidator } from './password-match.validator';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  teamlist: Team[]
  teamlist$: Observable<Team[]>
  newSignup = this.forms.group({
    username: ['', Validators.compose([Validators.required, Validators.maxLength(12), Validators.minLength(4)])],
    password: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(6)])],
    confirm: [''],
    favteam: ['', Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3)])]
  }, { validator: passwordMatchValidator })
  matcher: CrossFieldMatcher
  dupeuser: boolean = false

  constructor(private user: UserService, private store: Store<AppState>, private forms: FormBuilder, private router: Router) {
  this.teamlist$ = this.store.select(Selectors.viewTeams);
    this.teamlist$.subscribe(res => this.teamlist = res)
  }

  ngOnInit(): void { }

  onSubmit() {
    let result: boolean = this.user.signup(this.newSignup.value.username,this.newSignup.value.password,this.newSignup.value.favteam)
    if (result) {this.router.navigate(['login'])}
    else { this.dupeuser = true }
  }

}
