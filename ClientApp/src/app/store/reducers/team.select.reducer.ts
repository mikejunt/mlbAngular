import { createReducer } from "@ngrx/store";
import { setViewTeam } from '../actions';
import { Action, on } from '@ngrx/store';

export interface TeamViewState {
    displayteam: string
}

export const initialViewTeamState:TeamViewState = {
        displayteam: "136"
}



const teamViewReducer = createReducer(initialViewTeamState,
    on(setViewTeam, (state, { displayteam }) => ({...state, displayteam: displayteam})),
);


export function changeViewTeam (state, action: Action) {
    return teamViewReducer(state, action)
}
