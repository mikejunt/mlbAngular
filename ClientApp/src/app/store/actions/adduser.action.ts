import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';



export const createNewUser = createAction(
    '[SIGNUP] Add New User', props<{newuser:User}>()
)
