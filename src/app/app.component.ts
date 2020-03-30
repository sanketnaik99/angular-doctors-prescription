import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "SSM";
  constructor() {
    console.log("V0.2.5");
    console.log("Github Deploy");
  }
}
