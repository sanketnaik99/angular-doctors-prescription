import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as M from "materialize-css";
import { PatientserviceService } from "../patientservice.service";
import { UserData } from "../../models/auth.model";

@Component({
  selector: "app-qrcode",
  templateUrl: "./qrcode.component.html",
  styleUrls: ["./qrcode.component.css"]
})
export class QrcodeComponent implements OnInit, AfterViewInit {
  patient_uid = "";
  patient_profile: UserData;

  constructor(public patientservice: PatientserviceService) {}

  ngOnInit() {
    this.patient_profile = this.patientservice.userData;

    this.patientservice
      .getpatientdata(this.patient_profile.uid)
      .subscribe(res => {
        console.log(res);
        this.patient_uid = res.uid;
      });
  }
  ngAfterViewInit(): void {
    setTimeout(function() {
      var elem = document.querySelector(".sidenav");
      var instance = M.Sidenav.init(elem);
    }, 0);
  }
}
