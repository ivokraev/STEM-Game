import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthData } from '../shared/models/auth-data.model';
import { AuthResponseData } from '../shared/models/auth-response-data.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(authData: AuthData): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.API_Key,
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError((error) => this.handleHttpError(error))
    )
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error.message);
  }
}
