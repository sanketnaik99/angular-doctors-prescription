import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as M from "materialize-css";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
  styleUrls: ["./admin-navbar.component.css"]
})
export class AdminNavbarComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(function() {
      // var elem = document.querySelector(".sidenav");
      // var instance = M.Sidenav.init(elem);
      var instance = M.AutoInit();
    }, 0);
  }
}
