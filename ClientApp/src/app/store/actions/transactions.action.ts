import { createAction, props } from '@ngrx/store';
import { Transaction } from 'src/app/interfaces/transaction.interface';

export const saveTrxList = createAction(
    '[SAVE TRANSACTION SEARCH] Get All Transactions',
    props<{trxlist: Transaction[]}>()
)