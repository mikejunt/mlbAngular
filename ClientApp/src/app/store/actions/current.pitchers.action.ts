import { createAction, props } from '@ngrx/store';
import { Pitcher } from '../../interfaces/pitcher.interface';


export const saveCurPitchers = createAction(
    '[SAVE PITCHING DATA] Save Current Yr Pitching Data',
    props<{pitching: Pitcher[]}>()
)