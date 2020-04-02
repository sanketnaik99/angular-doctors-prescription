import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-doctor-dashboard",
  templateUrl: "./doctor-dashboard.component.html",
  styleUrls: ["./doctor-dashboard.component.css"]
})
export class DoctorDashboardComponent implements OnInit {
  doctor_profile = {
    username: "qwwwjwjj",
    email: "123@gmail.com",
    uid: "12jwidjwdwdoiwdo"
  };

  patients_profile = [
    {
      username: "sahil",
      email: "122@jajs"
    },
    {
      username: "wdwdwd",
      email: "wdwdwd@kdkd"
    },
    {
      username: "eweewewe",
      email: "qwowok@1223"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
