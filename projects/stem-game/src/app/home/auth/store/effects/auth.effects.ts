import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthData } from '../../../../shared/models/auth-data.model';
import { AuthService } from '../../auth.service';
import { IAuthResponseData } from '../../../../shared/models/auth-response-data.model';
import { HttpErrorResponse } from '@angular/common/http';

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
            return AuthActions.AuthComplete({ authToken: recevedData.idToken });
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
            return AuthActions.AuthComplete({ authToken: recevedData.idToken });
          }),
          catchError((authError: string | Error | HttpErrorResponse) =>
            of(AuthActions.AuthError({ authError: authError }))
          )
        );
      })
    );
  });

  authComplete$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.Actions.AUTH_COMPLETE),
        map((authData: any) => {
          return authData.authToken;
        }),
        tap((authToken: string) => {
          this.authService.authCompleted(authToken);
        })
      );
    },
    { dispatch: false }
  );

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
