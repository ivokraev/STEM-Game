import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthData } from '../../shared/models/auth-data.model';
import { IAuthResponseData } from '../../shared/models/auth-response-data.model';
import { AuthTokenData } from '../../shared/models/auth-token-data.model';
import { IAuthTokenFromRefreshToken } from '../../shared/models/auth-token-from-refresh-token.model';
import { selectAuthRefreshToken } from './store/selectors/auth.selectors'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private store: Store) {}

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

  authCompleted(authToken: AuthTokenData, navigate: boolean | null = true): void {
    localStorage.setItem('authToken', JSON.stringify(authToken));
    if(navigate) {
      this.router.navigate(['/game']);
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  autoLogout(expirationDate: Date | null): Observable<void> {
    return new Observable<void>((subscriber: Subscriber<void>) => {
      if(expirationDate){
        const timeout: number = (expirationDate.getTime() - Date.now());
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

  refreshToken(): Observable<IAuthTokenFromRefreshToken> {
    return this.store.select(selectAuthRefreshToken).pipe(
      switchMap((refreshToken: string | null) => {
        return this.http.post<IAuthTokenFromRefreshToken>(
          'https://securetoken.googleapis.com/v1/token?key=' + environment.API_Key,
          {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          }
        );
      })
    )
  }
}
