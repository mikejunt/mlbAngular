import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';

@Pipe({
  name: 'nodupetrx'
})
export class NodupetrxPipe implements PipeTransform {

  transform(trx: Transaction[]): Transaction[] {
    let tofilter = [...trx];
    let filteredtrx = tofilter.filter((trx, index) => {
      let found = tofilter.findIndex(x => x.transaction_id === trx.transaction_id)
      return found === index
    })
    return filteredtrx
  }
}
