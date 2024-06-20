import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';
import { initialState } from './auth.state';

export const AuthReducer = createReducer(
  initialState,

  on(login, (state, action) => {
    return {
      ...state,
      username: action.username,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      username: null,
    };
  })
);
