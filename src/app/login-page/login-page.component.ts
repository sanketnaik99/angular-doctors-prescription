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
  public user_type = "";
  loading = false;
  value = "";
  result: AuthResult = { result: null, message: null };
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  getusertype(value: any) {
    console.log(value);
    this.user_type = value;
  }

  async signIn() {
    this.loading = true;

    this.result = await this.authService.signIn(this.email, this.password);
    console.log(this.result.message);
    this.loading = false;
  }
}
