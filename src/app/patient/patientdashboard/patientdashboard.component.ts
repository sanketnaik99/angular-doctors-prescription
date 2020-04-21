import { Component, OnInit, AfterViewInit } from "@angular/core";
import { UserData } from "../../models/auth.model";
import { PatientserviceService } from "../patientservice.service";
import * as M from "materialize-css";

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

  constructor(private patientservice: PatientserviceService) {}

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
}
