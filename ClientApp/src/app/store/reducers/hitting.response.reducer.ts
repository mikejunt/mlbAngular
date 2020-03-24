import { createReducer } from "@ngrx/store";
import { saveHitters } from '../actions';
import { Hitter } from '../../interfaces/hitter.interface'

import { on } from '@ngrx/store'

export interface HittingState {
    hitting: Hitter[]
}


export const initialHittingState: HittingState = {
        hitting: []
}



const hittingReducer = createReducer(initialHittingState,
    on(saveHitters, (state, { hitting }) => ({...state, hitting: hitting}))
);


export function saveHitting(state, action) {
    return hittingReducer(state, action)
}