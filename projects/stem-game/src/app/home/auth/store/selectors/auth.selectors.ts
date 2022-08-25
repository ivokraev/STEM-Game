import { HttpErrorResponse } from '@angular/common/http';
import { createSelector, createFeatureSelector } from '@ngrx/store';

import { State } from '../reducers/auth.reducer';

export const selectAuth = createFeatureSelector<State>('auth')

export const selectIsAuthToken = createSelector(
  selectAuth,
  (state: State): boolean => {
    const token = state.authTokenData?.token;
    if(token && token.length > 0) {
      return true;
    }
    return false;
  }
);

export const selectAuthToken = createSelector(
  selectAuth,
  (state: State): string | null => {
    const token = state.authTokenData?.token;
    if (token && token.length > 0) return token;
    return null;
  }
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: State): string | Error | HttpErrorResponse | null => state.authError
);

export const selectAuthRefreshToken = createSelector(
  selectAuth,
  (state: State): string | null => {
    const refreshToken = state.authTokenData?.refreshToken;
    if (refreshToken && refreshToken.length > 0) return refreshToken;
    return null;
  }
);
