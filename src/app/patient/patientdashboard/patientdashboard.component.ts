import { Component, OnInit, AfterViewInit } from "@angular/core";
import { UserData } from "../../models/auth.model";
import { PatientserviceService } from "../patientservice.service";
import * as M from "materialize-css";
import { AuthService } from "../../services/auth.service";
import { from } from "rxjs";
@Component({
  selector: "app-patientdashboard",
  templateUrl: "./patientdashboard.component.html",
  styleUrls: ["./patientdashboard.component.css"]
})
export class PatientdashboardComponent implements OnInit, AfterViewInit {
  patient_profile: UserData;

  prescriptions = [
    {
      name: "Crosin"
    },
    {
      name: "ivabred"
    },
    {
      name: "ooeoeo"
    }
  ];

  constructor(
    private patientservice: PatientserviceService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.patient_profile = this.patientservice.userData;
  }
  ngAfterViewInit(): void {
    setTimeout(function() {
      var elem = document.querySelector(".sidenav");
      var instance = M.Sidenav.init(elem);
      var instance = M.AutoInit();
    }, 0);
  }

  async logout() {
    await this.authservice.logout();
  }
}
