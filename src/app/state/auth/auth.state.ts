export interface AuthState {
  username: string | null;
}

export const initialState: AuthState = {
  username: null,
};

export interface AppState {
  auth: AuthState;
}
