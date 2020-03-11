import { UserCredentials, UserData } from "./../models/auth.model";
import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../actions";

export interface AuthState {
  loading: boolean;
  status: boolean;
  message: string;
  authCredentials: UserCredentials;
  userDetails: UserData;
  verification_sent: boolean;
}

const initialState: AuthState = {
  loading: false,
  message: undefined,
  status: undefined,
  verification_sent: false,
  authCredentials: { email: "", password: "", userType: "", username: "" },
  userDetails: { email: "", username: "", userType: "", uid: "" }
};

export const authReducer = createReducer(
  initialState,
  // REGISTER
  //
  on(AuthActions.REGISTER, (state, { credentials }) => ({
    ...state,
    loading: true,
    authCredentials: credentials
  })),
  on(AuthActions.REGISTER_SUCCESS, (state, { user }) => ({
    ...state,
    userDetails: user,
    authCredentials: undefined
  })),
  on(AuthActions.REGISTER_ERROR, (state, { error }) => ({
    ...state,
    loading: false,
    message: error,
    status: false
  })),
  //EMAIL
  //
  on(AuthActions.VERIFICATION_SENT, state => ({
    ...state,
    verification_sent: true
  })),
  on(AuthActions.EMAIL_NOT_VERIFIED, (state, { error }) => ({
    ...state,
    message: error,
    loading: false,
    status: false
  })),
  //DATABASE
  //
  on(AuthActions.DB_UPDATE_SUCCESS, state => ({
    ...state,
    loading: false,
    message: "Registration Successful! Please check your email.",
    status: true
  })),
  on(AuthActions.DB_UPDATE_FAIL, (state, { error }) => ({
    ...state,
    loading: false,
    message: error,
    status: false
  })),
  on(AuthActions.GET_DB_DATA_SUCCESS, (state, { user }) => ({
    ...state,
    loading: false,
    message: "Login Success",
    status: true,
    userDetails: user
  })),
  //LOGIN
  //
  on(AuthActions.LOGIN, (state, { credentiials }) => ({
    ...state,
    authCredentials: credentiials,
    loading: true
  })),
  on(AuthActions.LOGIN_SUCCESS, (state, { uid }) => ({
    ...state,
    authCredentials: {
      ...state.authCredentials,
      email: "",
      password: "",
      uid: uid
    }
  })),
  on(AuthActions.LOGIN_ERROR, (state, { error }) => ({
    ...state,
    status: false,
    message: error,
    loading: false
  }))
);
