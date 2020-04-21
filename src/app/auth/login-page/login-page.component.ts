import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthService } from "../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { AppState } from "../../store/models/app-state.model";
import { AuthActions } from "../../store/actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserData } from "../../models/auth.model";
import { Router } from "@angular/router";
import { GET_DB_DATA } from "src/app/store/actions/auth.actions";
import { getSourceMetadata } from "@ngrx/effects/src/effects_metadata";
import { DoctorserviceService } from "../../doctor/doctorservice.service";
import * as M from "materialize-css";

import { PatientserviceService } from "../../patient/patientservice.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
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
  typeofuser: UserData;

  loginForm = this.formBuilder.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router,
    private doctorservice: DoctorserviceService,
    private patientservice: PatientserviceService
  ) {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    setTimeout(function() {
      // var elem = document.querySelector(".sidenav");
      // var instance = M.Sidenav.init(elem);
      var instance = M.AutoInit();
    }, 0);
  }
  get f() {
    return this.loginForm.controls;
  }

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }

  onSubmit() {
    const { value, valid } = this.loginForm;
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
      userType: this.user_type
    });
    this.loading$ = false;
    this.message$ = result.message;
    this.status$ = result.result;

    if (this.status$ == true) {
      // this.typeofuser = this.authService.userData;

      if (this.authService.userData.userType == "Doctor") {
        this.router.navigate(["doctor", "dashboard"]);
        this.doctorservice.userData = this.authService.userData;
        console.log(this.doctorservice.userData, "doctors data");
      } else {
        this.patientservice.userData = this.authService.userData;
        this.router.navigate(["patient", "patientboard"]);
      }
    }
  }
}
