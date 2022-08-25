import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../reducers/game.reducer';

export const selectGameQestions = createFeatureSelector<State>('game');

export const selectCurrentQuestiion = createSelector(
  selectGameQestions,
  (state: State) => state.currentQestion
)
