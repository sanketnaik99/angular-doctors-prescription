import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-qrcode",
  templateUrl: "./qrcode.component.html",
  styleUrls: ["./qrcode.component.css"]
})
export class QrcodeComponent implements OnInit {
  patient_uid = "";

  constructor() {
    this.patient_uid = "WDRf74S2GVMdzPedLxgm97VIrZx1";
  }

  ngOnInit() {}
}
