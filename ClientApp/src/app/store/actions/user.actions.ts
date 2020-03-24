import { createAction, props } from '@ngrx/store';


export const login = createAction(
    '[LOGIN SERVICE] Log In Attempt',
    props<{user: {username: string, favteam: string}}>()
)
export const logout = createAction('[LOGIN SERVICE] Logged Out')