import { createSelector } from '@ngrx/store';

import { State } from '../reducers/auth.reducer';


export const selectAuth = (state: State) => state;

export const selectAuthToken = createSelector(
  selectAuth,
  (state: State) => state.authToken
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: State) => state.authError
);
