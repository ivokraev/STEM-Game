import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthData } from '../../shared/models/auth-data.model';
import { AuthService } from '../auth.service';
import { AuthResponseData } from '../../shared/models/auth-response-data.model';
import { createUser, User } from '../../shared/models/user.model';

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

  signUp$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(AuthActions.Actions.SIGN_UP),
      map((actionData: any) => {
        return actionData.authData;
      }),
      switchMap((authData: AuthData) => {
        return this.authService.signUp(authData).pipe(
          map((recevedData: AuthResponseData) => {
            const user = createUser(recevedData);
            return AuthActions.AuthComplete({currentUser: user});
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
