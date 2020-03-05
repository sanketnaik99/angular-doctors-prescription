import { AuthService, AuthResult } from "./../auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  public email = "";
  public password = "";
  result: AuthResult = { result: null, message: null };
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  async signIn() {
    this.result = await this.authService.signIn(this.email, this.password);
    console.log(this.result.message);
  }
}
