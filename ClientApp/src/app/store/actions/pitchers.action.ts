import { createAction, props } from '@ngrx/store';
import { Pitcher } from '../../interfaces/pitcher.interface';


export const savePitchers = createAction(
    '[SAVE PITCHING DATA] Get Season Pitchers',
    props<{pitching: Pitcher[]}>()
)