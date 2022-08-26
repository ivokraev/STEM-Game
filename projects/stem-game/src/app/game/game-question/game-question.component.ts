import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { IGameQuestion } from '../../shared/models/game/game-question.model';

import { selectCurrentQuestion } from '../store/selectors/game.selectors'

@Component({
  selector: 'stem-game-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})
export class GameQuestionComponent implements OnInit, OnDestroy {

  currentQuestion: IGameQuestion | null = null;
  currentQuestionSub!: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.currentQuestionSub = this.store.select(selectCurrentQuestion).pipe(
      tap((data: IGameQuestion | null) => this.currentQuestion = data)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.currentQuestionSub.unsubscribe();
  }

}
