import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthData } from '../../shared/models/auth-data.model';
import { IAuthResponseData } from '../../shared/models/auth-response-data.model';

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

  authCompleted(authToken: string): void {
    localStorage.setItem('authToken', authToken);
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}
