import { createReducer } from "@ngrx/store";
import { saveTeams, saveTeamDetails } from '../actions';
import { Action, on } from '@ngrx/store';
import { Team } from 'src/app/interfaces/team.interface';

export interface TeamState {
    teamlist: Team[],
    teamdata: Team
}

export const initialTeamState:TeamState = {
        teamlist: [],
        teamdata: {}
}



const teamReducer = createReducer(initialTeamState,
    on(saveTeams, (state, { teamlist }) => ({...state, teamlist: teamlist})),
    on(saveTeamDetails, (state, { teamdetails }) => ({...state, teamdata: teamdetails}))
);


export function saveTeamList (state, action: Action) {
    return teamReducer(state, action)
}