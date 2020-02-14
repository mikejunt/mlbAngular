import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../interfaces/team.interface'

@Pipe({
  name: 'sortTeam'
})
export class SortTeamPipe implements PipeTransform {

  transform(teams: Array<Team>, current?: string): Array<Team> {
    let teamsort = [...teams]
    teamsort.sort((a, b) => a["name_display_full"].localeCompare(b["name_display_full"]))  
    teamsort.sort((a, b) => a["mlb_org_id"] === current ? -1 : 0)
    return teamsort
  }
}
