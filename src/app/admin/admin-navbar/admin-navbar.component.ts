import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import * as M from "materialize-css";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
  styleUrls: ["./admin-navbar.component.css"],
})
export class AdminNavbarComponent implements OnInit {
  isNavbarOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  async toggleNavbar() {}

  routeToPage(path) {
    this.isNavbarOpen = false;
    this.router.navigate(path);
  }
}
