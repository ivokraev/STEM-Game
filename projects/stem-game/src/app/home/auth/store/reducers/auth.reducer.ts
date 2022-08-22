import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { AuthTokenData } from 'projects/stem-game/src/app/shared/models/auth-token-data.model';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  authTokenData: AuthTokenData | null;
  authError: string | Error | HttpErrorResponse | null;
}

export const initialState: State = {
  authTokenData: null,
  authError: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.AuthComplete,
    (state, { authTokenData }): State => ({
      ...state,
      authTokenData: authTokenData,
      authError: null,
    })
  ),
  on(
    AuthActions.AuthError,
    (state, { authError }): State => ({
      ...state,
      authTokenData: null,
      authError: authError,
    })
  ),
  on(
    AuthActions.LogOut,
    (state): State => ({
      ...state,
      authTokenData: null,
      authError: null,
    })
  )
);
