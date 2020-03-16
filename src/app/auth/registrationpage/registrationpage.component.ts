import { AppState } from "../../store/models/app-state.model";
import { AuthService, AuthResult } from "../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthActions } from "../../store/actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registrationpage",
  templateUrl: "./registrationpage.component.html",
  styleUrls: ["./registrationpage.component.css"]
})
export class RegistrationpageComponent implements OnInit {
  loginForm: FormGroup;
  registration_email = "";
  registration_password = "";
  username = "";
  confirmpassword = "";
  loading$: boolean;
  status$: boolean;
  message$: string;
  user_type = "";
  result: AuthResult = { result: null, message: null };

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    public formbuilder: FormBuilder
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

  async register() {
    this.store.dispatch(
      AuthActions.REGISTER({
        credentials: {
          email: this.registration_email,
          password: this.registration_password,
          userType: this.user_type,
          username: this.username
        }
      })
    );
    // if (this.status$ == true) {
    //   this.router.navigate(["/"]);
    // }
  }
}
