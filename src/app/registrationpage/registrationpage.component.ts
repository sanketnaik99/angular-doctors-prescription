import { AuthResult, AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs";

@Component({
  selector: "app-registrationpage",
  templateUrl: "./registrationpage.component.html",
  styleUrls: ["./registrationpage.component.css"]
})
export class RegistrationpageComponent implements OnInit {
  registration_email = "";
  registration_password = "";
  username = "";
  confirmpassword = "";
  loading = false;
  user_type = "";
  result: AuthResult = { result: null, message: null };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }

  async register() {
    this.loading = true;
    this.result = await this.authService.register(
      this.registration_email,
      this.registration_password
    );
    this.loading = false;
    console.log(this.result);
    if (this.result.result == true) {
      this.router.navigate(["/"]);
    }
  }
}
