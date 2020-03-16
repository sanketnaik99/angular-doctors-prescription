import { Router } from "@angular/router";
import { AdminService } from "./../admin.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { AuthResult } from "src/app/services/auth.service";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.css"]
})
export class AdminLoginComponent implements OnInit {
  submitted: boolean = false;
  loading: boolean = false;
  hasError: boolean = false;
  result: AuthResult;

  loginForm = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  async submitForm() {
    this.loading = true;
    this.submitted = true;
    const { value, valid, touched } = this.loginForm;
    console.log("Submitted => ", valid);
    if (!valid) {
      this.loading = false;
      return;
    } else {
      this.result = await this.adminService.logIn(
        value["email"],
        value["password"]
      );
      console.log("RESULT", this.result);
      if (this.result.result === false) {
        this.hasError = true;
        this.loading = false;
      } else {
        this.hasError = false;
        this.router.navigate(["/admin/dashboard"]);
      }
    }
  }
}
