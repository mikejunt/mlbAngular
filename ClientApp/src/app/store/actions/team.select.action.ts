import { createAction, props } from '@ngrx/store';


export const setViewTeam = createAction(
    '[CHANGE THEME TEAM] Set Current Team',
    props<{displayteam: string}>()
)
