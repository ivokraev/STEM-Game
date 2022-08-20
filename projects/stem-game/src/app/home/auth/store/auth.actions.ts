import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthData } from '../../../shared/models/auth-data.model';
import { User } from '../../../shared/models/user.model';

export enum Actions {
  SIGN_UP = '[Auth page] Signing up user',
  LOGIN = '[Auth page] Logging in user',
  AUTH_COMPLETE = '[Auth page] Authentication completed successfully',
  AUTH_ERROR = '[Auth page] Authentication crashed successfully',
  LOG_OUT = '[Auth page] Logging out user',
}

export const SignUp = createAction(
  Actions.SIGN_UP,
  props<{ authData: AuthData }>()
);

export const Login = createAction(
  Actions.LOGIN,
  props<{ authData: AuthData }>()
);

export const AuthComplete = createAction(
  Actions.AUTH_COMPLETE,
  props<{ authToken: string }>()
);

export const AuthError = createAction(
  Actions.AUTH_ERROR,
  props<{ authError: string | Error | HttpErrorResponse }>()
);

export const LogOut = createAction(Actions.LOG_OUT);
