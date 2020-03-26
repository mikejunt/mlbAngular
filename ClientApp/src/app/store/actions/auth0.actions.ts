import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
    '[AUTH0] User Data',
    props<{user: Object}>()
)
