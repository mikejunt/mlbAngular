import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';

@Pipe({
  name: 'teamtrx'
})
export class TeamtrxPipe implements PipeTransform {

  transform(trx: Transaction[], team: string): Transaction[] {
    let tofilter = [...trx];
    if (team === "") return trx
    let teamtrx = tofilter.filter(trx => trx["team_id"] === team)
    if (teamtrx.length === 0) {teamtrx.push({note:"No transactions found that met those criteria."})};
    return teamtrx;
  }

}
