import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameQuestion } from '../../../shared/models/game/game-question.model';

import { gameFeatureKey } from '../reducers/game.reducer';

import { GameState } from '../reducers/index'

export const selectGameQestion = createFeatureSelector<GameState>(gameFeatureKey);


export const selectCurrentQuestion = createSelector(
  selectGameQestion,
  (state: GameState): GameQuestion | null => {
    return state.gameQuestion.currentQuestion;
  }
);

export const selectIsAnswerCorrect = createSelector(
  selectGameQestion,
  (state: GameState): boolean | null => {
    return state.gameQuestion.isAnswerCorrect
  }
)
