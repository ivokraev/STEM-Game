import { Action, createReducer, on } from '@ngrx/store';
import { GameQuestion } from '../../../shared/models/game/game-question.model';

import * as GameActions from '../actions/game.actions'

export const gameFeatureKey = 'game';

export interface QuestionState {
  currentQuestion: GameQuestion | null,
  answer: string | null
}

export const initialState: QuestionState = {
  currentQuestion: null,
  answer: null
};

export const reducer = createReducer(
  initialState,
  on(GameActions.LoadQuestion, (state, { currentQuestion }): QuestionState => ({
    ...state,
    currentQuestion: currentQuestion
  }))
);
