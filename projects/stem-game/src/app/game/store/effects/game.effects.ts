import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_REQUEST } from '@ngrx/router-store';

import { switchMap, map, tap } from 'rxjs';
import { GameQuestion } from '../../../shared/models/game/game-question.model';

import * as GameActions from '../actions/game.actions'
import { GameService } from '../service/game.service';

@Injectable()
export class GameEffects {
  fetchQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.Actions.FETCH_QUESTION),
      map((actionData: any) => {
        return actionData.questionId;
      }),
      switchMap((id: number) => {
        return this.gameService.fetchQuestion(id).pipe(
          map((currentQuestion: GameQuestion) => {
            return GameActions.LoadQuestion({
              currentQuestion: currentQuestion,
            });
          })
        );
      })
    );
  });

  questionAnswered$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.Actions.QUESTION_ANSWERED),
      map((actionData: any) => {
        return GameActions.FetchAnswer({playerAnswer: actionData.playerAnswer})
      })
    )
  })

  fetchAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.Actions.FETCH_ANSWER),
      map((actionData: any) => {
        return actionData.playerAnswer;
      }),
      switchMap((playerAnswer: string | number) => {
        return this.gameService.fetchAnswer(1).pipe(
          map((serverAnswer: string | number) => {
            return GameActions.CheckAnswers({playerAnswer: playerAnswer, serverAnswer: serverAnswer});
          })
        )
      })
    );
  });

  checkAnswers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.Actions.CHECK_ANSWERS),
      map((actionData: any) => {
        const isAnswerCorrect = this.gameService.checkAnswers(actionData.playerAnswer, actionData.serverAnswer);
        return GameActions.IsAnswerCorrect({isAnswerCorrect: isAnswerCorrect});
      })
    )
  })

  clearIsAnswerCorrect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_REQUEST),
      map(() => {
        return GameActions.ClearIsAnswerCorrect();
      })
    )
  })

  constructor(private actions$: Actions, private gameService: GameService) {}
}
