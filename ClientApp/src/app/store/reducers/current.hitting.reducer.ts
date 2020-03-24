import { createReducer } from "@ngrx/store";
import { saveCurHitters } from '../actions';
import { Hitter } from '../../interfaces/hitter.interface'

import { on } from '@ngrx/store'

export interface CurrentYrHittingState {
    curhitting: Hitter[]
}


export const initialCurHittingState: CurrentYrHittingState = {
        curhitting: []
}



const curHittingReducer = createReducer(initialCurHittingState,
    on(saveCurHitters, (state, { hitting }) => ({...state, curhitting: hitting}))
);


export function saveCurHitting(state, action) {
    return curHittingReducer(state, action)
}