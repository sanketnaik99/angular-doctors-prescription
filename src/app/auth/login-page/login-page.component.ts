import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthService } from "../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { AppState } from "../../store/models/app-state.model";
import { AuthActions } from "../../store/actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  loginform: FormGroup;
  public email = "";
  public password = "";
  public user_type = "";
  loading$: boolean;
  status$: boolean;
  message$: string;
  value = "";
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.store
      .select(state => state.auth)
      .subscribe(data => {
        this.loading$ = data.loading;
        this.status$ = data.status;
        this.message$ = data.message;
      });
    this.loginform = this.formBuilder.group({
      //username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
      //confirmPassword: ["", Validators.required]
    });
  }
  get f() {
    return this.loginform.controls;
  }

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }
  onSubmit() {
    if (this.loginform.invalid) {
      return;
    }

    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.loginform.value));
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
