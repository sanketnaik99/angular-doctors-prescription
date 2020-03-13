import { Component, ViewChild, ViewEncapsulation, OnInit } from "@angular/core";
import { QrScannerComponent } from "angular2-qrscanner";

@Component({
  selector: "app-doctorscanning",
  templateUrl: "./doctorscanning.component.html",
  styleUrls: ["./doctorscanning.component.css"]
})
export class DoctorscanningComponent implements OnInit {
  @ViewChild(QrScannerComponent, { static: true })
  qrScannerComponent: QrScannerComponent;
  scanned_value = "";

  constructor() {}

  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      //console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === "videoinput") {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes("front")) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });
    this.qrScannerComponent.capturedQr.subscribe(result => {
      this.scanned_value = result;
      console.log(this.scanned_value);
    });
  }
}
