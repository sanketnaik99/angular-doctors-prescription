import { AdminService } from "./../admin.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as M from "materialize-css";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  doctors: any[];
  patients: any[];
  isDoctorLoading: boolean = true;
  isPatientLoading: boolean = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getDoctorData().then(res => {
      this.doctors = res;
      this.isDoctorLoading = false;
    });
    this.adminService.getPatientData().then(res => {
      this.patients = res;
      this.isPatientLoading = false;
    });
  }

  makeAdmin(uid: string, username: string) {
    if (
      confirm(
        `Are you sure you want to make ${username} an admin? \n(Grant All Permissions to this user)`
      )
    ) {
    }
  }
}
