import * as UserActions from '../actions/user.actions';
import { setViewTeam } from '../actions';
import { Action, on, createReducer } from '@ngrx/store';

export interface UserState {
    user: {
        username: string,
        favteam: string
    }
}

export const initialUserState: UserState = {
    user: {
        username: "",
        favteam: "136"
    }
}

const userStateReducer = createReducer(initialUserState,
    on(UserActions.login, (state, { user }) => ({ ...state, user: user })),
    on(UserActions.logout, (state) => ({ ...initialUserState }))
);


export function updateLoginStatus(state, action: Action) {
    return userStateReducer(state, action)
}