import { UserAuthCredentials, UserDetails } from './../models/auth.model';
import { createAction, props } from '@ngrx/store';

export const userLogin = createAction("[Login] User Login", props<{credentials: UserAuthCredentials}>());
export const userLoginSuccess = createAction("[Login] User Login Success", props<{details: UserDetails}>());
export const userLoginError = createAction("[Login] User Login Error", props<{error: Error}>());