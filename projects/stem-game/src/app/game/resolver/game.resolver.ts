import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, first, switchMap } from 'rxjs';
import { GameQuestion } from '../../shared/models/game/game-question.model';

import * as GameActions from '../store/actions/game.actions'
import { selectCurrentQuestion } from '../store/selectors/game.selectors'

@Injectable({
  providedIn: 'root'
})
export class GameResolver implements Resolve<GameQuestion | null> {

  constructor(private store: Store, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GameQuestion | null> {
    const id: number = parseInt(route.params['id']);
    return this.store.select(selectCurrentQuestion).pipe(
      switchMap((currentQestion: GameQuestion | null) => {
        if(!currentQestion || currentQestion.id !== id){
          this.store.dispatch(GameActions.FetchQuestion({questionId: id}));
          return this.actions$.pipe(ofType(GameActions.Actions.LOAD_QUESTION), first())
        }
        return this.store.select(selectCurrentQuestion);
      })
    );
  }
}
