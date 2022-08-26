import { createAction, props } from '@ngrx/store';
import { GameQuestion } from '../../../shared/models/game/game-question.model';

export enum Actions {
  FETCH_QUESTION = '[Game menu] Fetch questions from server',
  LOAD_QUESTION = '[Game menu] Load questions to store'
}

export const FetchQuestion = createAction(
  Actions.FETCH_QUESTION,
  props<{questionId: number}>()
);

export const LoadQuestion = createAction(
  Actions.LOAD_QUESTION,
  props<{currentQuestion: GameQuestion}>()
)



