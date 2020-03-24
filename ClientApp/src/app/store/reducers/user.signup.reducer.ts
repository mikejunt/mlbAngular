import * as Actions from '../actions/index';
import { Action, on, createReducer } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';

export interface UserListState {
    userlist:User[]

}

export const initialUserListState: UserListState = {
    userlist: [
        { userid: 1, username: "Mike", password: "password", favteam: "119" },
        { userid: 2, username: "Sarah", password: "password", favteam: "134" },
        { userid: 3, username: "Justin", password: "password", favteam: "137" }
    ]
}

const newUserReducer = createReducer(initialUserListState,
    on(Actions.createNewUser, (state, { newuser }) => ({ ...state, userlist: [...state.userlist, newuser] })),

);


export function addNewUserStatus(state, action: Action) {
    return newUserReducer(state, action)
}