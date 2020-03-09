import { AuthService } from "./../../services/auth.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  map,
  mergeMap,
  exhaustMap,
  catchError,
  switchMap,
  tap
} from "rxjs/operators";
import { AuthActions } from "../actions";

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService, private actions$: Actions) {}

  // login$ = createEffect(() => this.actions$.pipe(
  //     ofType(AuthActions.userLogin),
  //     exhaustMap(action =>
  //         //this.authService.signIn(action.credentials).pipe(
  //             map(user => AuthActions.userLoginSuccess({user})),
  //             //catchError(error => AuthActions.userLoginError({error: error}))
  //         )
  //     //)
  // ));

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userRegistration),
      tap(action => this.authService.registerUser(action.credentials))
    );
  });
}
