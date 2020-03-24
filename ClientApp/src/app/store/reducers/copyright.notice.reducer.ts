import { createReducer } from "@ngrx/store";
import { saveCopyNotice } from '../actions';
import { Action, on } from '@ngrx/store';

export interface CopyNoticeState {
    copyright: string | string[]
}

export const initialCopyNoticeState:CopyNoticeState = {
        copyright: " Copyright 2020 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt  "
}



const copyNoticeReducer = createReducer(initialCopyNoticeState,
    on(saveCopyNotice, (state, { copynotice }) => ({...state, copyright: copynotice})),
);


export function setCopyNotice (state, action: Action) {
    return copyNoticeReducer(state, action)
}