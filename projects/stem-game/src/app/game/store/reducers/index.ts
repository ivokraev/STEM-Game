import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';

import * as fromGame from './game.reducer'

export const gameFeatureKey = 'game';

export interface State {
  gameQestion: fromGame.State
}

export const reducers: ActionReducerMap<State> = {
  gameQestion: fromGame.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
