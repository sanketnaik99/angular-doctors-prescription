import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ZXingScannerModule } from "@zxing/ngx-scanner";

@Component({
  selector: "app-doctorscanning",
  templateUrl: "./doctorscanning.component.html",
  styleUrls: ["./doctorscanning.component.css"]
})
export class DoctorscanningComponent implements OnInit {
  scannedvalue = "";
  value = false;
  email = "sahilnair@gmail.com";
  constructor() {}

  ngOnInit() {}
  capturedQr(result: string) {
    console.log(result);
    this.scannedvalue = result;
    this.value = true;
  }
  displayCameras(devices: MediaDeviceInfo[]) {
    for (var i in devices) {
      console.log(devices[i]);
    }
  }

  retry() {
    this.value = false;
  }
}
