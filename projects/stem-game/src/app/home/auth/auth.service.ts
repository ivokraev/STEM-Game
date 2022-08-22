import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthData } from '../../shared/models/auth-data.model';
import { IAuthResponseData } from '../../shared/models/auth-response-data.model';
import { AuthTokenData } from '../../shared/models/auth-token-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signUp(authData: AuthData): Observable<IAuthResponseData> {
    return this.http.post<IAuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        environment.API_Key,
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }
    );
  }

  login(authData: AuthData): Observable<IAuthResponseData> {
    return this.http.post<IAuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        environment.API_Key,
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }
    );
  }

  authCompleted(authToken: AuthTokenData): void {
    localStorage.setItem('authToken', JSON.stringify(authToken));
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  autoLogout(expirationDate: Date | null): Observable<void> {
    return new Observable<void>((subscriber: Subscriber<void>) => {
      if(expirationDate){
        const timeout: number = (Date.now() - expirationDate.getTime());
        setTimeout(() => {
          subscriber.next();
        }, timeout);
      }
    })
  }

  autoLogin(): AuthTokenData | null {
    const localAuthData: {
      token: string | null;
      expirationDate: string | null;
      refreshToken: string | null;
    } | null = JSON.parse(localStorage.getItem('authToken')!);

    if (
      !localAuthData ||
      !localAuthData.token ||
      !(localAuthData.token.length > 0) ||
      !localAuthData.expirationDate ||
      !(new Date(localAuthData.expirationDate).getTime() > Date.now())
    ) {
      return null;
    }

    const authData: AuthTokenData = new AuthTokenData(
      localAuthData!.token,
      new Date(localAuthData!.expirationDate!),
      localAuthData!.refreshToken
    );
    return authData;
  }
}
