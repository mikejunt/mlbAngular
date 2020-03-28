import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Hitter } from 'src/app/interfaces/hitter.interface';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors'
import * as qclone from 'qclone'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-hitting-display',
  templateUrl: './hitting-display.component.html',
  styleUrls: ['./hitting-display.component.scss']
})
export class HittingDisplayComponent implements OnInit {
  hitters$: Observable<Hitter[]>;
  displayedColumns: string[] = ['player','name','g','tpa','r','hr','rbi','sb','cs','avg','obp','slg','ops','woba'];
  hitdata: MatTableDataSource<Hitter>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(private store: Store<AppState>) {
    this.hitters$ = this.store.select(Selectors.viewHitting);
  }

  sortTable(sort:Sort) {
    // console.log(sort) # for some reason MatSort needs an assigned function
  }


  ngOnInit(): void {
    this.hitters$.subscribe(hit => {
    let hitters = qclone.qclone(hit);
      this.hitdata = new MatTableDataSource(hitters);
      this.hitdata.paginator = this.paginator; 
      this.hitdata.sort = this.sort
    })
  }

}
