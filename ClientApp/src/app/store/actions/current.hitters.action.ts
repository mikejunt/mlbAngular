import { createAction, props } from '@ngrx/store';
import { Hitter } from '../../interfaces/hitter.interface';


export const saveCurHitters = createAction(
    '[SAVE CUR HITTING DATA] Save Current Yr Hitting Data',
    props<{hitting: Hitter[]}>()
)
