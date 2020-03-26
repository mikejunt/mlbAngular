import { createReducer } from "@ngrx/store";
import { setUser } from '../actions';
import { Action, on } from '@ngrx/store';

export interface AuthorizationState {
    user: Object
}

export const initialAuthorizationState:AuthorizationState = {
    user: {}
}



const authorizationReducer = createReducer(initialAuthorizationState,
    on(setUser, (state, { user }) => ({...state, user: user})),
);


export function setAuthorization (state, action: Action) {
    return authorizationReducer(state, action)
}