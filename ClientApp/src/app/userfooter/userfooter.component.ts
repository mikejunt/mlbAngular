import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as Selectors from '../store/selectors'
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';

@Component({
  selector: 'app-userfooter',
  templateUrl: './userfooter.component.html',
  styleUrls: ['./userfooter.component.scss']
})
export class UserfooterComponent implements OnInit {
  copyright$: Observable<string | string[]>;
  copyright: string | string[]
  
  constructor(private store: Store<AppState>) {
      this.copyright$ = this.store.pipe(select(Selectors.viewCopyNotice));
   }

  ngOnInit(): void {
    this.copyright$.subscribe(res => this.copyright = res);
  }

}
