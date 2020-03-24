import { createReducer } from "@ngrx/store";
import { saveTrxList } from '../actions';
import { Action, on } from '@ngrx/store';
import { Transaction } from 'src/app/interfaces/transaction.interface';

export interface TransactionListState {
    transactions: Transaction[]
}

export const initialTransactionState:TransactionListState = {
        transactions: []
}



const trxListReducer = createReducer(initialTransactionState,
    on(saveTrxList, (state, { trxlist }) => ({...state, transactions: trxlist})),
);


export function saveTransactionList (state, action: Action) {
    return trxListReducer(state, action)
}