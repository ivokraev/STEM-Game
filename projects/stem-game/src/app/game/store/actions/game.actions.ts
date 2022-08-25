import { createAction, props } from '@ngrx/store';

export enum Actions {
  FETCH_QUESTIONS = '[Game menu] Fetch questions from server',
  LOAD_QUESTIONS = '[Game menu] Load questions to store'
}

export const loadGames = createAction(
  Actions.FETCH_QUESTIONS
);




