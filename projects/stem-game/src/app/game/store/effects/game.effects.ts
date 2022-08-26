import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap, map } from 'rxjs';
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
            return GameActions.LoadQuestion({currentQuestion: currentQuestion})
          })
        );
      })
    )
  })

  constructor(private actions$: Actions, private gameService: GameService) {}
}
