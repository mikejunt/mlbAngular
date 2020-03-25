import { createAction, props } from '@ngrx/store';

export const saveApiToken = createAction(
    '[Auth0] Save API Client Auth Token',
    props<{token: string}>()
)
