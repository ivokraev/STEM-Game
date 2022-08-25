import { Action, createReducer, on } from '@ngrx/store';
import { GameQuestion } from '../../../shared/models/game/game-question.model';


export const gameFeatureKey = 'game';

export interface State {
  currentQestion: GameQuestion | null,
  answer: string | null
}

export const initialState: State = {
  currentQestion: null,
  answer: null
};

export const reducer = createReducer(
  initialState,

);
