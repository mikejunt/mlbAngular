import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';

@Pipe({
  name: 'teamtrx'
})
export class TeamtrxPipe implements PipeTransform {

  transform(trx: Transaction[], team: string): Transaction[] {
    let tofilter = [...trx];
    // let teamtrx = tofilter.filter(trx => trx["from_team_id"] === team || trx["team_id"] === team);
    let teamtrx = tofilter.filter(trx => trx["team_id"] === team)
    if (teamtrx.length === 0) {teamtrx.push({note:"search found no transactions in that period."})};
    return teamtrx;
  }

}
