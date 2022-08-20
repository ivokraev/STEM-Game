import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  authToken: string | null;
  authError: string | Error | HttpErrorResponse | null;
}

export const initialState: State = {
  authToken: null,
  authError: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.AuthComplete,
    (state, { authToken }): State => ({
      ...state,
      authToken: authToken,
      authError: null,
    })
  ),
  on(
    AuthActions.AuthError,
    (state, { authError }): State => ({
      ...state,
      authToken: null,
      authError: authError,
    })
  ),
  on(
    AuthActions.LogOut,
    (state): State => ({
      ...state,
      authToken: null,
      authError: null,
    })
  )
);
