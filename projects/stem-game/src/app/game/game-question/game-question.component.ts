import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { IGameQuestion } from '../../shared/models/game/game-question.model';

import { selectCurrentQuestion } from '../store/selectors/game.selectors'
import { GameService } from '../store/service/game.service';

import * as GameActions from '../store/actions/game.actions'

@Component({
  selector: 'stem-game-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent implements OnInit, OnDestroy {

  answerForm!: FormGroup;

  currentQuestion: IGameQuestion | null = null;
  currentQuestionSub!: Subscription;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    // private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.currentQuestionSub = this.store
      .select(selectCurrentQuestion)
      .pipe(tap((data: IGameQuestion | null) => (this.currentQuestion = data)))
      .subscribe();

    this.answerForm = this.formBuilder.group({
      answer: [null, Validators.required],
    });

    // this.gameService.setAnswer(1, 681).subscribe();
  }

  ngOnDestroy(): void {
    this.currentQuestionSub.unsubscribe();
  }

  get answer(): string {
    return this.answerForm.controls['answer'].value;
  }

  onSubmit(): void {
    this.store.dispatch(GameActions.QestionAnswered({playerAnswer: this.answer}));
  }
}
