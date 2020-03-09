import {
  UserDetails,
  UserAuthCredentials,
  RegistrationResult
} from "./../models/auth.model";
import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../actions";

export interface AuthState {
  userDetails: RegistrationResult;
  loading: boolean;
  error: Error;
  credentials: UserAuthCredentials;
}

const initialState: AuthState = {
  loading: false,
  error: undefined,
  userDetails: {
    result: undefined,
    message: "",
    user: { email: "", userType: "", username: "" }
  },
  credentials: { email: "", password: "", userType: "" }
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.userLogin, (state, { credentials }) => ({
    ...state,
    loading: true,
    credentials: credentials
  })),
  on(AuthActions.userLoginSuccess, state => ({
    ...state,
    loading: false,
    credentials: { email: "", password: "", userType: "" }
  })),
  on(AuthActions.userLoginError, (state, { error }) => ({
    ...state,
    error: error,
    loading: false
  })),

  //Register
  on(AuthActions.userRegistration, (state, { credentials }) => ({
    ...state,
    loading: true,
    credentials: credentials
  })),
  on(AuthActions.userRegistrationSuccess, (state, { result }) => ({
    ...state,
    loading: false,
    userDetails: result
  })),
  on(AuthActions.userRegistrationError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
