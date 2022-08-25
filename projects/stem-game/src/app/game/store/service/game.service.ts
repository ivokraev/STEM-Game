import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameQuestion } from '../../../shared/models/game/game-question.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {

  }

  fetchQestion(id: number): Observable<any>{
    return this.http.get<any>(
      'https://stem-game-itpg-dev-default-rtdb.europe-west1.firebasedatabase.app/gameQuestions.json'
    )
  }
}
