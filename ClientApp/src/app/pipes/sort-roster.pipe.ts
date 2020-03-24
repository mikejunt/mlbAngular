import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/player.interface'

@Pipe({
  name: 'sortRoster'
})
export class SortRosterPipe implements PipeTransform {

  transform(roster): Array<Player> {
    let roster40 = [...roster];
    roster40.sort(function (a, b) {
      if (a["primary_position"] > b["primary_position"]) {
        return 1;
      }
      else if (a["primary_position"] === b["primary_position"]) {
        return 0;
      }
      else if (a["primary_position"] < b["primary_position"]) {
        return -1;
      }
    })
    return roster40;
  }
}
