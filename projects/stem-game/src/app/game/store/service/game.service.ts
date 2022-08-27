import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameQuestion } from '../../../shared/models/game/game-question.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  fetchQuestion(id: number): Observable<GameQuestion> {
    return this.http.get<GameQuestion>(
      'https://stem-game-itpg-dev-default-rtdb.europe-west1.firebasedatabase.app/gameQuestions/question' +
        id +
        '.json'
    );
  }

  fetchAnswer(id: number): Observable<string | number> {
    return this.http.get<string | number>(
      'https://stem-game-itpg-dev-default-rtdb.europe-west1.firebasedatabase.app/answers/question' +
        id +
        '.json'
    );
  }

  checkAnswers(playerAnswer: string | number, serverAnswer: string | number): boolean {
    return playerAnswer == serverAnswer;
  }

  saveQuestion(): Observable<Object> {
    const gameQuestion = new GameQuestion(
      2,
      'Кой княз е покръстил българите',
      'text'
    );

    return this.http.put(
      'https://stem-game-itpg-dev-default-rtdb.europe-west1.firebasedatabase.app/gameQuestions/question' +
        gameQuestion.id +
        '.json',
      gameQuestion
    );
  }

  setAnswer(id: number, answer: string | number): Observable<Object> {
    return this.http.put(
      'https://stem-game-itpg-dev-default-rtdb.europe-west1.firebasedatabase.app/answers/question' +
        id +
        '.json',
      answer
    );
  }
}
