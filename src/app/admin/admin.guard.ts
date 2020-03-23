import { CanActivate, Router } from "@angular/router";
import { AdminService } from "./admin.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate() {
    console.log("AlwaysAuthGuard");
    if (!this.adminService.isAdmin) {
      this.router.navigate(["admin/login"]);
      alert("Please Login as an Admin");
    }
    return this.adminService.isAdmin;
  }
}
