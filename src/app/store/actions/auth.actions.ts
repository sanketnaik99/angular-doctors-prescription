import { UserAuthCredentials, UserDetails, RegistrationResult } from './../models/auth.model';
import { createAction, props } from '@ngrx/store';

export const userLogin = createAction("[Login] User Login", props<{credentials: UserAuthCredentials}>());
export const userLoginSuccess = createAction("[Login] User Login Success", props<{details: UserDetails}>());
export const userLoginError = createAction("[Login] User Login Error", props<{error: Error}>());

export const userRegistration = createAction(
    "[Register] Register User", 
    props<{credentials: UserAuthCredentials}>());

export const userRegistrationSuccess = createAction(
    "[Register] Register User Success",
    props<{result: RegistrationResult}>()
);

export const userRegistrationError = createAction(
    "[Register] Register User Error",
    props<{error: Error}>()
)