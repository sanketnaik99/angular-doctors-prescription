import { UserCredentials, UserData } from "./../models/auth.model";
import { createAction, props } from "@ngrx/store";

// REGISTER ACTIONS
export const REGISTER = createAction(
  "[AUTH] REGISTER USER",
  props<{ credentials: UserCredentials }>()
);
export const REGISTER_SUCCESS = createAction(
  "[AUTH] REGISTER SUCCESS",
  props<{ user: UserData }>()
);
export const REGISTER_ERROR = createAction(
  "[AUTH] REGISTER ERROR",
  props<{ error: string }>()
);

//EMAIL ACTIONS
export const SEND_VERIFICATION = createAction(
  "[AUTH] Sending Verification Mail"
);
export const VERIFICATION_SENT = createAction("[AUTH] Sent Verification Mail");
export const CHECK_VERIFICATION = createAction(
  "[AUTH] Check email verification"
);
export const EMAIL_VERIFIED = createAction("[AUTH] Email Verified");
export const EMAIL_NOT_VERIFIED = createAction(
  "[AUTH] Email NOT Verified",
  props<{ error: string }>()
);

//DATABASE ACTIONS
export const DB_UPDATE = createAction(
  "[AUTH] DB Update Started",
  props<{ data: UserData }>()
);
export const DB_UPDATE_SUCCESS = createAction("[AUTH] DB Updated successfully");
export const DB_UPDATE_FAIL = createAction(
  "[AUTH] DB Update Failed",
  props<{ error: string }>()
);
export const GET_DB_DATA = createAction("[AUTH] GET DB Data");
export const GET_DB_DATA_SUCCESS = createAction(
  "[AUTH] SUCCESSFULLY GOT DATA FROM DB",
  props<{ user: UserData }>()
);
//LOGIN ACTIONS
export const LOGIN = createAction(
  "[AUTH] LOGIN USER",
  props<{ credentiials: UserCredentials }>()
);
export const LOGIN_SUCCESS = createAction(
  "[AUTH] LOGIN SUCCESS",
  props<{ uid: string }>()
);
export const LOGIN_ERROR = createAction(
  "[AUTH] LOGIN ERROR",
  props<{ error: string }>()
);
