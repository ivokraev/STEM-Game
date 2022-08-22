import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthData } from '../../../../shared/models/auth-data.model';
import { AuthService } from '../../auth.service';
import { IAuthResponseData } from '../../../../shared/models/auth-response-data.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthTokenDataFromResponse, AuthTokenData } from 'projects/stem-game/src/app/shared/models/auth-token-data.model';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.Actions.SIGN_UP),
      map((actionData: any) => {
        return actionData.authData;
      }),
      switchMap((authData: AuthData) => {
        return this.authService.signUp(authData).pipe(
          map((recevedData: IAuthResponseData) => {
            const inputAuthTokenData = AuthTokenDataFromResponse(recevedData);
            return AuthActions.AuthComplete({
              authTokenData: inputAuthTokenData,
            });
          }),
          catchError((authError: any) =>
            of(AuthActions.AuthError({ authError: authError }))
          )
        );
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.Actions.LOGIN),
      map((actionData: any) => {
        return actionData.authData;
      }),
      switchMap((authData: AuthData) => {
        return this.authService.login(authData).pipe(
          map((recevedData: IAuthResponseData) => {
            const inputAuthTokenData = AuthTokenDataFromResponse(recevedData);
            return AuthActions.AuthComplete({
              authTokenData: inputAuthTokenData,
            });
          }),
          catchError((authError: string | Error | HttpErrorResponse) =>
            of(AuthActions.AuthError({ authError: authError }))
          )
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.Actions.AUTO_LOGIN),
      map(() => {
        const token = this.authService.autoLogin();
        if (token) {
          return AuthActions.AuthComplete({ authTokenData: token });
        }
        return AuthActions.LogOut();
      })
    );
  });

  authComplete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.Actions.AUTH_COMPLETE),
      map((authData: any) => {
        return authData.authTokenData;
      }),
      tap((authToken: AuthTokenData) => {
        this.authService.authCompleted(authToken);
      }),
      switchMap((authToken: AuthTokenData) => {
        return this.authService.autoLogout(authToken.expirationDate).pipe(
          map(() => {
            return AuthActions.LogOut();
          })
        );
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.Actions.LOG_OUT),
        tap(() => {
          return this.authService.logout();
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
