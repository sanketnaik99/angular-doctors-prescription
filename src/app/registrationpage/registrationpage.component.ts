import { AppState } from "./../store/models/app-state.model";
import { AuthService, AuthResult } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/actions";

@Component({
  selector: "app-registrationpage",
  templateUrl: "./registrationpage.component.html",
  styleUrls: ["./registrationpage.component.css"]
})
export class RegistrationpageComponent implements OnInit {
  registration_email = "";
  registration_password = "";
  username = "";
  confirmpassword = "";
  loading = false;
  user_type = "";
  result: AuthResult = { result: null, message: null };

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {}

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }

  async register() {
    this.loading = true;
    this.store.dispatch(
      AuthActions.REGISTER({
        credentials: {
          email: this.registration_email,
          password: this.registration_password,
          userType: "Doctor",
          username: this.username
        }
      })
    );
    this.loading = false;
    console.log(this.result);
    if (this.result.result == true) {
      this.router.navigate(["/"]);
    }
  }
}
