import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthTokenData } from 'projects/stem-game/src/app/shared/models/auth-token-data.model';
import { AuthData } from '../../../../shared/models/auth-data.model';

export enum Actions {
  SIGN_UP = '[Auth page] Signing up user',
  LOGIN = '[Auth page] Logging in user',
  AUTO_LOGIN = '[Auth page] Auto-login user',
  AUTH_COMPLETE = '[Auth page] Authentication completed successfully',
  AUTH_ERROR = '[Auth page] Authentication crashed successfully',
  LOG_OUT = '[Auth page] Logging out user',
  AUTH_TOKEN_FROM_REFRESH = '[Auth page] Creating new authentication token from refresh token'
}

export const SignUp = createAction(
  Actions.SIGN_UP,
  props<{ authData: AuthData }>()
);

export const Login = createAction(
  Actions.LOGIN,
  props<{ authData: AuthData }>()
);

export const AutoLogin = createAction(
  Actions.AUTO_LOGIN,
)

export const AuthComplete = createAction(
  Actions.AUTH_COMPLETE,
  props<{ authTokenData: AuthTokenData, navigate?: boolean }>()
);

export const AuthError = createAction(
  Actions.AUTH_ERROR,
  props<{ authError: string | Error | HttpErrorResponse }>()
);

export const LogOut = createAction(Actions.LOG_OUT);

export const AuthTokenFromRefresh = createAction(Actions.AUTH_TOKEN_FROM_REFRESH);
