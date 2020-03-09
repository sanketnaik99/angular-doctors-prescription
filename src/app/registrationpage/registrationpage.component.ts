import { AppState } from "./../store/models/app-state.model";
import { AuthService, AuthResult } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
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
  result: AuthResult = { result: null, message: null };

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  async register() {
    console.log("Register Called");

    this.store.dispatch(
      AuthActions.userRegistration({
        credentials: {
          email: this.registration_email,
          password: this.registration_password,
          userType: "Doctor",
          username: this.username
        }
      })
    );
  }

  // async register() {
  //   this.result = await this.authService.register(
  //     this.registration_email,
  //     this.registration_password
  //   );
  // }
}
