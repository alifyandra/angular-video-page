import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, AuthState } from './auth.state';
export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getLogin = createSelector(getAuthState, (state) => {
  return state.username;
});
