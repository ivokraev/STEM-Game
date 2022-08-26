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

export interface GameState {
  gameQuestion: fromGame.QuestionState
}

export const reducers: ActionReducerMap<GameState> = {
  gameQuestion: fromGame.reducer
};


export const metaReducers: MetaReducer<GameState>[] = !environment.production ? [] : [];
