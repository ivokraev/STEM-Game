import { createAction, emptyProps, props } from '@ngrx/store';
import { AuthData } from '../../../../shared/models/auth-data.model';
import { User } from '../../../../shared/models/user.model';

export enum Actions {
  AUTH_STARTED = '[Auth page] Authentication started',
  SIGN_UP = '[Auth page] Signing up user',
  LOGIN = '[Auth page] Logging in user',
  AUTH_COMPLETE = '[Auth page] Authentication completed successfully',
  AUTH_ERROR = '[Auth page] Authentication crashed successfully',
  LOG_OUT = '[Auth page] Logging out user'
}

export const AuthStarted = createAction(
  Actions.AUTH_STARTED,
  props<{authData: AuthData}>()
);

export const SignUp = createAction(
  Actions.SIGN_UP,
  props<{authData: AuthData}>()
);

export const Login = createAction(
  Actions.LOGIN,
  props<{authData: AuthData}>()
);

export const AuthComplete = createAction(
  Actions.AUTH_COMPLETE,
  props<{currentUser: User}>()
);

export const AuthError = createAction(
  Actions.AUTH_ERROR,
  props<{authError: string | Error}>()
);

export const LogOut = createAction(
  Actions.LOG_OUT
)
