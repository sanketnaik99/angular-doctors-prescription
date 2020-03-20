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
  public email = "";
  public password = "";
  public user_type = "";
  loading$: boolean;
  status$: boolean;
  message$: string;
  value = "";
  submitted: boolean = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

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
  }
  get f() {
    return this.loginForm.controls;
  }

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }
  onSubmit() {
    const {value, valid, touched } = this.loginForm;
    console.log(value);
    this.submitted = true;
    if (!valid) {
      return;
    }else{
      this.signIn(value)
    }
  }

  async signIn(formValue) {
    this.store.dispatch(
      AuthActions.LOGIN({
        credentiials: {
          email: formValue['email'],
          password: formValue['password'],
          userType: this.user_type
        }
      })
    );
  }
}
