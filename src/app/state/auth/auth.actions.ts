import { createAction, props } from '@ngrx/store';

const LOGIN = '[Auth] Login';
const LOGOUT = '[Auth] Logout';

export const login = createAction(LOGIN, props<{ username: string }>());

export const logout = createAction(LOGOUT);
