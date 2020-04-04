import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-patientdashboard",
  templateUrl: "./patientdashboard.component.html",
  styleUrls: ["./patientdashboard.component.css"]
})
export class PatientdashboardComponent implements OnInit {
  patient_profile = {
    username: "qwwwjwjj",
    email: "123@gmail.com",
    uid: "12jwidjwdwdoiwdo"
  };

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

  constructor() {}

  ngOnInit() {}
}
