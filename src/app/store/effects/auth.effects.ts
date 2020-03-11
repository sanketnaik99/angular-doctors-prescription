import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Store } from "@ngrx/store";
import { AuthService } from "./../../services/auth.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  map,
  exhaustMap,
  catchError,
  switchMap,
  tap,
  withLatestFrom,
  filter,
  mergeMap
} from "rxjs/operators";
import { AuthActions } from "../actions";
import { of, from } from "rxjs";
import { AppState, selectAuthState } from "../models/app-state.model";
import { Action } from "rxjs/internal/scheduler/Action";

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER),
      map(action => action.credentials),
      exhaustMap(credentials =>
        from(
          this.afAuth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          map(data => {
            console.log(data);
            return AuthActions.REGISTER_SUCCESS({
              user: {
                uid: data.user.uid,
                email: data.user.email,
                userType: credentials.userType,
                username: credentials.username
              }
            });
          }),
          catchError(err => {
            console.log(err);
            return of(AuthActions.REGISTER_ERROR({ error: err.message }));
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER_SUCCESS),
      map(action => {
        console.log("SUCCESS FN");
        return action.user;
      }),
      switchMap(data => [
        AuthActions.SEND_VERIFICATION(),
        AuthActions.DB_UPDATE({ data: data })
      ])
    )
  );

  sendMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SEND_VERIFICATION),
      switchMap(() =>
        this.afAuth.user.pipe(
          map(data => {
            data.sendEmailVerification();
            return AuthActions.VERIFICATION_SENT();
          })
        )
      )
    )
  );

  updateDb = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.DB_UPDATE),
      map(action => action.data),
      switchMap(data => {
        const ref = this.afs.collection(`${data.userType}`).doc(`${data.uid}`);
        return from(
          ref.set({
            email: data.email,
            uid: data.uid,
            username: data.username,
            userType: data.userType
          })
        );
      }),
      map(() => AuthActions.DB_UPDATE_SUCCESS()),
      catchError(err => of(AuthActions.DB_UPDATE_FAIL({ error: err.message })))
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      map(action => action.credentiials),
      exhaustMap(credentials =>
        from(
          this.afAuth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          map(data => {
            console.log(data);
            return AuthActions.LOGIN_SUCCESS({ uid: data.user.uid });
          }),
          catchError(err => of(AuthActions.LOGIN_ERROR({ error: err.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_SUCCESS),
      map(action => action.uid),
      switchMap(uid => of(AuthActions.CHECK_VERIFICATION()))
    )
  );

  checkVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.CHECK_VERIFICATION),
      switchMap(() =>
        this.afAuth.user.pipe(
          switchMap(user => {
            if (user.emailVerified) {
              return [AuthActions.EMAIL_VERIFIED(), AuthActions.GET_DB_DATA()];
            } else {
              throw Error("Not Verified");
            }
          }),
          catchError(err =>
            of(AuthActions.EMAIL_NOT_VERIFIED({ error: err.message }))
          )
        )
      )
    )
  );

  getDbData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.GET_DB_DATA),
      withLatestFrom(this.store),
      map(([action, storeState]) => storeState.auth.authCredentials),
      map(data => {
        const ref = this.afs.collection(`${data.userType}`).doc(`${data.uid}`);
        return ref.valueChanges();
      }),
      mergeMap(data => data),
      map(data => {
        console.log(data);
        return AuthActions.GET_DB_DATA_SUCCESS({
          user: {
            email: data["email"],
            uid: data["uid"],
            userType: data["userType"],
            username: data["username"]
          }
        });
      })
    )
  );
}
