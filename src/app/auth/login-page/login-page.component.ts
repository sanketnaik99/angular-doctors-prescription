import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthService } from "../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { AppState } from "../../store/models/app-state.model";
import { AuthActions } from "../../store/actions";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  public email = "";
  public password = "";
  public user_type = "";
  loading$: boolean;
  status$: boolean;
  message$: string;
  value = "";
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store
      .select(state => state.auth)
      .subscribe(data => {
        this.loading$ = data.loading;
        this.status$ = data.status;
        this.message$ = data.message;
      });
  }

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }

  async signIn() {
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
