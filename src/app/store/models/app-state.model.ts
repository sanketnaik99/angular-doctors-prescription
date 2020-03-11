import { AuthState } from "./../reducers/auth.reducer";
import { createSelector } from "@ngrx/store";

export interface AppState {
  auth: AuthState;
}

export const selectAuthState = (state: AppState) => state.auth;
