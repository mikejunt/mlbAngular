import { createAction, props } from '@ngrx/store';
import { Team } from '../../interfaces/team.interface';


export const saveTeams = createAction(
    '[SAVE TEAM LIST] Get All Teams',
    props<{teamlist: Team[]}>()
)

export const saveTeamDetails = createAction(
    '[SAVE TEAM DETAILS] Get Team Desc Data',
    props<{teamdetails: Team}>()
)