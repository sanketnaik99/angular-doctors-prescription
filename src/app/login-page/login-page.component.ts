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
  public user_type = "";
  loading = false;
  value = "";
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }

  async signIn() {
    this.loading = true;
    this.loading = false;
    this.store.dispatch(
      AuthActions.LOGIN({
        credentiials: {
          email: this.email,
          password: this.password,
          userType: this.user_type
        }
      })
    );
  }
}
