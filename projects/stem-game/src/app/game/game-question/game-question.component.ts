import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap, map } from 'rxjs';
import { IGameQuestion } from '../../shared/models/game/game-question.model';

import { selectCurrentQuestion, selectIsAnswerCorrect } from '../store/selectors/game.selectors'
import { GameService } from '../store/service/game.service';

import * as GameActions from '../store/actions/game.actions'

@Component({
  selector: 'stem-game-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent implements OnInit, AfterViewInit, OnDestroy {

  answerForm!: FormGroup;

  isAnswerCorrect: boolean | null = null;
  isAnswerCorrectSub!: Subscription;

  currentQuestion$!: Observable<IGameQuestion | null>;

  @ViewChild('answerInput', {static: false}) answerInput!: ElementRef;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private renderer: Renderer2
    // private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.currentQuestion$ = this.store.select(selectCurrentQuestion);

    this.answerForm = this.formBuilder.group({
      answer: [null, Validators.required],
    });

    // this.gameService.setAnswer(2, "Княз Борис 1").subscribe();
  }

  ngAfterViewInit(): void {
    this.isAnswerCorrectSub = this.isAnswerCorrect$.subscribe({
      next: (isAnswerCorrect: boolean | null) => {
        this.setInputStyle(isAnswerCorrect);
      }
    });

  }

  ngOnDestroy(): void {
    this.isAnswerCorrectSub.unsubscribe();
  }

  setInputStyle(isAnswerCorrect: boolean | null): void {
    if(isAnswerCorrect === null) {
      this.renderer.addClass(this.answerInput.nativeElement, 'input-answer-null');
    }
    else if(isAnswerCorrect === true) {
      this.renderer.removeClass(this.answerInput.nativeElement, 'input-answer-null');
      this.renderer.removeClass(this.answerInput.nativeElement, 'input-answer-incorrect');

      this.renderer.addClass(this.answerInput.nativeElement, 'input-answer-correct');
    }
    else {
      this.renderer.removeClass(this.answerInput.nativeElement, 'input-answer-null');
      this.renderer.removeClass(this.answerInput.nativeElement, 'input-answer-correct');

      this.renderer.addClass(this.answerInput.nativeElement, 'input-answer-incorrect');
    }
  }

  get isAnswerCorrect$(): Observable<boolean | null> {
    return this.store.select(selectIsAnswerCorrect);
  }

  get answer(): string {
    return this.answerForm.controls['answer'].value;
  }

  onSubmit(): void {
    this.store.dispatch(GameActions.QestionAnswered({playerAnswer: this.answer}));
  }
}
