import { Store } from "@ngrx/store";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { AppState } from "../store/models/app-state.model";
import { AuthActions } from "../store/actions";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  public email = "";
  public password = "";
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  async signIn() {
    this.store.dispatch(
      AuthActions.LOGIN({
        credentiials: {
          email: this.email,
          password: this.password,
          userType: "Doctor"
        }
      })
    );
  }
}
