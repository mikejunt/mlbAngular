import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as Reducers from './reducers';


export interface AppState {
  roster: Reducers.RosterState
  hitting: Reducers.HittingState
  pitching: Reducers.PitchingState
  teaminfo: Reducers.TeamState
  displayteam: Reducers.TeamViewState
  user: Reducers.UserState
  transactions: Reducers.TransactionListState
  copyright: Reducers.CopyNoticeState
  curpitching: Reducers.CurrentYrPitchingState
  curhitting: Reducers.CurrentYrHittingState
  userlist: Reducers.UserListState
  searchterms: Reducers.SearchTermState
  auth0: Reducers.AuthorizationState
}

export const reducers: ActionReducerMap<AppState> = {
  hitting: Reducers.saveHitting,
  roster: Reducers.saveRoster40,
  pitching: Reducers.savePitching,
  teaminfo: Reducers.saveTeamList,
  displayteam: Reducers.changeViewTeam,
  user: Reducers.updateLoginStatus,
  transactions: Reducers.saveTransactionList,
  copyright: Reducers.setCopyNotice,
  curpitching: Reducers.saveCurPitching,
  curhitting: Reducers.saveCurHitting,
  userlist: Reducers.addNewUserStatus,
  searchterms: Reducers.setSearchTerms,
  auth0: Reducers.setAuthorization,
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
