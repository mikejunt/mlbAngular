import { createReducer } from "@ngrx/store";
import { saveApiToken } from '../actions';
import { Action, on } from '@ngrx/store';

export interface AuthorizationState {
    apitoken: string
}

export const initialAuthorizationState:AuthorizationState = {
    apitoken: "",
}



const authorizationReducer = createReducer(initialAuthorizationState,
    on(saveApiToken, (state, { token }) => ({...state, apitoken: token})),
);


export function setAuthorization (state, action: Action) {
    return authorizationReducer(state, action)
}