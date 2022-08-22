import { createSelector, createFeatureSelector } from '@ngrx/store';

import { State } from '../reducers/auth.reducer';

export const selectAuth = createFeatureSelector<State>('auth')

export const selectIsAuthToken = createSelector(
  selectAuth,
  (state: State) => {
    const token = state.authTokenData?.token;
    if(token && token.length > 0) {
      return true;
    }
    return false;
  }
);

export const selectAuthToken = createSelector(
  selectAuth,
  (state: State) => state.authTokenData?.token
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: State) => state.authError
);
