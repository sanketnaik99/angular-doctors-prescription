import { UserData } from "./../../store/models/auth.model";
import { Component, OnInit } from "@angular/core";

import { DoctorserviceService } from "../doctorservice.service";

@Component({
  selector: "app-doctor-dashboard",
  templateUrl: "./doctor-dashboard.component.html",
  styleUrls: ["./doctor-dashboard.component.css"]
})
export class DoctorDashboardComponent implements OnInit {
  doctor_profile: UserData;
  patient_status = true;
  loading = true;
  patients_profile: UserData[];

  constructor(private doctorservice: DoctorserviceService) {}

  ngOnInit() {
    this.doctorservice.getdata().subscribe(patients => {
      console.log(patients);
      this.patients_profile = patients;
      if (this.patients_profile.length == 0) {
        this.patient_status = false;
      }
      this.loading = false;
    });

    this.doctor_profile = this.doctorservice.userData;
    console.log(this.patient_status, "sahil");
  }
}
