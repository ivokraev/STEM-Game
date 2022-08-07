import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import * as AuthActions from './auth.actions'

export const authFeatureKey = 'auth';

export interface State {
  currentUser: User | null;
  authError: string | Error | null;

}

export const initialState: State = {
  currentUser: null,
  authError: null
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.AuthComplete, (state, {currentUser}): State => ({
    ...state,
    currentUser: currentUser,
    authError: null
  })),
  on(AuthActions.AuthError, (state, {authError}): State => ({
    ...state,
    authError: authError
  })),
  on(AuthActions.LogOut, (state): State => ({
    ...state,
    currentUser: null,
    authError: null
  }))
);
