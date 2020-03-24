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
import { MatSnackBar } from '@angular/material/snack-bar';



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
  errmsg: string;

  constructor(private user: UserService, private store: Store<AppState>, private forms: FormBuilder, private router: Router, private snack: MatSnackBar) {
    this.teamlist$ = this.store.select(Selectors.viewTeams);
    
  }

  ngOnInit(): void {this.teamlist$.subscribe(res => this.teamlist = res)}

  onSubmit(e) {
    this.user.signup(this.newSignup.value.username, this.newSignup.value.password, this.newSignup.value.favteam).subscribe(result => {
      if (result['success']) { this.router.navigate(['login']) }
      else {this.snack.open(result['msg'],"",{duration: 3000})  }
    })
  }
}
