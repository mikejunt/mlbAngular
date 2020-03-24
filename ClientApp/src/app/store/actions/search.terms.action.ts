import { createAction, props } from '@ngrx/store';
import { SearchTerms } from 'src/app/interfaces/search.terms.interface';


export const saveSearchTerms = createAction(
    '[SET SEARCH TERMS] Save Search Terms',
    props<{searchterms: SearchTerms}>()
)
