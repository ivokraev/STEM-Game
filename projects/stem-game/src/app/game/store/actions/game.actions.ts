import { createAction, props } from '@ngrx/store';
import { GameQuestion } from '../../../shared/models/game/game-question.model';

export enum Actions {
  FETCH_QUESTION = '[Game menu] Fetch questions from server',
  LOAD_QUESTION = '[Game menu] Load questions to store',
  QUESTION_ANSWERED = '[Game question] Question was answered',
  FETCH_ANSWER = '[Game menu] Fetch answer',
  CHECK_ANSWERS = '[Game question] Check player\'s answer with server\'s answer',
  IS_ANSWER_CORRECT = '[Game] Writes to store is answer correct',
  CLEAR_IS_ANSWER_CORRECT = '[Game] Clears to store is answer correct',
}

export const FetchQuestion = createAction(
  Actions.FETCH_QUESTION,
  props<{questionId: number}>()
);

export const LoadQuestion = createAction(
  Actions.LOAD_QUESTION,
  props<{currentQuestion: GameQuestion}>()
)

export const QestionAnswered = createAction(
  Actions.QUESTION_ANSWERED,
  props<{playerAnswer: string | number}>()
)

export const FetchAnswer = createAction(
  Actions.FETCH_ANSWER,
  props<{playerAnswer: string | number}>()
)

export const CheckAnswers = createAction(
  Actions.CHECK_ANSWERS,
  props<{playerAnswer: string | number, serverAnswer: string | number}>()
)

export const IsAnswerCorrect = createAction(
  Actions.IS_ANSWER_CORRECT,
  props<({isAnswerCorrect: boolean})>()
)

export const ClearIsAnswerCorrect = createAction(
  Actions.CLEAR_IS_ANSWER_CORRECT,
)
