import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthData } from '../../../shared/models/auth-data.model';
import { IAuthResponseData } from '../../../shared/models/auth-response-data.model';
import { User } from '../../../shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signUp(authData: AuthData): Observable<IAuthResponseData> {
    return this.http.post<IAuthResponseData>(
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

  login(authData: AuthData): Observable<IAuthResponseData> {
    return this.http.post<IAuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.API_Key,
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError((error) => this.handleHttpError(error))
    )
  }

  authCompleted(currentUser: User): void {
    this.writeTokenToCookie(currentUser);
  }

  logout(): void {
    this.deleteTokenFormCookie()
    this.router.navigate(['/']);
  }

  private deleteTokenFormCookie(): void {
    const token = 'token=';
    const expires = 'expires='.concat(new Date(0).toUTCString());
    document.cookie = [token, expires].join(';');
  }

  private writeTokenToCookie(currentUser: User): void {
    const token = 'token='.concat(currentUser.token);
    const expires = 'expires='.concat(currentUser.tokenExpirationDate.toUTCString());
    document.cookie = [token, expires].join(';');
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error.message);
  }
}
