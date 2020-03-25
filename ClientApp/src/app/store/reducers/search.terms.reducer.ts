import { createReducer } from "@ngrx/store";
import { saveSearchTerms } from '../actions';
import { Action, on } from '@ngrx/store';
import { SearchTerms } from 'src/app/interfaces/search.terms.interface';

export interface SearchTermState {
    searchterms: SearchTerms
}

export const initialSearchTermState:SearchTermState = {
        searchterms: {
            ipfilter: "100",
            pafilter: "500",
            teamfilter: "",
            posfilter: "",
            searchyear: "2019"
        }
}



const searchtermreducer = createReducer(initialSearchTermState,
    on(saveSearchTerms, (state, { searchterms }) => ({...state, searchterms: searchterms})),
);


export function setSearchTerms (state, action: Action) {
    return searchtermreducer(state, action)
}
