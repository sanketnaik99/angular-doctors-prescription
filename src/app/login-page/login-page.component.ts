import { AuthService } from './../services/auth.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  public email = "";
  public password = "";
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  async signIn() {
    //this.result = await this.authService.signIn(this.email, this.password);
    //console.log(this.result.message);
  }
}
