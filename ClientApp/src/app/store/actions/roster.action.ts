import { createAction, props } from '@ngrx/store';
import { Player} from '../../interfaces/player.interface';


export const saveRoster = createAction(
    '[SAVE 40 MAN ROSTER] Get Team Roster',
    props<{roster: Player[]}>()
)
