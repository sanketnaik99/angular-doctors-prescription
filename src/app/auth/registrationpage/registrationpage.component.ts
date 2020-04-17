import { AppState } from "../../store/models/app-state.model";
import { AuthService, AuthResult } from "../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthActions } from "../../store/actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as M from "materialize-css";

@Component({
  selector: "app-registrationpage",
  templateUrl: "./registrationpage.component.html",
  styleUrls: ["./registrationpage.component.css"]
})
export class RegistrationpageComponent implements OnInit {
  registerForm: FormGroup;
  registration_email = "";
  registration_password = "";
  username = "";
  confirmpassword = "";
  loading$: boolean;
  submitted = false;
  status$: boolean;
  message$: string;
  user_type = "";
  result: AuthResult = { result: null, message: null };

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
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
    this.registerForm = this.formBuilder.group(
      {
        username: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: this.MustMatch("password", "confirmPassword")
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value));
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }

  runs() {
    const { value, valid, touched } = this.registerForm;
    console.log(value);
    this.store.dispatch(
      AuthActions.REGISTER({
        credentials: {
          email: value["email"],
          password: value["password"],
          userType: this.user_type,
          username: value["username"]
        }
      })
    );
  }

  async register() {
    this.submitted = true;
    console.log(this.registerForm);
    const { value, valid, touched } = this.registerForm;
    console.log(value);
    console.log("FORM VALID? ", valid);
    if (valid == true) {
      this.runs();
      console.log("yes");
    } else {
      console.log("no");
    }
  }
}
