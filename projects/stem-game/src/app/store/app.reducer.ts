import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../home/auth/store/reducers/auth.reducer'

export const appFeatureKey = 'app';

export interface AppState {
  auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
}
