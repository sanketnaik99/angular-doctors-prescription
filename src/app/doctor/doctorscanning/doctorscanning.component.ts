import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { DoctorserviceService } from "../doctorservice.service";
import { UserData } from "./../../store/models/auth.model";

@Component({
  selector: "app-doctorscanning",
  templateUrl: "./doctorscanning.component.html",
  styleUrls: ["./doctorscanning.component.css"]
})
export class DoctorscanningComponent implements OnInit {
  scannedvalue = "";
  value = false;
  patient_data: UserData;

  constructor(private doctorservice: DoctorserviceService) {}

  ngOnInit() {}
  capturedQr(result: string) {
    console.log(result);
    this.scannedvalue = result;
    this.value = true;
    this.doctorservice.getpatientdata(this.scannedvalue).subscribe(patient => {
      console.log(patient);
      this.patient_data = patient;
    });
  }
  displayCameras(devices: MediaDeviceInfo[]) {
    for (var i in devices) {
      console.log(devices[i]);
    }
  }

  addvalue() {
    this.doctorservice.additem(this.patient_data);
  }

  retry() {
    this.value = false;
  }
}
