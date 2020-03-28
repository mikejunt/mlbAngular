import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Pitcher } from 'src/app/interfaces/pitcher.interface';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/selectors';
import * as qclone from 'qclone'
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PitchingService } from 'src/app/services/pitching-query.service';

@Component({
  selector: 'app-pitching-display',
  templateUrl: './pitching-display.component.html',
  styleUrls: ['./pitching-display.component.scss']
})
export class PitchingDisplayComponent implements OnInit {
  pitchers$: Observable<Pitcher[]>;
  displayedColumns: string[] = ['player','name','w','l','sv','g','gs','ip','so','bb','hr','era','fip']
  pitchdata: MatTableDataSource<Pitcher>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(private store: Store<AppState>, private pitching: PitchingService) {
    this.pitchers$ = this.store.select(Selectors.viewPitching)
  }

  sortTable(sort:Sort) {
    // console.log(sort) # for some reason MatSort wants a function for sort
  }

  ngOnInit(): void {
    this.pitchers$.subscribe(hit => {
      let pitchers = qclone.qclone(hit);
        this.pitchdata = new MatTableDataSource(pitchers);
        this.pitchdata.paginator = this.paginator; 
        this.pitchdata.sort = this.sort
      })
  }

}
