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
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  public email = "";
  public password = "";
  public user_type = "";
  loading$: boolean = false;
  status$: boolean = null;
  message$: string = null;
  value = "";
  submitted: boolean = false;

  loginForm = this.formBuilder.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {}
  get f() {
    return this.loginForm.controls;
  }

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }

  onSubmit() {
    const { value, valid, touched } = this.loginForm;
    console.log(value);
    this.submitted = true;
    if (!valid) {
      return;
    } else {
      this.signIn(value);
    }
  }

  async signIn(formValue) {
    this.loading$ = true;
    let result = await this.authService.signIn({
      email: formValue["email"],
      password: formValue["password"],
      userType: this.user_type,
    });
    this.loading$ = false;
    this.message$ = result.message;
    this.status$ = result.result;
  }
}
