import { createAction, props } from '@ngrx/store';

export const saveCopyNotice = createAction(
    '[GET TEAMS: COPYRIGHT NOTICE] Get Copy Notice',
    props<{copynotice}>()
)