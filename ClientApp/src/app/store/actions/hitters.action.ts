import { createAction, props } from '@ngrx/store';
import { Hitter } from '../../interfaces/hitter.interface';


export const saveHitters = createAction(
    '[SAVE HITTING DATA] Get Season Hitters',
    props<{hitting: Hitter[]}>()
)
