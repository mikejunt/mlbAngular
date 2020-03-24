import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/player.interface'

@Pipe({
  name: 'rosterPosition'
})
export class RosterPositionPipe implements PipeTransform {

  transform(roster, category: string): Array<Player> {
    let roster40 = [...roster]
    if (category === "pitcher") {
      let pitchers = roster40.filter((obj) => obj["primary_position"] === "1")
      return pitchers
    }
    else if (category === "catcher") {
      let catchers = roster40.filter((obj) => obj["primary_position"] === "2")
      return catchers
    }
    else if (category === "infield")  {
      let infielders = roster40.filter((obj) => obj["primary_position"] > "2" && obj["primary_position"] < "7")
      return infielders
    }
    else if (category === "outfield") {
      let outfielders = roster40.filter((obj) => obj["primary_position"] > "6")
      return outfielders
    }
    else if (category === "position")  {
      let position = roster40.filter((obj) => obj["primary_position"] > "1" && obj["primary_position"] <= "9")
      return position
    }
    return roster40
  }
}
