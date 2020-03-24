import { createReducer, Action } from "@ngrx/store";
import { saveCurPitchers } from '../actions';
import { Pitcher } from '../../interfaces/pitcher.interface'
import {  on } from '@ngrx/store'

export interface CurrentYrPitchingState {
    curpitching: Pitcher[]
}

export const initialCurPitchingState: CurrentYrPitchingState = {
        curpitching: [],

}

const curPitchingReducer = createReducer(initialCurPitchingState,
    on(saveCurPitchers, (state, { pitching }) => ({...state, curpitching: pitching})),
);

export function saveCurPitching(state, action: Action) {
    return curPitchingReducer(state, action)
}