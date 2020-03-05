import { AuthResult, AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";

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
  result: AuthResult = { result: null, message: null };

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  async register() {
    this.result = await this.authService.register(
      this.registration_email,
      this.registration_password
    );
  }
}
