import { UserDetails, UserAuthCredentials } from './../models/auth.model';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions';

export interface AuthState {
    userDetails: UserDetails;
    loading: boolean;
    error: Error;
    credentials: UserAuthCredentials
}

const initialState: AuthState = {
    loading: false,
    error: undefined,
    userDetails: {userType: '', username: '', email: ''},
    credentials: {email: '', password: ''}
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.userLogin, (state, {credentials}) => ({...state, loading: true, credentials: credentials})),
    on(AuthActions.userLoginSuccess, (state) => ({...state, loading: false, credentials: {email: '', password: ''}})),
    on(AuthActions.userLoginError, (state, {error}) => ({...state, error: error, loading: false}))
);