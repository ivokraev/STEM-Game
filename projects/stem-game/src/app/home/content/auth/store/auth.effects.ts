import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthData } from '../../../../shared/models/auth-data.model';
import { AuthService } from '../auth.service';
import { IAuthResponseData } from '../../../../shared/models/auth-response-data.model';
import { createUser, User } from '../../../../shared/models/user.model';

@Injectable()
export class AuthEffects {
  authStarted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.Actions.AUTH_STARTED),
      map((actionData: any) => {
        let authData: AuthData = actionData.authData;
        if (authData.isNewUser) return AuthActions.SignUp({ authData });
        return AuthActions.Login({ authData });
      })
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.Actions.SIGN_UP),
      map((actionData: any) => {
        return actionData.authData;
      }),
      switchMap((authData: AuthData) => {
        return this.authService.signUp(authData).pipe(
          map((recevedData: IAuthResponseData) => {
            const user = createUser(recevedData);
            return AuthActions.AuthComplete({ currentUser: user });
          })
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
            const user = createUser(recevedData);
            return AuthActions.AuthComplete({ currentUser: user });
          })
        );
      })
    );
  });

  authComplete$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.Actions.AUTH_COMPLETE),
        map((actionData: any) => {
          return actionData.currentUser;
        }),
        tap((currentUser: User) => {
          this.authService.authCompleted(currentUser);
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
