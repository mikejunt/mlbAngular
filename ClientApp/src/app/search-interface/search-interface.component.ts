import { Component, OnInit } from '@angular/core';
import { StaticqueryService } from '../services/static-query.service';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import * as Selectors from '../store/selectors';
import { Team } from '../interfaces/team.interface';
import { HittingService } from '../services/hitting-query.service';
import { PitchingService } from '../services/pitching-query.service';
import { SearchTerms } from '../interfaces/search.terms.interface';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss']
})
export class SearchInterfaceComponent implements OnInit {
  teamlist$: Observable<Team[]>
  teamlist: Team[]
  mode: string
  searchterms: SearchTerms = {
    pafilter: "500",
    ipfilter: "150",
    teamfilter: "",
    posfilter: "",
    searchyear: "2019"
  }

  constructor(private staticquery: StaticqueryService, private router: Router, private actr: ActivatedRoute,
    private store: Store<AppState>, private hitting: HittingService, private pitching: PitchingService) {
    this.teamlist$ = store.pipe(select(Selectors.viewTeams));
  }

  ngOnInit(): void {
    this.mode = this.actr.snapshot.routeConfig.path
    this.teamlist$.subscribe(res => this.teamlist = res)
  }

  searchInit() {
    const terms = {...this.searchterms}
    this.store.dispatch(Actions.saveSearchTerms({searchterms: terms}))
    if (this.mode === "hitting") {
      console.log("seach button", terms)
      this.hitting.fetchSeasonHitting(terms)
    }
    if (this.mode === "pitching") {
      this.pitching.fetchSeasonPitching(terms)
    }
  }
}
